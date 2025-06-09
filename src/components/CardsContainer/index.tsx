import type { CardInterface } from "../../types";
import Card from "../Card";
import * as Styled from "./cards-container.styles";

interface CardContainerProps {
  cards: CardInterface[];
}

const CardsContainer: React.FC<CardContainerProps> = ({ cards }) => {
  return (
    <Styled.Container>
      {cards?.map((card, i) => {
        return (
          <li key={card.id} tabIndex={i}>
            <Card {...card} />
          </li>
        );
      })}
    </Styled.Container>
  );
};
export default CardsContainer;
