import { Routes } from '@src/app-constants';
import account_icon from '@src/assets/icons/account_icon.svg';
import { getTokenData } from '@src/utils/getTokenData';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CustomSelect } from './CustomSelect';

export const UserSelect = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const tokenData = getTokenData();

  if (!tokenData) {
    return;
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

  return <CustomSelect options={options} placeholder={<CustomPlaceholder />} onChange={handleLogout} />;
};
