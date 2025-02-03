export const ArrowIcon = ({ styleClass }: { styleClass: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styleClass}
      width="1em"
      height="1em"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M240-240v-480h80v480h-80Zm440 0L440-480l240-240 56 56-184 184 184 184-56 56Z" />
    </svg>
  );
};

export const PostIcon = ({ styleClass }: { styleClass: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styleClass}
      width="1em"
      height="1em"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M320-440h320v-80H320v80Zm0 120h320v-80H320v80Zm0 120h200v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
    </svg>
  );
};

export const UserIcon = ({ styleClass }: { styleClass: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styleClass}
      width="1em"
      height="1em"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
    </svg>
  );
};

export const CommentIcon = ({ styleClass }: { styleClass: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styleClass}
      width="1em"
      height="1em"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" />
    </svg>
  );
};

export const AlbumIcon = ({ styleClass }: { styleClass: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styleClass}
      width="1em"
      height="1em"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M320-320h480v-480h-80v280l-100-60-100 60v-280H320v480Zm0 80q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm360-720h200-200Zm-200 0h480-480Z" />
    </svg>
  );
};

export const EditIcon = ({ styleClass }: { styleClass: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styleClass}
      width="1em"
      height="1em"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
    </svg>
  );
};

export const DeleteIcon = ({ styleClass }: { styleClass: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styleClass}
      width="1em"
      height="1em"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
  );
};

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
