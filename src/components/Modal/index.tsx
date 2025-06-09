import { createPortal } from "react-dom";

const Modal: React.FC<React.HTMLAttributes<HTMLDialogElement>> = ({
  children,
  ...props
}) => {
  return createPortal(
    <dialog {...props}>{children}</dialog>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
