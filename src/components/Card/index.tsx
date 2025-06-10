import { ICard } from '@/types';
import * as Styled from './card.styles';
import DOMPurify from 'dompurify';
import { FC } from 'react';
import { modifyImgUrl } from '@/shared/utils/modifyImgUrl/modifyImgUrl';

interface ICardProps {
  handleClick: (modalImageUrl: string, author: string) => void;
  card: ICard;
}

const Card: FC<ICardProps> = ({ card: { download_url, author }, handleClick }) => {
  const thumbnail = modifyImgUrl(download_url);

  const plainAuthor = DOMPurify.sanitize(author, {
    ALLOWED_TAGS: [],
  });

  return (
    <>
      <Styled.Figure>
        <Styled.Thumbnail src={thumbnail} alt={`an image by ${plainAuthor}`} />
        <figcaption dangerouslySetInnerHTML={{ __html: author }} />
        <Styled.Button onClick={() => handleClick(download_url, plainAuthor)}>See image in full size</Styled.Button>
      </Styled.Figure>
    </>
  );
};

export default Card;
