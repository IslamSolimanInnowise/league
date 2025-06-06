import type { CardInterface } from "../../types";
import * as Styled from "./card.styles";

function openModal(link: string) {
  console.log(link);
}

const Card: React.FC<CardInterface> = ({ thumbnailUrl, title, url }) => {
  const handleClick = (link: string) => {
    openModal(link);
  };

  return (
    <Styled.Figure>
      <img src={thumbnailUrl} alt={title} />
      <figcaption>{title}</figcaption>
      <button onClick={() => handleClick(url)}>See image in full size</button>
    </Styled.Figure>
  );
};

export default Card;
