import { Routes } from '@src/app-constants';
import '@src/styles/sidebar.scss';
import home_icon from '@src/assets/icons/home_icon.svg';
import posts_icon from '@src/assets/icons/posts_icon.svg';
import users_icon from '@src/assets/icons/users_icon.svg';
import { Link, useLocation } from 'react-router-dom';

const buttonsConfig = [
  { text: 'dashboard', icon: home_icon, link: Routes.Dashboard },
  { text: 'users', icon: users_icon, link: Routes.Users },
  { text: 'posts', icon: posts_icon, link: Routes.Posts }
];

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <h1>Logo.</h1>
      </div>

      <div className="sidebar__buttons">
        {buttonsConfig.map((button) => (
          <Link
            key={button.text}
            className={`sidebar__button${pathname === button.link ? ' sidebar__button--active' : ''}`}
            to={button.link}
          >
            <img src={button.icon} alt={`button-${button.text}`} />
            {button.text}
          </Link>
        ))}
      </div>
    </div>
  );
};
