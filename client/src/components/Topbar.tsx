import { LanguageSelect } from './LanguageSelect';
import { UserSelect } from './UserSelect';

export const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar__language">
        <LanguageSelect />
      </div>

      <div className="topbar__user">
        <UserSelect />
      </div>
    </div>
  );
};
