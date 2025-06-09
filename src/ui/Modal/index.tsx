import { createPortal } from "react-dom";

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  ref: React.Ref<HTMLDialogElement | null>;
}

const Modal: React.FC<ModalProps> = ({ ref, children, ...props }) => {
  return createPortal(
    <dialog {...props} ref={ref} role="dialog">
      {children}
    </dialog>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
