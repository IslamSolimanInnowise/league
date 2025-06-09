import { useRef, useState } from "react";
import type { CardInterface } from "../../types";
import Card from "../Card";
import CardDialog from "../CardDialog";
import * as Styled from "./cards-container.styles";

interface CardContainerProps {
  cards: CardInterface[];
}

const CardsContainer: React.FC<CardContainerProps> = ({ cards }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalAuthor, setModalAuthor] = useState("");

  const handleCardClick = (modalImageUrl: string, author: string) => {
    setModalImageUrl(() => modalImageUrl);
    setModalAuthor(() => author);
    modalRef.current?.showModal();
  };

  const onClose = () => {
    modalRef.current?.close();
  };

  return (
    <Styled.Container>
      {cards?.map((card) => {
        return (
          <li key={card.id} tabIndex={0}>
            <Card card={card} handleClick={handleCardClick} />
          </li>
        );
      })}

      {modalAuthor && modalImageUrl && (
        <CardDialog
          ref={modalRef}
          imageUrl={modalImageUrl}
          author={modalAuthor}
          onClick={onClose}
          onBlur={onClose}
        />
      )}
    </Styled.Container>
  );
};
export default CardsContainer;
