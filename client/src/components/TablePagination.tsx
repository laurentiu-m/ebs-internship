import { ArrowIcon } from '@src/assets/icons';
import { Table } from '@tanstack/react-table';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { CustomSelect } from './CustomSelect';

type TableProps<TData> = {
  table: Table<TData>;
};

const options = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' }
];

const style = {
  container: {
    width: '50px'
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
    font_size: '12px'
  },
  singleValue: {
    font_size: '12px',
    width: '100%',
    align: 'center',
    color: '#ffffff'
  }
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
            <ArrowIcon className={cn('icon', { 'icon--disabled': !table.getCanPreviousPage() })} />
          </button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ArrowIcon className={cn('icon icon--right', { 'icon--disabled': !table.getCanNextPage() })} />
          </button>
        </div>

        <div className="active__select">
          <p className="text">{t('table.rows')}</p>

          <CustomSelect
            defaultValue={10}
            placement="top"
            style={style}
            options={options}
            onChange={(selectedOption) => {
              table.setPageSize((selectedOption as { value: number }).value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
