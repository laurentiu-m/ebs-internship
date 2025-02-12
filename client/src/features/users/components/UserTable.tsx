import { useEffect, useState } from 'react';

import { apiClient } from '@src/api';
import { DeleteIcon, EditIcon } from '@src/assets/icons';
import { Loading, Table } from '@src/components';
import { DeleteModal } from '@src/components/DeleteModal';
import { useAppContext } from '@src/hooks/useAppContext';
import { UserTable as UserTableTypes } from '@src/types';
import ScrollToTop from '@src/utils/ScrollToTop';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  useReactTable,
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowData
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { UsersCreate, UsersEdit } from '../pages';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    filterVariant?: string;
    placeholder?: string;
    _unusedData?: TData;
    _unusedValue?: TValue;
  }
}

Modal.setAppElement('#root');

export const UserTable = () => {
  const { t } = useTranslation();
  const { isModalOpen, onOpenModal, onCloseModal, selectedCell, modalMode } = useAppContext();
  const queryClient = useQueryClient();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);

  const columnHelper = createColumnHelper<UserTableTypes>();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  const exactTextFilter = <TData,>(row: Row<TData>, columnId: string, filterValue: undefined) => {
    return row.getValue(columnId) === filterValue;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['user_table', pagination, globalFilter],
    queryFn: async () => {
      if (globalFilter) {
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
      }

      return await apiClient.users.getList({
        page: pagination.pageIndex + 1,
        rows: pagination.pageSize,
        search: globalFilter || undefined
      });
    },
    placeholderData: (previousData) => previousData
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: async (userId: number) => {
      await apiClient.users.delete(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_table'] });
      onCloseModal();
      toast.success(t('notification.user_delete'));
    }
  });

  const onDelete = (userId: number) => {
    deleteUser(userId);
  };

  const columns = [
    columnHelper.accessor('id', {
      meta: { className: 'center start' }
    }),
    columnHelper.accessor('name', { header: t('form.label.name') }),
    columnHelper.accessor('username', { header: t('form.label.username') }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('phone', {
      header: t('form.label.phone'),
      enableSorting: false,
      meta: { className: 'center' }
    }),
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
      meta: { className: 'options-wrapper center end' },
      cell: ({ row }) => (
        <div className="options center">
          <div onClick={() => onOpenModal('edit', row.original.id)}>
            <EditIcon className="icon" />
          </div>
          <div onClick={() => onOpenModal('delete_user', row.original.id)}>
            <DeleteIcon className="icon" />
          </div>
        </div>
      )
    })
  ];

  const table = useReactTable({
    data: data?.result || [],
    columns,
    state: { columnFilters, pagination },
    autoResetPageIndex: false,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination
  });

  if (isLoading) return <Loading />;

  return (
    <div className="users__table">
      <ScrollToTop pagination={pagination} />

      <Table
        table={table}
        state={{ globalFilter, setGlobalFilter }}
        header={{ title: t('table.button-users'), onClick: () => onOpenModal('create') }}
        page={{
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          currentTotalPages: data?.result.length || 0,
          totalPages: data?.totalPages || 0,
          onPageChange: (pageIndex: number) => setPagination((prev) => ({ ...prev, pageIndex })),
          onRowsChange: (pageSize: number) => setPagination(() => ({ pageIndex: 0, pageSize }))
        }}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={onCloseModal}
        shouldCloseOnOverlayClick={true}
        className={modalMode === 'delete_user' ? 'modal-content--delete' : 'modal-content'}
        overlayClassName="modal-overlay"
      >
        {modalMode === 'create' && <UsersCreate />}
        {modalMode === 'edit' && selectedCell !== null && <UsersEdit id={selectedCell} />}
        {modalMode === 'delete_user' && selectedCell !== null && (
          <DeleteModal id={selectedCell} modalMode={modalMode} onDelete={() => onDelete(selectedCell)} />
        )}
      </Modal>
    </div>
  );
};
