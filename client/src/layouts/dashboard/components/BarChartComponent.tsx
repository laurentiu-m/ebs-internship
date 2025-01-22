import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

type BarChartProps = {
  title: string;
  queryKey: string;
  axisKey: { yKey: string; xKey: string };
  tooltip: { xKey: string; yKey: string };
  fetchFunction: () => Promise<undefined>;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string | number;
};

export const BarChartComponent = ({ title, queryKey, axisKey, tooltip, fetchFunction }: BarChartProps) => {
  const { data, isLoading } = useQuery({ queryKey: [queryKey], queryFn: fetchFunction });

  if (isLoading) return <Loading />;

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip">
          <p>{`${tooltip.xKey}: ${label}`}</p>
          <p>{`${tooltip.yKey}: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bar-chart">
      <div className="header">
        <h1 className="header__title">{title}</h1>

        <div className="header__info">
          <p>X: {axisKey.xKey}</p>
          <p>Y: {axisKey.yKey}</p>
        </div>
      </div>

      <div className="bar-chart__main">
        <ResponsiveContainer>
          <BarChart data={data} barSize={10}>
            <YAxis width={30} axisLine={false} tickLine={false} />
            <XAxis dataKey={axisKey.xKey} axisLine={false} tickLine={false} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: '#e9ecef',
                fill: '#e9ecef'
              }}
            />
            <Bar dataKey={axisKey.yKey} radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
