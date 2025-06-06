import type { CardInterface } from "../types";
import { modifyTitle } from "./modifyTitle";

export const filterArr = (arr: CardInterface[], titleValue: string) => {
  const filtered = arr
    .filter((card) => {
      return card.title.toLowerCase().includes(titleValue.toLowerCase());
    })
    .map((card) => {
      const newTitle = modifyTitle(card.title, titleValue);
      return { ...card, title: newTitle };
    });

  return filtered;
};
