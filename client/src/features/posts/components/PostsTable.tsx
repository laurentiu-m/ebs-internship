import { useState } from 'react';

import { apiClient } from '@src/api';
import { Routes } from '@src/app-constants';
import { Loading, Table } from '@src/components';
import { Posts } from '@src/types';
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

export const PostsTable = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);

  const columnHelper = createColumnHelper<Posts>();

  const { data, isLoading } = useQuery({ queryKey: ['posts_table'], queryFn: () => apiClient.posts.getList() });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      await apiClient.posts.delete(postId);
      return postId;
    },
    onSuccess: (postId: number) => {
      queryClient.setQueryData(['posts_table'], (oldData: Posts[]) => oldData.filter((post) => post.id !== postId));
    }
  });

  const handleDelete = (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  const columns = [
    columnHelper.accessor('id', {
      enableGlobalFilter: false,
      meta: { className: 'center start' }
    }),
    columnHelper.accessor('userId', { header: t('UserId') }),
    columnHelper.accessor('title', { header: t('Title') }),
    columnHelper.accessor('body', { header: 'Body' }),
    columnHelper.display({
      id: 'actions',
      header: t('table.options'),
      meta: { className: 'center end' },
      cell: ({ row }) => (
        <div className="options center">
          <Link to={Routes.PostsEdit.replace(':id', String(row.original.id))}>{t('table.edit')}</Link>
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
    <div className="posts__table">
      <Table
        table={table}
        state={{ globalFilter, setGlobalFilter }}
        header={{ title: 'Create Post', link: Routes.PostsCreate }}
      />
    </div>
  );
};
