import { useTranslation } from 'react-i18next';

export const DeleteModal = ({
  onClose,
  onDelete,
  children
}: {
  onClose: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}) => {
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
