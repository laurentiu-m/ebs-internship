import { useState } from 'react';

import arrow_drop_down from '@src/assets/icons/arrow_drop_down.svg';
import arrow_drop_up from '@src/assets/icons/arrow_drop_up.svg';
import { useTranslation } from 'react-i18next';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="language">
      <div className="dropdown">
        <div
          className={`dropdown__button ${isDropdownOpen ? 'dropdown__button--active' : ''}`}
          onClick={toggleDropdown}
        >
          <span>{i18n.language === 'en' ? 'English' : 'Română'}</span>
          <img src={`${isDropdownOpen ? arrow_drop_up : arrow_drop_down}`} alt="arrow-icon" />
        </div>
        {isDropdownOpen && (
          <div className="dropdown__options">
            <a onClick={() => onChangeLanguage('en')} className="option">
              English
            </a>
            <a onClick={() => onChangeLanguage('ro')} className="option">
              Română
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
