import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type PieChartData = {
  name: string;
  value: number;
};

type PieChartComponentProps = {
  title: string;
  queryKey: string;
  fetchFunction: () => Promise<PieChartData[]>;
  colors: string[];
};

export const PieChartComponent = ({ title, queryKey, fetchFunction, colors }: PieChartComponentProps) => {
  const { data, isLoading } = useQuery<PieChartData[]>({ queryKey: [queryKey], queryFn: fetchFunction });

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
              data={data}
              dataKey="value"
              nameKey="name"
              startAngle={360}
              endAngle={0}
              innerRadius={100}
              outerRadius={150}
              paddingAngle={0}
              cx="50%"
              cy="50%"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="pie-chart__legends">
        {data.map(({ name }, index) => (
          <div className="legend" key={name}>
            <span className="legend__dot" style={{ background: `${colors[index]}` }} />
            <p className="legend__item">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
