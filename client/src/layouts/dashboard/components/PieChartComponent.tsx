import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type PieChartData = {
  total: number;
  result: [
    {
      name: string;
      value: number;
      percentage: number;
    }
  ];
};

type PieChartComponentProps = {
  queryKey: string;
  fetchFunction: () => Promise<PieChartData>;
};

export const PieChartComponent = ({ queryKey, fetchFunction }: PieChartComponentProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<PieChartData>({ queryKey: [queryKey], queryFn: fetchFunction });

  if (isLoading) return <Loading />;
  if (!data) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;

      return (
        <div className="custom-tooltip">
          <p>
            {name}: <span>{value}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="pie-chart">
      <div className="header">
        <h1 className="header__title">{t(`dashboard.${queryKey}`)}</h1>
      </div>

      <div className="pie-chart__main">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data.result}
              dataKey="value"
              nameKey="name"
              startAngle={360}
              endAngle={0}
              innerRadius={80}
              outerRadius={100}
              paddingAngle={0}
              cx="50%"
              cy="50%"
            >
              {data.result.map((_, index) => (
                <Cell key={`cell-${index}`} className={`color-${index}`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="total">{data.total}</div>
      </div>

      <div className="pie-chart__legends">
        {data.result.map(({ name, percentage }, index) => (
          <div className="legend" key={name}>
            <div className="legend__title">
              <span className={`dot color-${index}`} />
              <p className="item">{name}</p>
            </div>
            <p className="legend__percentage">{percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};
