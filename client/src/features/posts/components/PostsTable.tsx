import { useEffect, useState } from 'react';

import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import DeleteIcon from '@src/assets/icons/delete_icon.svg?react';
import EditIcon from '@src/assets/icons/edit_icon.svg?react';
import { Loading, Table } from '@src/components';
import { DeleteModal } from '@src/components/DeleteModal';
import { useAppContext } from '@src/hooks/useAppContext';
import { PostsTable as Posts } from '@src/types';
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
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { PostEdit, PostsCreate } from '../pages';

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
  const { isModalOpen, onOpenModal, onCloseModal, selectedCell, modalMode, tokenData } = useAppContext();
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  const { data, isLoading } = useQuery({
    queryKey: ['posts_table', userRole, userId],
    queryFn: async () => {
      if (userRole === Roles.User) {
        const { results } = await apiClient.posts.getList({ userId });
        return results;
      } else {
        const { results } = await apiClient.posts.getList();
        return results;
      }
    },
    enabled: !!userRole && !!userId
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: async (postId: number) => {
      await apiClient.posts.delete(postId);
      return postId;
    },
    onSuccess: (postId: number) => {
      queryClient.setQueryData(['posts_table', userRole, userId], (oldData: Posts[]) =>
        oldData.filter((post) => post.id !== postId)
      );
      onCloseModal();
      toast.success(t('notification.post_delete'));
    }
  });

  const onDelete = (postId: number) => {
    deletePost(postId);
  };

  const columns = [
    ...(userRole !== Roles.User
      ? [
          columnHelper.accessor('id', {
            enableGlobalFilter: false,
            meta: { className: 'center start post-col' }
          })
        ]
      : []),
    ...(userRole !== Roles.User
      ? [
          columnHelper.accessor('username', {
            header: t('form.label.username'),
            meta: { className: 'username' }
          })
        ]
      : []),
    columnHelper.accessor('title', { header: t('form.label.title') }),
    columnHelper.accessor('body', { header: t('form.label.body') }),
    columnHelper.display({
      id: 'actions',
      header: t('table.options'),
      meta: { className: 'options-wrapper center end' },
      cell: ({ row }) => (
        <div className="options center">
          <div onClick={() => onOpenModal('edit', row.original.id)}>
            <EditIcon className="icon" />
          </div>
          <div onClick={() => onOpenModal('delete_post', row.original.id)}>
            <DeleteIcon className="icon" />
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
        header={{ title: t('table.button-posts'), onClick: () => onOpenModal('create') }}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={onCloseModal}
        shouldCloseOnOverlayClick={true}
        className={modalMode === 'delete_post' ? 'modal-content--delete' : 'modal-content'}
        overlayClassName="modal-overlay"
      >
        {modalMode === 'create' && <PostsCreate />}
        {modalMode === 'edit' && selectedCell !== null && <PostEdit id={selectedCell} />}
        {modalMode === 'delete_post' && selectedCell !== null && (
          <DeleteModal id={selectedCell} modalMode={modalMode} onDelete={() => onDelete(selectedCell)} />
        )}
      </Modal>
    </div>
  );
};
