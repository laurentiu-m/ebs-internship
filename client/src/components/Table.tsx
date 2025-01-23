import { useState } from 'react';

import { apiClient } from '@src/api';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';

import { Filter } from './Filter';
import { Loading } from './Loading';
import '@src/styles/table.scss';
import Placeholder from 'node_modules/react-select/dist/declarations/src/components/Placeholder';
import cn from 'classnames';
import { ArrowSidebar } from './ArrowSidebar';

type Person = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
};

export const Table = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columnHelper = createColumnHelper<Person>();

  const exactTextFilter = (row, columnId, filterValue) => {
    return row.getValue(columnId) === filterValue;
  };

  const columns = [
    columnHelper.accessor('id', {
      enableGlobalFilter: false,
      meta: {
        className: 'center start'
      }
    }),
    columnHelper.accessor('name', {
      header: 'Name'
    }),
    columnHelper.accessor('username', {
      header: 'Username'
    }),
    columnHelper.accessor('email', {
      header: 'Email'
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
      enableSorting: false
    }),
    columnHelper.accessor('gender', {
      header: undefined,
      filterFn: exactTextFilter,
      meta: {
        filterVariant: 'select',
        placeholder: 'Gender',
        className: 'select-head'
      },
      enableSorting: false,
      enableGlobalFilter: false
    }),
    columnHelper.accessor('role', {
      header: undefined,
      filterFn: exactTextFilter,
      meta: {
        filterVariant: 'select',
        placeholder: 'Roles',
        className: 'select-head end'
      },
      enableSorting: false,
      enableGlobalFilter: false
    })
  ];

  const { data, isLoading } = useQuery({ queryKey: ['user_table'], queryFn: () => apiClient.users.getList() });
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);

  const table = useReactTable({
    data: data || [],
    columns,
    filterFns: {
      exactText: exactTextFilter
    },
    state: {
      columnFilters,
      pagination,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter
  });

  if (isLoading) return <Loading />;

  return (
    <div className="table">
      <div className="table__header">
        <button className="button">Add User</button>

        <input
          value={globalFilter || ''}
          className="input"
          onChange={(e) => setGlobalFilter(e.target.value || null)}
          placeholder="Search..."
        />
      </div>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="head-style" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan} className={header.column.columnDef.meta?.className ?? ''}>
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
              <tr key={row.id} style={{ backgroundColor: `${index % 2 !== 0 ? 'white' : '#f8f9fa'}` }}>
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

      {/* Pagination */}
      <div className="table__pagination">
        <div className="pages">
          {table.getState().pagination.pageIndex + 1} - {table.getState().pagination.pageSize} of{' '}
          {table.getPageCount().toLocaleString()}
        </div>

        <div className="active">
          <div className="active__buttons">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ArrowSidebar styleClass={cn('icon', { 'icon--disabled': !table.getCanPreviousPage() })} />
            </button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <ArrowSidebar styleClass={cn('icon icon--right', { 'icon--disabled': !table.getCanNextPage() })} />
            </button>
          </div>

          <div className="active__select">
            <p>Rows per page:</p>

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
    </div>
  );
};
