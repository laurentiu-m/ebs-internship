import { useTranslation } from 'react-i18next';

import { CustomSelect } from './CustomSelect';

const options = [
  { value: 'en', label: 'English' },
  { value: 'ro', label: 'Română' }
];

const style = {
  border: '0px',
  background: 'transparent',
  margin: '0'
};

export const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (newValue: unknown) => {
    const selectedValue = newValue as { value: string; label: string };
    if (!selectedValue) return;
    const lang = selectedValue.value;
    if (i18n.language === lang) return;
    i18n.changeLanguage(lang);
  };

  return (
    <CustomSelect
      options={options}
      style={style}
      defaultValue={i18n.language}
      placeholder="Language"
      onChange={onChangeLanguage}
    />
  );
};
