import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';

type StatsComponentProps = {
  title: string;
  queryKey: string[];
  fetchFunction: () => Promise<number>;
  icon: JSX.Element;
};

export const StatItem = ({ title, queryKey, fetchFunction, icon }: StatsComponentProps) => {
  const { data, isLoading } = useQuery({ queryKey: queryKey, queryFn: fetchFunction });
  if (isLoading) return <Loading />;

  return (
    <div className="stat">
      <div className="stat__title">
        {icon}
        <h3 className="text">{title}</h3>
      </div>
      <h2 className="stat__result">{data}</h2>
    </div>
  );
};
