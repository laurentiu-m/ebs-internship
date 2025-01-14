import { useTranslation } from 'react-i18next';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language">
      <select
        className="language__select"
        onChange={(e) => onChangeLanguage(e.target.value)}
        defaultValue={i18n.language}
      >
        <option value="en">English</option>
        <option value="ro">Română</option>
      </select>
    </div>
  );
};
