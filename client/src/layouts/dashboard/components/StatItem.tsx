import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

type Props = {
  queryKey: string;
  fetchFunction: () => Promise<number>;
  icon: JSX.Element;
};

export const StatItem = ({ queryKey, fetchFunction, icon }: Props) => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({ queryKey: [queryKey], queryFn: fetchFunction });
  if (isLoading) return <Loading />;

  return (
    <div className="stat">
      <div className="stat__title">
        {icon}
        <h3 className="text">{t(`dashboard.${queryKey}`)}</h3>
      </div>
      <h2 className="stat__result">{data}</h2>
    </div>
  );
};
