import type { CardInterface } from "../../types";

function openModal(link: string) {
  console.log(link);
}

const Card: React.FC<CardInterface> = ({ thumbnailUrl, title, url }) => {
  const handleClick = (link: string) => {
    openModal(link);
  };

  return (
    <figure>
      <img src={thumbnailUrl} alt={title} />
      <figcaption>{title}</figcaption>
      <button onClick={() => handleClick(url)}>See image in full size</button>
    </figure>
  );
};

export default Card;
