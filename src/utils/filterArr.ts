import type { CardInterface } from "../types";
import { modifyAuthor } from "./modifyAuthor";

export const filterArr = (arr: CardInterface[], authorValue: string) => {
  const filtered = arr
    .filter((card) => {
      return card.author.toLowerCase().includes(authorValue.toLowerCase());
    })
    .map((card) => {
      const newAuthor = modifyAuthor(card.author, authorValue);
      return { ...card, author: newAuthor };
    });

  return filtered;
};
