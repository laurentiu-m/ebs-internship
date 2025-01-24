import { Dispatch, SetStateAction } from 'react';

import { UserTable } from '@src/types';
import { flexRender, Table as TableTypes } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import { Filter } from './Filter';
import { TablePagination } from './TablePagination';

type TableProps = {
  table: TableTypes<UserTable>;
  state: {
    globalFilter: string | null;
    setGlobalFilter: Dispatch<SetStateAction<string | null>>;
  };
  header: { title: string; link: string };
};

export const Table = ({ table, state, header }: TableProps) => {
  return (
    <div className="table">
      <div className="table__header">
        <Link to={header.link} className="button">
          {header.title}
        </Link>

        <input
          value={state?.globalFilter || ''}
          className="input"
          onChange={(e) => state?.setGlobalFilter(e.target.value || null)}
          placeholder="Search..."
        />
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
                      {header.column.getCanFilter() && (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      )}
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
              <tr
                key={row.id}
                style={{
                  backgroundColor: `${index % 2 !== 0 ? 'white' : '#f8f9fa'}`
                }}
              >
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
