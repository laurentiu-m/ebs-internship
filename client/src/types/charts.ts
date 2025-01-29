import { TopPosts } from './posts';

export type BarChartProps = {
  title: string;
  queryKey: string;
  axisKey: { yKey: string; xKey: string };
  tooltip: { xKey: string; yKey: string };
  fetchFunction: () => Promise<TopPosts[]>;
};
