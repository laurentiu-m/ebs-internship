import { Table } from '@tanstack/react-table';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { ArrowIcon } from './Icons';

type TableProps<TData> = {
  table: Table<TData>;
};

export const TablePagination = <TData,>({ table }: TableProps<TData>) => {
  const { t } = useTranslation();

  return (
    <div className="table__pagination">
      <div className="pages">
        {table.getState().pagination.pageIndex + 1} - {table.getState().pagination.pageSize} {t('table.page')}{' '}
        {table.getPageCount().toLocaleString()}
      </div>

      <div className="active">
        <div className="active__buttons">
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ArrowIcon styleClass={cn('icon', { 'icon--disabled': !table.getCanPreviousPage() })} />
          </button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ArrowIcon styleClass={cn('icon icon--right', { 'icon--disabled': !table.getCanNextPage() })} />
          </button>
        </div>

        <div className="active__select">
          <p>{t('table.rows')}</p>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
