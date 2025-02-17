import { useEffect, useState } from 'react';

import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import { ModalTypeEnum } from '@src/app-constants';
import { DeleteIcon, EditIcon } from '@src/assets/icons';
import { Loading, Table } from '@src/components';
import { DeleteModal } from '@src/components/DeleteModal';
import { useAppContext } from '@src/hooks/useAppContext';
import { PostsTable as Posts } from '@src/types';
import ScrollToTop from '@src/utils/ScrollToTop';
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
import { PostDelete } from './PostDelete';

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

  const [selectedCell, setSelectedCell] = useState<number | undefined>(undefined);
  const [modalType, setModalType] = useState<ModalTypeEnum | undefined>(undefined);

  const columnHelper = createColumnHelper<Posts>();

  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalType]);

  const onOpenModal = (type: ModalTypeEnum, id?: number) => {
    setSelectedCell(id as number);
    setModalType(type);
  };

  const onCloseModal = () => {
    setModalType(undefined);
    setSelectedCell(undefined);
  };

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

  const modalConfig = {
    [ModalTypeEnum.Create]: <PostsCreate onClose={onCloseModal} />,
    [ModalTypeEnum.Edit]: selectedCell !== undefined && <PostEdit id={selectedCell} onClose={onCloseModal} />,
    [ModalTypeEnum.Delete]: selectedCell !== undefined && (
      <DeleteModal onClose={onCloseModal} onDelete={() => onDelete(selectedCell)}>
        <PostDelete id={selectedCell} />
      </DeleteModal>
    )
  };

  const columns = [
    ...(userRole !== Roles.User
      ? [
          columnHelper.accessor('id', {
            meta: { className: 'center start post-col' }
          }),
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
          <EditIcon className="icon" onClick={() => onOpenModal(ModalTypeEnum.Edit, row.original.id)} />
          <DeleteIcon className="icon" onClick={() => onOpenModal(ModalTypeEnum.Delete, row.original.id)} />
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
      <ScrollToTop pagination={pagination} />
      <Table
        table={table}
        state={{ globalFilter, setGlobalFilter }}
        header={{ title: t('table.button-posts'), onClick: () => onOpenModal(ModalTypeEnum.Create) }}
      />

      <Modal
        isOpen={!!modalType}
        onRequestClose={onCloseModal}
        shouldCloseOnOverlayClick={true}
        className={modalType === ModalTypeEnum.Delete ? 'modal-content--delete' : 'modal-content'}
        overlayClassName="modal-overlay"
      >
        {modalType && modalConfig[modalType]}
      </Modal>
    </div>
  );
};
