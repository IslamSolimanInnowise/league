import type { ICard } from "../types";
import { modifyAuthor } from "./modifyAuthor";

export const filterCardsArr = (arr: ICard[], authorValue: string) => {
  const filtered = arr.reduce((acc, card) => {
    if (card.author.toLowerCase().includes(authorValue.toLowerCase())) {
      const newAuthor = modifyAuthor(card.author, authorValue);
      acc.push({ ...card, author: newAuthor });
    }

    return acc;
  }, [] as ICard[]);

  return filtered;
};
