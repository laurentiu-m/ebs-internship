import { Routes } from '@src/app-constants';
import '@src/styles/sidebar.scss';
import home_icon from '@src/assets/icons/home_icon.svg';
import posts_icon from '@src/assets/icons/posts_icon.svg';
import users_icon from '@src/assets/icons/users_icon.svg';
import { useAppContext } from '@src/hooks/useAppContext';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { ArrowSidebar } from './ArrowSidebar';

export const Sidebar = () => {
  const { isSidebarClosed, toggleSidebar } = useAppContext();

  const { t } = useTranslation();
  const { pathname } = useLocation();

  const buttonsConfig = [
    { text: 'dashboard', icon: home_icon, link: Routes.Dashboard },
    { text: t('sidebar.users'), icon: users_icon, link: Routes.Users },
    { text: t('sidebar.posts'), icon: posts_icon, link: Routes.Posts }
  ];

  return (
    <div className={`sidebar ${isSidebarClosed ? 'sidebar--closed' : ''}`}>
      <div className="sidebar__header">
        <div className={`logo ${isSidebarClosed ? 'logo--closed' : ''}`}>
          <h1>Logo.</h1>
        </div>

        <div className={`toggle ${isSidebarClosed ? 'toggle--rotated' : ''}`} onClick={toggleSidebar}>
          <ArrowSidebar styleClass={`icon ${isSidebarClosed ? 'icon--closed' : ''}`} />
        </div>
      </div>

      <div className="sidebar__buttons">
        {buttonsConfig.map((button) => (
          <Link
            key={button.text}
            className={`sidebar__button${pathname === button.link ? ' sidebar__button--active' : ''}`}
            to={button.link}
          >
            <img src={button.icon} alt={`button-${button.text}`} />
            <p className={`text ${isSidebarClosed ? 'text--closed' : ''}`}>{button.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
