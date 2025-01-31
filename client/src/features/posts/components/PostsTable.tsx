import { useEffect, useState } from 'react';

import { apiClient } from '@src/api';
import { Roles, Routes } from '@src/app-constants';
import { DeleteIcon, EditIcon, Loading, Table } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';
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
  const { tokenData } = useAppContext();
  const queryClient = useQueryClient();

  const userRole = tokenData?.role;
  const userId = tokenData?.userId;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);

  const columnHelper = createColumnHelper<Posts>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  const { data, isLoading } = useQuery({
    queryKey: ['posts_table', userRole, userId],
    queryFn: () => {
      if (userRole === Roles.User) {
        return apiClient.posts.getByUserId(userId as number);
      } else {
        return apiClient.posts.getList();
      }
    },
    enabled: !!userRole && !!userId
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      await apiClient.posts.delete(postId);
      return postId;
    },
    onSuccess: (postId: number) => {
      queryClient.setQueryData(['posts_table', userRole, userId], (oldData: Posts[]) =>
        oldData.filter((post) => post.id !== postId)
      );
    }
  });

  const onDelete = (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  const columns = [
    columnHelper.accessor('id', {
      enableGlobalFilter: false,
      meta: { className: 'center start' }
    }),
    columnHelper.accessor('userId', { header: 'userId' }),
    columnHelper.accessor('title', { header: t('form.label.title') }),
    columnHelper.accessor('body', { header: t('form.label.body') }),
    columnHelper.display({
      id: 'actions',
      header: t('table.options'),
      meta: { className: 'center end' },
      cell: ({ row }) => (
        <div className="options center">
          <Link to={Routes.PostsEdit.replace(':id', String(row.original.id))}>
            <EditIcon styleClass="icon" />
          </Link>

          <div>
            <DeleteIcon styleClass="icon" onDelete={() => onDelete(row.original.id)} />
          </div>
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
        header={{ title: t('table.button-posts'), link: Routes.PostsCreate }}
      />
    </div>
  );
};
