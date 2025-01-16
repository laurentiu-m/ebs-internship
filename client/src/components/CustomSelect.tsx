import { FieldError } from 'react-hook-form';
import Select, { ActionMeta, StylesConfig } from 'react-select';

type SelectReactProps = {
  placeholder?: string;
  defaultValue?: string;
  options: {
    value: string;
    label: string;
  }[];
  error?: FieldError | undefined;
  onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};

export const CustomSelect = ({ placeholder, options, onChange, defaultValue, error }: SelectReactProps) => {
  const customStyles: StylesConfig = {
    container: (provided) => ({
      ...provided,
      width: '100%'
    }),
    control: (provided, { isFocused }) => ({
      ...provided,
      backgroundColor: 'white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: error ? '#ff1f25' : isFocused ? '#0057fc' : '#ced4da',
      borderRadius: '8px',
      height: '49.6px',
      outline: 'none',
      boxShadow: 'none',
      overflow: 'hidden',
      cursor: 'pointer'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      backgroundColor: 'transparent'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none'
    }),
    dropdownIndicator: (provided, { selectProps }) => ({
      ...provided,
      backgroundColor: 'transparent',
      padding: '0 12px',
      '& svg': { fill: '#ced4da', backgroundColor: 'transparent' },
      transition: 'all .2s ease',
      transform: selectProps.menuIsOpen ? 'rotate(180deg)' : ''
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ced4da',
      backgroundColor: 'transparent'
    }),
    menu: (provided) => ({
      ...provided,
      width: '100%',
      marginTop: '-8px',
      backgroundColor: 'white',
      border: '1px solid #0057fc',
      borderTop: 'none',
      borderRadius: '0 0 8px 8px',
      boxShadow: 'none',
      overflow: 'hidden'
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      backgroundColor: isSelected ? '#0057fc' : isFocused ? '#e9ecef' : 'transparent',
      color: isSelected ? 'white' : isFocused ? '#343a40' : '#343a40',
      cursor: 'pointer',
      ':active': {
        backgroundColor: isSelected ? '' : ''
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      backgroundColor: 'transparent'
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 12px',
      color: '#343a40',
      backgroundColor: 'transparent'
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '4px 0 0 0',
      backgroundColor: 'white'
    })
  };

  return (
    <Select
      options={options}
      defaultValue={options.find((option) => option.value === defaultValue)}
      placeholder={placeholder}
      isSearchable={false}
      styles={customStyles}
      onChange={onChange}
    />
  );
};
