import { Loading } from '@src/components';
import { BarChartProps } from '@src/types';
import { useQuery } from '@tanstack/react-query';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

import { CustomBarShape, CustomCursor, CustomTooltip } from './BarCustomComponents';

export const BarChartComponent = ({ title, queryKey, axisKey, tooltip, fetchFunction }: BarChartProps) => {
  const { data, isLoading } = useQuery({ queryKey: [queryKey], queryFn: fetchFunction });

  if (isLoading) return <Loading />;

  if (data?.length === 0) return <div>Empty</div>;

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
          <BarChart data={data} barSize={20}>
            <YAxis width={30} axisLine={false} tickLine={false} />
            <XAxis dataKey={axisKey.xKey} axisLine={false} tickLine={false} />
            <Tooltip cursor={<CustomCursor />} content={<CustomTooltip tooltip={tooltip} />} />
            <Bar dataKey={axisKey.yKey} shape={<CustomBarShape />} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
