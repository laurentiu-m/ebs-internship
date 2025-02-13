import { useEffect, useState } from 'react';

import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import { Modal as ModalEnum } from '@src/app-constants';
import { DeleteIcon, EditIcon } from '@src/assets/icons';
import { Loading, Table } from '@src/components';
import { DeleteModal } from '@src/components/DeleteModal';
import { useAppContext } from '@src/hooks/useAppContext';
import { Posts } from '@src/types';
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [modalType, setModalType] = useState<ModalEnum | null>(null);

  const columnHelper = createColumnHelper<Posts>();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  const onOpenModal = (type: ModalEnum, id?: number) => {
    setSelectedCell(id as number);
    setModalType(type);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedCell(null);
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
    [ModalEnum.Create]: <PostsCreate onClose={() => onCloseModal()} />,
    [ModalEnum.Edit]: selectedCell !== null && <PostEdit id={selectedCell} onClose={() => onCloseModal()} />,
    [ModalEnum.Delete]: selectedCell !== null && (
      <DeleteModal onClose={() => onCloseModal()} onDelete={() => onDelete(selectedCell)}>
        <PostDelete id={selectedCell} />
      </DeleteModal>
    )
  };

  const columns = [
    columnHelper.accessor('id', {
      enableGlobalFilter: false,
      meta: { className: 'center start post-col' }
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
          <div onClick={() => onOpenModal(ModalEnum.Edit, row.original.id)}>
            <EditIcon className="icon" />
          </div>
          <div onClick={() => onOpenModal(ModalEnum.Delete, row.original.id)}>
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
      <ScrollToTop pagination={pagination} />
      <Table
        table={table}
        state={{ globalFilter, setGlobalFilter }}
        header={{ title: t('table.button-posts'), onClick: () => onOpenModal(ModalEnum.Create) }}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={onCloseModal}
        shouldCloseOnOverlayClick={true}
        className={modalType === ModalEnum.Delete ? 'modal-content--delete' : 'modal-content'}
        overlayClassName="modal-overlay"
      >
        {modalType && modalConfig[modalType]}
      </Modal>
    </div>
  );
};
