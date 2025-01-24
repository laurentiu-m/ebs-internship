import { useState } from 'react';

import { apiClient } from '@src/api';
import { Routes } from '@src/app-constants';
import { Loading, Table } from '@src/components';
import { UserTable as UserTableTypes } from '@src/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  useReactTable,
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowData
} from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    filterVariant?: string;
    placeholder?: string;
    _unusedData?: TData;
    _unusedValue?: TValue;
  }
}

export const UserTable = () => {
  const queryClient = useQueryClient();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);

  const columnHelper = createColumnHelper<UserTableTypes>();

  const exactTextFilter = <TData,>(row: Row<TData>, columnId: string, filterValue: undefined) => {
    return row.getValue(columnId) === filterValue;
  };

  const { data, isLoading } = useQuery({ queryKey: ['user_table'], queryFn: () => apiClient.users.getList() });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      await apiClient.users.delete(userId);
      return userId;
    },
    onSuccess: (userId: number) => {
      queryClient.setQueryData(['user_table'], (oldData: UserTableTypes[]) =>
        oldData.filter((user) => user.id !== userId)
      );
    }
  });

  const handleDelete = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  const columns = [
    columnHelper.accessor('id', {
      enableGlobalFilter: false,
      meta: { className: 'center start' }
    }),
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('username', { header: 'Username' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('phone', { header: 'Phone', enableSorting: false }),
    columnHelper.accessor('gender', {
      header: undefined,
      filterFn: exactTextFilter,
      meta: { filterVariant: 'select', placeholder: 'Gender', className: 'select-head' },
      enableSorting: false,
      enableGlobalFilter: false
    }),
    columnHelper.accessor('role', {
      header: undefined,
      filterFn: exactTextFilter,
      meta: { filterVariant: 'select', placeholder: 'Roles', className: 'select-head' },
      enableSorting: false,
      enableGlobalFilter: false
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Options',
      meta: { className: 'center end' },
      cell: ({ row }) => (
        <div className="options center">
          <button className={`${row.original.id}`}>Edit</button>
          <button className="options__button" onClick={() => handleDelete(row.original.id)}>
            Delete
          </button>
        </div>
      )
    })
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    state: { columnFilters, pagination, globalFilter },
    autoResetPageIndex: false,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel()
  });

  if (isLoading) return <Loading />;

  return (
    <div className="users__table">
      <Table
        table={table}
        state={{ globalFilter, setGlobalFilter }}
        header={{ title: 'Add User', link: Routes.UsersCreate }}
      />
    </div>
  );
};
