import type { CardInterface } from "../../types";
import * as Styled from "./card.styles";
import DOMPurify from "dompurify";

function openModal(link: string) {
  console.log(link);
}

const Card: React.FC<CardInterface> = ({ thumbnailUrl, title, url }) => {
  const handleClick = (link: string) => {
    openModal(link);
  };

  const plainTitle = DOMPurify.sanitize(title, {
    ALLOWED_TAGS: [],
  });

  return (
    <Styled.Figure>
      <img src={thumbnailUrl} alt={plainTitle} />
      <figcaption dangerouslySetInnerHTML={{ __html: title }} />
      <button onClick={() => handleClick(url)}>See image in full size</button>
    </Styled.Figure>
  );
};

export default Card;
