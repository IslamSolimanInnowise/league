import { FC, useRef, useState } from 'react';
import type { ICard } from '@/types';
import Card from '@components/Card';
import CardDialog from '@components/CardDialog';
import * as Styled from './cards-container.styles';

interface ICardContainerProps {
  cards: ICard[];
}

const CardsContainer: FC<ICardContainerProps> = ({ cards }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [modalAuthor, setModalAuthor] = useState<string | null>(null);

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

      <CardDialog ref={modalRef} imageUrl={modalImageUrl} author={modalAuthor} onClick={onClose} onBlur={onClose} />
    </Styled.Container>
  );
};
export default CardsContainer;
