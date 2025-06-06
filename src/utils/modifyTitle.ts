import DOMPurify from "dompurify";

export const modifyTitle = (title: string, searchValue: string) => {
  return title
    .split(" ")
    .map((word) => {
      if (word.toLowerCase().includes(searchValue.toLowerCase())) {
        const sanitized = DOMPurify.sanitize(
          `<strong><em>${word}</em></strong>`,
          {
            ALLOWED_TAGS: ["em", "strong"],
          }
        );

        return sanitized;
      } else {
        return word;
      }
    })
    .join(" ");
};
