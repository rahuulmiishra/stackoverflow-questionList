import React from "react";

import "./_dialog.scss";

interface IDialog {
  children: React.ReactNode;
  handleClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isOpen: boolean;
}
const Dialog: React.FC<IDialog> = (props: IDialog) => {
  const { children, handleClose, isOpen = false } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="dialog">
      <div className="dialog__shadow" onClick={handleClose} />
      <div className="dialog__body">{children}</div>
    </div>
  );
};

export default Dialog;
