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
      enableGlobalFilter: false
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
      header: 'Gender',
      filterFn: exactTextFilter,
      meta: {
        filterVariant: 'select'
      },
      enableSorting: false,
      enableGlobalFilter: false
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      filterFn: exactTextFilter,
      meta: {
        filterVariant: 'select'
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
    <div className="p-2">
      <div>
        <input
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value || null)}
          placeholder="Search..."
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler()
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽'
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button className="border rounded p-1" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button className="border rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        <button className="border rounded p-1" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} - {table.getState().pagination.pageSize} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
