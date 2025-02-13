import { Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

type Props = {
  queryKey: string;
  fetchFunction: () => Promise<number>;
  icon: JSX.Element;
};

export const StatItem = ({ queryKey, fetchFunction, icon }: Props) => {
  const { t } = useTranslation();
  const { tokenData } = useAppContext();

  const { data, isLoading } = useQuery({ queryKey: [queryKey, tokenData?.userId], queryFn: fetchFunction });
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
        <h3 className="text">{t(`dashboard.${queryKey}`)}</h3>
      </div>
      <h2 className="stat__result">{data}</h2>
    </div>
  );
};
