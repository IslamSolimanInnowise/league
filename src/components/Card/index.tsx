import { ICard } from "@/types";
import * as Styled from "./card.styles";
import DOMPurify from "dompurify";

interface ICardProps {
  handleClick: (modalImageUrl: string, author: string) => void;
  card: ICard;
}

const Card: React.FC<ICardProps> = ({
  card: { download_url, author },
  handleClick,
}) => {
  const plainAuthor = DOMPurify.sanitize(author, {
    ALLOWED_TAGS: [],
  });

  return (
    <>
      <Styled.Figure>
        <Styled.Thumbnail
          src={download_url}
          alt={`an image by ${plainAuthor}`}
        />
        <figcaption dangerouslySetInnerHTML={{ __html: author }} />
        <Styled.Button onClick={() => handleClick(download_url, plainAuthor)}>
          See image in full size
        </Styled.Button>
      </Styled.Figure>
    </>
  );
};

export default Card;
