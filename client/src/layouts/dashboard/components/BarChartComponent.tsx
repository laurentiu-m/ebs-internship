import { Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';
import { BarChartProps } from '@src/types';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

import { CustomBarShape, CustomCursor, CustomTooltip } from './BarCustomComponents';

export const BarChartComponent = ({ queryKey, axisKey, tooltip, fetchFunction }: BarChartProps) => {
  const { t } = useTranslation();
  const { tokenData } = useAppContext();

  const { data, isLoading } = useQuery({ queryKey: [queryKey, tokenData?.userId], queryFn: fetchFunction });

  if (isLoading)
    return (
      <div className="bar-chart">
        <Loading />
      </div>
    );

  if (data?.length === 0) return;

  return (
    <div className="bar-chart">
      <div className="header">
        <h4 className="header__title">{t(`dashboard.${queryKey}`)}</h4>
      </div>

      <div className="bar-chart__main">
        <ResponsiveContainer>
          <BarChart data={data} barSize={20}>
            <YAxis width={30} axisLine={false} tickLine={false} />
            <XAxis hide={true} dataKey={axisKey.xKey} />
            <Tooltip cursor={<CustomCursor />} content={<CustomTooltip tooltip={tooltip} />} />
            <Bar dataKey={axisKey.yKey} shape={<CustomBarShape />} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
