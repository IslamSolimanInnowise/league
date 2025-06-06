// import { sanitize } from "dompurify";
import DOMPurify from "dompurify";
import type { CardInterface } from "../types";

const modifyTitle = (title: string, searchValue: string) => {
  return title
    .split(" ")
    .map((word) => {
      if (word.toLowerCase().includes(searchValue.toLowerCase())) {
        const sanitized = DOMPurify.sanitize(
          `<strong><em>${word}</em></strong>`,
          {
            ALLOWED_TAGS: ["em", "strong"],
            ALLOWED_ATTR: [],
          }
        );

        return sanitized;
      }

      return word;
    })
    .join(" ");
};

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
