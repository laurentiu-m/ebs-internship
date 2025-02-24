import { useMemo } from 'react';

import { Column } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { CustomSelect } from './CustomSelect';

const style = {
  container: {
    width: '100%'
  },
  control: {
    border: '0px',
    background: 'transparent',
    padding: '0px'
  },
  menu: {
    width: '130px',
    margin: '0px'
  },
  option: {
    font_size: '10px'
  },
  singleValue: {
    font_size: '10px',
    width: '100%',
    align: 'center',
    color: '#ffffff',
    hover: '#5a60e6'
  }
};

export const Filter = <TData,>({ column }: { column: Column<TData, unknown> }) => {
  const { t, i18n } = useTranslation();
  const { filterVariant, placeholder } = column.columnDef.meta ?? {};

  const sortedUniqueValues = useMemo(() => Array.from(column.getFacetedUniqueValues().keys()).slice(0, 5), [column]);

  return (
    filterVariant === 'select' && (
      <CustomSelect
        key={i18n.language}
        defaultValue=""
        style={style}
        options={[
          { value: '', label: t(`select.${placeholder}`) },
          ...sortedUniqueValues.map((value) => ({ value, label: t(`select.${value}`) }))
        ]}
        onChange={(selectedOption, _actionMeta) =>
          column.setFilterValue((selectedOption as { value: string } | null)?.value ?? '')
        }
      />
    )
  );
};
