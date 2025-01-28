import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';
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
  title: string;
  queryKey: string;
  fetchFunction: () => Promise<PieChartData>;
  colors: string[];
};

export const PieChartComponent = ({ title, queryKey, fetchFunction, colors }: PieChartComponentProps) => {
  const { data, isLoading } = useQuery<PieChartData>({ queryKey: [queryKey], queryFn: fetchFunction });

  if (!data) return;
  if (isLoading) return <Loading />;

  return (
    <div className="pie-chart">
      <div className="header">
        <h1 className="header__title">{title}</h1>
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
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="total">{data.total}</div>
      </div>

      <div className="pie-chart__legends">
        {data.result.map(({ name, percentage }, index) => (
          <div className="legend" key={name}>
            <div className="legend__title">
              <span className="dot" style={{ background: `${colors[index]}` }} />
              <p className="item">{name}</p>
            </div>
            <p className="legend__percentage">{percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};
