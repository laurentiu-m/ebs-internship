import { useTranslation } from 'react-i18next';

import { SelectReact } from './SelectReact';

const options = [
  { value: 'en', label: 'English' },
  { value: 'ro', label: 'Română' }
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (newValue: unknown) => {
    const selectedValue = newValue as { value: string; label: string };
    if (!selectedValue) return;
    const lang = selectedValue.value;
    if (i18n.language === lang) return;
    i18n.changeLanguage(lang);
  };

  return (
    <SelectReact options={options} defaultValue={i18n.language} placeholder="Language" onChange={onChangeLanguage} />
  );
};
