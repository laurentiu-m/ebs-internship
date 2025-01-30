import { FieldError } from 'react-hook-form';
import Select, { ActionMeta, StylesConfig } from 'react-select';

type Props = {
  placeholder?: string | JSX.Element;
  defaultValue?: string;
  style?: {
    border: string;
    background: string;
    margin: string;
  };
  options: {
    value: string;
    label: string;
  }[];
  error?: FieldError | undefined;
  onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};

export const CustomSelect = ({ placeholder, options, style, onChange, defaultValue, error }: Props) => {
  const customStyles: StylesConfig = {
    container: (provided) => ({
      ...provided,
      width: '100%'
    }),
    control: (provided, { selectProps }) => ({
      ...provided,
      backgroundColor: `${style?.background ? style?.background : '#0b1739'}`,
      borderWidth: `${style?.border ? style?.border : '1px'}`,
      borderStyle: 'solid',
      borderColor: error ? '#ff3b41' : selectProps.menuIsOpen ? '#494ecc' : '#343b4f',
      borderRadius: '4px',
      paddingBlock: '12px',
      outline: 'none',
      boxShadow: 'none',
      overflow: 'hidden',
      cursor: 'pointer',
      ':hover': {
        borderColor: error ? '#ff1f25' : selectProps.menuIsOpen ? '#494ecc' : '#343b4f'
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
    dropdownIndicator: (provided, { selectProps }) => ({
      ...provided,
      backgroundColor: 'transparent',
      padding: '0 12px',
      '& svg': { fill: '#ffffff', backgroundColor: 'transparent' },
      transition: 'all .2s ease',
      transform: selectProps.menuIsOpen ? 'rotate(180deg)' : ''
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aeb9e1',
      backgroundColor: 'transparent'
    }),
    menu: (provided) => ({
      ...provided,
      width: '100%',
      marginTop: `${style?.margin ? style?.margin : '12px'}`,
      backgroundColor: '#0b1739',
      boxShadow: '0px 2px 12px 0px rgba(1, 5, 17, 0.35)',
      overflow: 'hidden'
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '14px',
      backgroundColor: '#0b1739',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      ':hover': {
        backgroundColor: '#5a60e6'
      },
      ':active': {
        backgroundColor: ''
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '14px',
      textAlign: 'center',
      backgroundColor: 'transparent',
      color: '#ffffff'
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 0 0 12px',
      color: '#ffffff',
      backgroundColor: 'transparent'
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '0px',
      backgroundColor: 'none'
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
