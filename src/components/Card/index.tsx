import type { CardInterface } from "../../types";
import * as Styled from "./card.styles";
import DOMPurify from "dompurify";

function openModal(link: string) {
  console.log(link);
}

const Card: React.FC<CardInterface> = ({ download_url, author }) => {
  const handleClick = (link: string) => {
    openModal(link);
  };

  const plainTitle = DOMPurify.sanitize(author, {
    ALLOWED_TAGS: [],
  });

  return (
    <Styled.Figure>
      <Styled.Thumbnail src={download_url} alt={plainTitle} />
      <figcaption dangerouslySetInnerHTML={{ __html: author }} />
      <Styled.Button onClick={() => handleClick(download_url)}>
        See image in full size
      </Styled.Button>
    </Styled.Figure>
  );
};

export default Card;
