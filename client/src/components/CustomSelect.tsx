import { FieldError } from 'react-hook-form';
import Select, { ActionMeta, MenuPlacement, StylesConfig } from 'react-select';

type Props = {
  placeholder?: string | JSX.Element;
  defaultValue?: string | number;
  placement?: string;
  style?: {
    container: {
      width: string;
    };
    control: {
      border: string;
      background: string;
      padding: string;
    };
    menu: {
      width: string;
      margin: string;
    };
    option: {
      font_size: string;
    };
    singleValue: {
      font_size: string;
      width: string;
      align: string;
      color: string;
      hover?: string;
    };
  };
  options: {
    value: string | number;
    label: string;
  }[];
  error?: FieldError;
  onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};

export const CustomSelect = ({ placeholder, placement, options, style, onChange, defaultValue, error }: Props) => {
  const customStyles: StylesConfig = {
    container: (provided) => ({
      ...provided,
      width: style?.container.width ?? '100%'
    }),
    control: (provided, { selectProps }) => {
      const borderColor = selectProps.menuIsOpen ? '#494ecc' : '#343b4f';

      return {
        ...provided,
        backgroundColor: style?.control?.background ?? '#0b1739',
        borderWidth: style?.control.border ?? '1px',
        borderStyle: 'solid',
        borderColor: error ? '#ff3b41' : borderColor,
        borderRadius: '4px',
        padding: style?.control.padding ?? '12px',
        outline: 'none',
        boxShadow: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        ':hover': {
          borderColor: error ? '#ff1f25' : borderColor
        }
      };
    },
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
      padding: '0px',
      '& svg': { fill: '#aeb9e1', backgroundColor: 'transparent' },
      transition: 'all .2s ease',
      transform: selectProps.menuIsOpen ? 'rotate(180deg)' : ''
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aeb9e1',
      backgroundColor: 'transparent',
      fontSize: '14px'
    }),
    menu: (provided) => ({
      ...provided,
      width: style?.menu?.width ?? '100%',
      marginTop: style?.menu?.margin ?? '12px',
      backgroundColor: '#0b1739',
      boxShadow: '0px 2px 12px 0px rgba(1, 5, 17, 0.44)',
      overflow: 'hidden',
      zIndex: '50'
    }),
    option: (provided) => ({
      ...provided,
      width: '100%',
      fontSize: style?.option?.font_size ?? '14px',
      textAlign: 'center',
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
      fontSize: style?.singleValue?.font_size ?? '14px',
      width: style?.singleValue?.width ?? '100%',
      textAlign: (style?.singleValue?.align as React.CSSProperties['textAlign']) ?? 'left',
      backgroundColor: 'transparent',
      color: style?.singleValue?.color ?? '#ffffff',
      transition: 'all 0.1s ease-in-out',
      ':hover': {
        color: style?.singleValue?.hover ?? '#ffffff'
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 0 0 0px',
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
      menuPlacement={placement as MenuPlacement}
      defaultValue={options.find((option) => option.value === defaultValue)}
      placeholder={placeholder}
      isSearchable={false}
      styles={customStyles}
      onChange={onChange}
    />
  );
};
