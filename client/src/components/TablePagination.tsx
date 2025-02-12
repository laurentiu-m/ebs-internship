import { ArrowIcon } from '@src/assets/icons';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { CustomSelect } from './CustomSelect';

type TableProps = {
  page: {
    pageIndex: number;
    pageSize: number;
    currentTotalPages: number;
    totalPages: number;
    onPageChange: (index: number) => void;
    onRowsChange: (index: number) => void;
  };
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

export const TablePagination = ({ page }: TableProps) => {
  const { t } = useTranslation();

  return (
    <div className="table__pagination">
      <div className="pages">
        Page {page.pageIndex + 1} {t('table.page')} {page.totalPages > 0 ? page.totalPages : page.totalPages + 1}
      </div>

      <div className="active">
        <div className="active__buttons">
          <button onClick={() => page.onPageChange(page.pageIndex - 1)} disabled={page.pageIndex === 0}>
            <ArrowIcon className={cn('icon', { 'icon--disabled': page.pageIndex === 0 })} />
          </button>
          <button
            onClick={() => page.onPageChange(page.pageIndex + 1)}
            disabled={page.pageIndex + 1 >= page.totalPages}
          >
            <ArrowIcon
              className={cn('icon icon--right', { 'icon--disabled': page.pageIndex + 1 >= page.totalPages })}
            />
          </button>
        </div>

        <div className="active__select">
          <p className="text">{t('table.rows')}</p>

          <CustomSelect
            defaultValue={page.pageSize}
            placement="top"
            style={style}
            options={options}
            onChange={(selectedOption) => {
              page.onRowsChange((selectedOption as { value: number }).value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
