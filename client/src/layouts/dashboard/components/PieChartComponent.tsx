import { Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';
import i18n from '@src/i18n';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { CustomTooltipPie } from './ChartsCustomComponents';

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

type Props = {
  queryKey: string;
  fetchFunction: () => Promise<PieChartData>;
};

export const PieChartComponent = ({ queryKey, fetchFunction }: Props) => {
  const { t } = useTranslation();
  const { tokenData } = useAppContext();

  const { data, isLoading } = useQuery<PieChartData>({
    queryKey: [queryKey, tokenData?.userId, i18n.language],
    queryFn: fetchFunction
  });

  if (isLoading)
    return (
      <div className="pie-chart">
        <Loading />
      </div>
    );
  if (!data) return;

  return (
    <div className="pie-chart">
      <div className="header">
        <h4 className="header__title">{t(`dashboard.${queryKey}`)}</h4>
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
              {data.result.map((item, index) => (
                <Cell key={`cell-${item.name}`} className={`color-${index}`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltipPie />} />
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
