import { useMemo } from 'react';

import { Column } from '@tanstack/react-table';

export const Filter = ({ column }: { column: Column<any, unknown> }) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const sortedUniqueValues = useMemo(() => Array.from(column.getFacetedUniqueValues().keys()).slice(0, 5), [column]);

  return (
    filterVariant === 'select' && (
      <select onChange={(e) => column.setFilterValue(e.target.value)} value={columnFilterValue?.toString()}>
        <option value="">All</option>
        {sortedUniqueValues.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    )
  );
};
