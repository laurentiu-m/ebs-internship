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
  if (isLoading)
    return (
      <div className="stat">
        <Loading />
      </div>
    );

  return (
    <div className="stat">
      <div className="stat__title">
        {icon}
        <h4 className="text">{t(`dashboard.${queryKey}`)}</h4>
      </div>
      <h3 className="stat__result">{data}</h3>
    </div>
  );
};
