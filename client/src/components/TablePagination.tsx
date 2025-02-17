import { ArrowIcon } from '@src/assets/icons';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { TablePageTypes } from '../types';
import { CustomSelect } from './CustomSelect';

type Props = {
  page: TablePageTypes;
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

export const TablePagination = ({ page }: Props) => {
  const { t } = useTranslation();
  const { pageIndex, pageSize, totalPages, onPageChange, onRowsChange } = page;

  const pageText = `${t('table.page')} ${pageIndex + 1} ${t('table.page_of')} ${totalPages > 0 ? totalPages : totalPages + 1}`;

  const onPrev = () => {
    onPageChange(pageIndex - 1);
  };
  const hasPrev = !pageIndex;

  const onNext = () => {
    onPageChange(pageIndex + 1);
  };
  const hasNext = pageIndex + 1 >= totalPages;

  const getSelectPlacement = totalPages > 0 ? 'top' : 'bottom';

  return (
    <div className="table__pagination">
      <div className="pages">{pageText}</div>

      <div className="active">
        <div className="active__buttons">
          <button onClick={onPrev} className={cn('button', { 'button--disabled': hasPrev })} disabled={hasPrev}>
            <ArrowIcon className={cn('icon', { 'icon--disabled': hasPrev })} />
          </button>
          <button onClick={onNext} className={cn('button', { 'button--disabled': hasNext })} disabled={hasNext}>
            <ArrowIcon className={cn('icon icon--right', { 'icon--disabled': hasNext })} />
          </button>
        </div>

        <div className="active__select">
          <p className="text">{t('table.rows')}</p>

          <CustomSelect
            defaultValue={pageSize}
            placement={getSelectPlacement}
            style={style}
            options={options}
            onChange={(selectedOption) => {
              onRowsChange((selectedOption as { value: number }).value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
