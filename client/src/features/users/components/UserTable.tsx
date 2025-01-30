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
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);

  const columnHelper = createColumnHelper<UserTableTypes>();

  const exactTextFilter = <TData,>(row: Row<TData>, columnId: string, filterValue: undefined) => {
    return row.getValue(columnId) === filterValue;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['user_table'],
    queryFn: async () => {
      const { result } = await apiClient.users.getList();
      return result;
    }
  });

  const { mutate: deleteUser } = useMutation({
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

  const onDelete = (userId: number) => {
    deleteUser(userId);
  };

  const columns = [
    columnHelper.accessor('id', {
      enableGlobalFilter: false,
      meta: { className: 'center start' }
    }),
    columnHelper.accessor('name', { header: t('form.label.name') }),
    columnHelper.accessor('username', { header: t('form.label.username') }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('phone', { header: t('form.label.phone'), enableSorting: false }),
    columnHelper.accessor('gender', {
      header: undefined,
      filterFn: exactTextFilter,
      meta: { filterVariant: 'select', placeholder: t('form.label.gender.label'), className: 'select-head' },
      enableSorting: false,
      enableGlobalFilter: false
    }),
    columnHelper.accessor('role', {
      header: undefined,
      filterFn: exactTextFilter,
      meta: { filterVariant: 'select', placeholder: t('form.label.roles'), className: 'select-head' },
      enableSorting: false,
      enableGlobalFilter: false
    }),
    columnHelper.display({
      id: 'actions',
      header: t('table.options'),
      meta: { className: 'center end' },
      cell: ({ row }) => (
        <div className="options center">
          <Link to={Routes.UsersEdit.replace(':id', String(row.original.id))}>{t('table.edit')}</Link>
          <button className="options__button" onClick={() => onDelete(row.original.id)}>
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
        header={{ title: t('table.button-users'), link: Routes.UsersCreate }}
      />
    </div>
  );
};
