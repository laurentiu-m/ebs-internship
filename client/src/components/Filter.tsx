import { useMemo } from 'react';

import { Column } from '@tanstack/react-table';

import { CustomSelect } from './CustomSelect';

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
    width: '115px',
    margin: '0px'
  },
  option: {
    font_size: '10px'
  },
  singleValue: {
    font_size: '10px',
    width: '90%',
    align: 'right',
    color: '#ffffff'
  }
};

export const Filter = <TData,>({ column }: { column: Column<TData, unknown> }) => {
  const { filterVariant, placeholder } = column.columnDef.meta ?? {};

  const sortedUniqueValues = useMemo(() => Array.from(column.getFacetedUniqueValues().keys()).slice(0, 5), [column]);

  return (
    filterVariant === 'select' && (
      <CustomSelect
        defaultValue=""
        style={style}
        options={[{ value: '', label: placeholder }, ...sortedUniqueValues.map((value) => ({ value, label: value }))]}
        onChange={(selectedOption, _actionMeta) =>
          column.setFilterValue((selectedOption as { value: string } | null)?.value || '')
        }
      />
    )
  );
};
