import { Roles, Routes } from '@src/app-constants';
import '@src/styles/sidebar.scss';
import ArrowIcon from '@src/assets/icons/arrow_icon.svg?react';
import Home from '@src/assets/icons/home_icon.svg?react';
import Logo from '@src/assets/icons/logo.svg?react';
import PostsIcon from '@src/assets/icons/posts_icon.svg?react';
import UsersIcon from '@src/assets/icons/users_icon.svg?react';
import { useAppContext } from '@src/hooks/useAppContext';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Loading } from './Loading';

export const Sidebar = () => {
  const { isSidebarClosed, onToggleSidebar, tokenData } = useAppContext();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  if (!tokenData) {
    return <Loading />;
  }

  const { role } = tokenData;

  const buttonsConfig = [
    {
      text: 'dashboard',
      icon: <Home className="icon" />,
      link: Routes.Dashboard,
      requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
    },
    {
      text: t('sidebar.users'),
      icon: <UsersIcon className="icon" />,
      link: Routes.Users,
      requiredRoles: [Roles.Admin]
    },
    {
      text: t('sidebar.posts'),
      icon: <PostsIcon className="icon" />,
      link: Routes.Posts,
      requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
    }
  ];

  return (
    <div className={cn('sidebar', { 'sidebar--closed': isSidebarClosed })}>
      <div className="sidebar__header">
        <div className={cn('logo', { 'logo--closed': isSidebarClosed })}>
          <Logo className="icon" />
          <h1>NexaPanel</h1>
        </div>

        <div className={cn('toggle', { 'toggle--rotated': isSidebarClosed })} onClick={onToggleSidebar}>
          <ArrowIcon className={`icon ${isSidebarClosed ? 'icon--closed' : ''}`} />
        </div>
      </div>

      <div className="sidebar__buttons">
        {buttonsConfig
          .filter((button) => button.requiredRoles.includes(role as Roles))
          .map((button) => (
            <Link
              key={button.text}
              className={cn('sidebar__button', { 'sidebar__button--active ': pathname === button.link })}
              to={button.link}
            >
              <div className="icon">{button.icon}</div>

              <p className={cn('text', { 'text--closed': isSidebarClosed })}>{button.text}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};
