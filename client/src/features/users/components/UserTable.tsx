import { useEffect, useState } from 'react';

import { apiClient } from '@src/api';
import { DeleteIcon, Loading, Table } from '@src/components';
import { EditIcon } from '@src/components';
import { DeleteModal } from '@src/components/DeleteModal';
import { useAppContext } from '@src/hooks/useAppContext';
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
    window.scrollTo(0, 0);
  }, [pagination]);

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
      onCloseModal();
      toast.success('The user was deleted successfully!');
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
      meta: { className: 'center end' },
      cell: ({ row }) => (
        <div className="options center">
          <div onClick={() => onOpenModal('edit', row.original.id)}>
            <EditIcon styleClass="icon" />
          </div>
          <div onClick={() => onOpenModal('delete_user', row.original.id)}>
            <DeleteIcon styleClass="icon" />
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
    <div className="users__table">
      <Table
        table={table}
        state={{ globalFilter, setGlobalFilter }}
        header={{ title: t('table.button-users'), onClick: () => onOpenModal('create') }}
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
