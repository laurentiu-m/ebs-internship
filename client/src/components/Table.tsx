import { Dispatch, SetStateAction } from 'react';

import { flexRender, Table as TanStackTable } from '@tanstack/react-table';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { Filter } from './Filter';
import { TablePagination } from './TablePagination';
import searchIcon from '../assets/icons/search_icon.svg';

type ModalMode = 'create' | 'edit' | 'delete' | null;

type TableProps<TData> = {
  table: TanStackTable<TData>;
  state: {
    globalFilter: string | null;
    setGlobalFilter: Dispatch<SetStateAction<string | null>>;
  };
  header: { title: string; onClick: (mode?: ModalMode, id?: number) => void };
};

export const Table = <TData,>({ table, state, header }: TableProps<TData>) => {
  const { t } = useTranslation();

  return (
    <div className="table">
      <div className="table__header">
        <button onClick={() => header.onClick()} className="button">
          {header.title}
        </button>
        <div className="input-wrapper">
          <img src={searchIcon} alt="search-icon" />
          <input
            value={state?.globalFilter || ''}
            className="input"
            onChange={(e) => state?.setGlobalFilter(e.target.value || null)}
            placeholder={t('table.search')}
          />
        </div>
      </div>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="head-style" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan} className={header.column.columnDef.meta?.className || ''}>
                  {header.isPlaceholder ? null : (
                    <>
                      {header.column.columnDef.header != null ? (
                        <div
                          {...{
                            className: 'text',
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽'
                          }[header.column.getIsSorted() as string] || null}
                        </div>
                      ) : null}
                      {header.column.getCanFilter() && <Filter column={header.column} />}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => {
            return (
              <tr key={row.id} className={cn({ 'second-background': index % 2 === 0 })}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className={cell.column.columnDef.meta?.className || ''}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <TablePagination table={table} />
    </div>
  );
};
