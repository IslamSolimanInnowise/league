import { FC } from "react";
import { createPortal } from "react-dom";

interface IModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  ref: React.Ref<HTMLDialogElement | null>;
}

const Modal: FC<IModalProps> = ({ ref, children, ...props }) => {
  return createPortal(
    <dialog {...props} ref={ref} role="dialog">
      {children}
    </dialog>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
