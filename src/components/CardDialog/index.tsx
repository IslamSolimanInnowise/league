import * as Styled from "./card-dialog.styles";

interface ICardDialogProps {
  ref: React.Ref<HTMLDialogElement | null>;
  imageUrl: string | null;
  author: string | null;
  onClick: () => void;
  onBlur: () => void;
}

const CardDialog: React.FC<ICardDialogProps> = ({
  ref,
  imageUrl,
  author,
  onClick,
  onBlur,
}) => {
  return (
    <Styled.StyledModal ref={ref} onBlur={onBlur}>
      <Styled.closeButton onClick={onClick}>Close</Styled.closeButton>
      {imageUrl && author && (
        <Styled.ModalImage src={imageUrl} alt={`an image by ${author}`} />
      )}
    </Styled.StyledModal>
  );
};
export default CardDialog;
