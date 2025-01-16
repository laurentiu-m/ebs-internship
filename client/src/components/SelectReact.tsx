import { FieldError } from 'react-hook-form';
import Select, { ActionMeta, StylesConfig } from 'react-select';

type SelectReactProps = {
  placeholder: string;
  defaultValue?: string;
  options: {
    value: string;
    label: string;
  }[];
  error: FieldError | undefined;
  onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};

export const SelectReact = ({ placeholder, options, onChange, defaultValue, error }: SelectReactProps) => {
  const customStyles: StylesConfig = {
    container: (provided) => ({
      ...provided,
      width: '100%'
    }),
    control: (provided, state) => ({
      ...provided,
      position: 'relative',
      backgroundColor: 'white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: error ? 'red' : state.isFocused ? '#0057fc' : '#ced4da',
      borderRadius: '8px',
      height: '49.6px',
      outline: 'none',
      boxShadow: 'none',
      overflow: 'hidden',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'none'
      }
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      backgroundColor: 'transparent'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      padding: '0 12px',
      '& svg': { fill: '#ced4da', backgroundColor: 'transparent' },
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : ''
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ced4da',
      backgroundColor: 'transparent'
    }),
    menu: (provided) => ({
      ...provided,
      width: '100%',
      backgroundColor: 'white',
      border: '1px solid #ced4da',
      borderRadius: '8px',
      boxShadow: 'none',
      overflow: 'hidden'
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? '#0057fc' : 'transparent',
      color: state.isFocused ? 'white' : '#343a40',
      cursor: 'pointer'
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
