import { useEffect, useState } from 'react';

import { apiClient } from '@src/api';
import { ModalTypeEnum } from '@src/app-constants';
import { DeleteIcon, EditIcon } from '@src/assets/icons';
import { Loading, Table } from '@src/components';
import { DeleteModal } from '@src/components/DeleteModal';
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
import { UserDelete } from './UserDelete';

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
  const queryClient = useQueryClient();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);

  const [selectedCell, setSelectedCell] = useState<number | undefined>(undefined);
  const [modalType, setModalType] = useState<ModalTypeEnum | undefined>(undefined);

  const columnHelper = createColumnHelper<UserTableTypes>();

  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalType]);

  const exactTextFilter = <TData,>(row: Row<TData>, columnId: string, filterValue: undefined) => {
    return row.getValue(columnId) === filterValue;
  };

  const onOpenModal = (type: ModalTypeEnum, id?: number) => {
    setSelectedCell(id as number);
    setModalType(type);
  };

  const onCloseModal = () => {
    setModalType(undefined);
    setSelectedCell(undefined);
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
      toast.success(t('notification.user_delete'));
    }
  });

  const onDelete = (userId: number) => {
    deleteUser(userId);
  };

  const modalConfig = {
    [ModalTypeEnum.Create]: <UsersCreate onClose={onCloseModal} />,
    [ModalTypeEnum.Edit]: selectedCell !== undefined && <UsersEdit id={selectedCell} onClose={onCloseModal} />,
    [ModalTypeEnum.Delete]: selectedCell !== undefined && (
      <DeleteModal onClose={onCloseModal} onDelete={() => onDelete(selectedCell)}>
        <UserDelete id={selectedCell} />
      </DeleteModal>
    )
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
    <div className="users__table">
      <ScrollToTop pagination={pagination} />
      <Table
        table={table}
        state={{ globalFilter, setGlobalFilter }}
        header={{ title: t('table.button-users'), onClick: () => onOpenModal(ModalTypeEnum.Create) }}
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
