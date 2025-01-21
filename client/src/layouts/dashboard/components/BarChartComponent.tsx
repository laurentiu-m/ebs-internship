import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';
import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

type BarChartProps = {
  queryKey: string;
  axisKey: { yKey: string; xKey: string };
  tooltip: { xKey: string; yKey: string };
  fetchFunction: () => Promise<undefined>;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string | number;
}

export const BarChartComponent = ({ queryKey, axisKey, tooltip, fetchFunction }: BarChartProps) => {
  const { data, isLoading } = useQuery({ queryKey: [queryKey], queryFn: fetchFunction });

  if (isLoading) return <Loading />;

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p>{`${tooltip.xKey} ${label} - ${payload[0].value} ${tooltip.yKey}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ margin: '0', padding: '0', display: 'flex', justifyContent: 'flex-start' }}>
      <BarChart width={350} height={350} data={data} barSize={20} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <YAxis width={30} axisLine={false} tickLine={false} />
        <XAxis dataKey={axisKey.xKey} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={axisKey.yKey} fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </div>
  );
};
