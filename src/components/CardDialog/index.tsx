import Modal from "../../ui/Modal";
interface CardDialogProps {
  ref: React.Ref<HTMLDialogElement | null>;
  imageUrl: string;
  author: string;
}

const CardDialog: React.FC<CardDialogProps> = ({ ref, imageUrl, author }) => {
  return (
    <Modal ref={ref}>
      <img src={imageUrl} alt={`an image by ${author}`} />
    </Modal>
  );
};
export default CardDialog;
