import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';

type StatsComponentProps = {
  title: string;
  queryKey: string[];
  fetchFunction: () => Promise<string>;
};

export const StatItem = ({ title, queryKey, fetchFunction }: StatsComponentProps) => {
  const { data, isLoading } = useQuery({ queryKey: queryKey, queryFn: fetchFunction });
  if (isLoading) return <Loading />;
  return (
    <div className="stat">
      <h3 className="stat__title">{title}</h3>
      <h2 className="stat__result">{data}</h2>
    </div>
  );
};
