import { Routes } from '@src/app-constants';
import account_icon from '@src/assets/icons/account_icon.svg';
import { useAppContext } from '@src/hooks/useAppContext';
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

export const UserSelect = () => {
  const { t } = useTranslation();
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

  const CustomPlaceholder = () => (
    <div className="topbar__user">
      <img src={account_icon} alt="user_icon" />
      <span>{tokenData.username}</span>
    </div>
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate(Routes.Login);
  };

  return <CustomSelect options={options} style={style} placeholder={<CustomPlaceholder />} onChange={handleLogout} />;
};
