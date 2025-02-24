import { ModalTypeEnum } from '@src/app-constants';
import { DeleteIcon, EditIcon } from '@src/assets/icons';

type Props = {
  id: number;
  onOpenModal: (type: ModalTypeEnum, id: number) => void;
};

export const TableOptions = ({ id, onOpenModal }: Props) => {
  return (
    <div className="options center">
      <EditIcon className="icon" onClick={() => onOpenModal(ModalTypeEnum.Edit, id)} />
      <DeleteIcon className="icon" onClick={() => onOpenModal(ModalTypeEnum.Delete, id)} />
    </div>
  );
};
