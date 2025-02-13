import { PropsWithChildren } from 'react';

import { useTranslation } from 'react-i18next';

type Props = PropsWithChildren & {
  onClose: () => void;
  onDelete: () => void;
};

export const DeleteModal = ({ onClose, onDelete, children }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="delete">
      <div className="delete__info">{children}</div>

      <div className="delete__buttons">
        <button className="cancel" onClick={onClose}>
          {t('error.modal.cancel')}
        </button>
        <button className="delete" onClick={onDelete}>
          {t('error.modal.delete')}
        </button>
      </div>
    </div>
  );
};
