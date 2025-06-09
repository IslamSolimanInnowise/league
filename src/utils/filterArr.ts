import type { CardInterface } from "../types";
import { modifyAuthor } from "./modifyAuthor";

export const filterArr = (arr: CardInterface[], titleValue: string) => {
  const filtered = arr
    .filter((card) => {
      return card.author.toLowerCase().includes(titleValue.toLowerCase());
    })
    .map((card) => {
      const newTitle = modifyAuthor(card.author, titleValue);
      return { ...card, title: newTitle };
    });

  return filtered;
};
