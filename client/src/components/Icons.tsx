export const CloseIcon = ({ styleClass, onClose }: { styleClass: string; onClose: () => void }) => {
  return (
    <svg
      onClick={onClose}
      xmlns="http://www.w3.org/2000/svg"
      className={styleClass}
      width="1em"
      height="1em"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
};
