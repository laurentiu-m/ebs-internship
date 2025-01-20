import { useState } from 'react';

import { Routes } from '@src/app-constants';
import '@src/styles/sidebar.scss';
import home_icon from '@src/assets/icons/home_icon.svg';
import posts_icon from '@src/assets/icons/posts_icon.svg';
import users_icon from '@src/assets/icons/users_icon.svg';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { ArrowSidebar } from './ArrowSidebar';

export const Sidebar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [isClosed, setIsClosed] = useState(false);

  const buttonsConfig = [
    { text: 'dashboard', icon: home_icon, link: Routes.Dashboard },
    { text: t('sidebar.users'), icon: users_icon, link: Routes.Users },
    { text: t('sidebar.posts'), icon: posts_icon, link: Routes.Posts }
  ];

  return (
    <div className={`sidebar ${isClosed ? 'sidebar--closed' : ''}`}>
      <div className="sidebar__header">
        <div className={`logo ${isClosed ? 'logo--closed' : ''}`}>
          <h1>Logo.</h1>
        </div>

        <div className={`toggle ${isClosed ? 'toggle--rotated' : ''}`} onClick={() => setIsClosed(!isClosed)}>
          <ArrowSidebar styleClass={`icon ${isClosed ? 'icon--closed' : ''}`} />
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
            {isClosed ? '' : button.text}
          </Link>
        ))}
      </div>
    </div>
  );
};
