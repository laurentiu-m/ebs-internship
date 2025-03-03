import { HELMET_DATA } from '@src/app-constants';
import { HelmetPage } from '@src/types/helmet';
import { Helmet as HelmetComponent } from 'react-helmet-async';

type Props = {
  page: HelmetPage;
};

export const Helmet = ({ page }: Props) => {
  const { title, description } = HELMET_DATA[page];

  return (
    <HelmetComponent>
      <title>NexaPanel | {title}</title>
      <meta name="description" content={description} />
    </HelmetComponent>
  );
};
