import { Routes } from '@src/app-constants';
import { AccountIcon } from '@src/assets/icons';
import { useAppContext } from '@src/hooks/useAppContext';
import { JwtPayload } from '@src/types';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CustomSelect } from './CustomSelect';
import { Loading } from './Loading';

const style = {
  container: {
    width: '100%'
  },
  control: {
    border: '0px',
    background: 'transparent',
    padding: '0px'
  },
  menu: {
    width: '100%',
    margin: '0px'
  },
  option: {
    font_size: '14px'
  },
  singleValue: {
    font_size: '14px',
    width: '1005',
    align: 'center',
    color: '#ffffff'
  }
};

const CustomPlaceholder = ({ tokenData }: { tokenData: JwtPayload }) => (
  <div className="topbar__user">
    <AccountIcon />
    <span>{tokenData.username}</span>
  </div>
);

export const UserSelect = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { tokenData } = useAppContext();

  if (!tokenData) {
    return <Loading />;
  }

  const options = [
    {
      value: 'logout',
      label: t('topbar.logout')
    }
  ];

  const handleLogout = () => {
    queryClient.clear();
    localStorage.clear();
    navigate(Routes.Login);
  };

  return (
    <CustomSelect
      options={options}
      style={style}
      placeholder={<CustomPlaceholder tokenData={tokenData} />}
      onChange={handleLogout}
    />
  );
};
