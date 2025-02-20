import { setLanguage } from '@src/api/axios';
import { useTranslation } from 'react-i18next';

import { CustomSelect } from './CustomSelect';

const options = [
  { value: 'en', label: 'English' },
  { value: 'ro', label: 'Română' }
];

const style = {
  container: {
    width: '100px'
  },
  control: {
    border: '0px',
    background: 'transparent',
    padding: '0px'
  },
  menu: {
    width: '100%',
    margin: '0px'
  },
  option: {
    font_size: '14px'
  },
  singleValue: {
    font_size: '14px',
    width: '100%',
    align: 'center',
    color: '#aeb9e1'
  }
};

export const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (newValue: unknown) => {
    const selectedValue = newValue as { value: string; label: string };
    if (!selectedValue) return;

    const lang = selectedValue.value;
    if (i18n.language === lang) return;
    i18n.changeLanguage(lang);
    setLanguage(lang);
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
