import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';

type StatsComponentProps = {
  title: string;
  queryKey: string[];
  fetchFunction: () => Promise<string>;
};

export const StatsComponent = ({ title, queryKey, fetchFunction }: StatsComponentProps) => {
  const { data, isLoading } = useQuery({ queryKey: queryKey, queryFn: fetchFunction });
  if (isLoading) return <Loading />;
  return (
    <div className="stats">
      <h3 className="stats__title">{title}</h3>
      <h2 className="stats__result">{data}</h2>
    </div>
  );
};
