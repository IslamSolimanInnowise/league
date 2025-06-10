import DOMPurify from 'dompurify';

export const modifyAuthor = (author: string, searchValue: string) => {
  return author
    .split(' ')
    .map((word) => {
      if (word.toLowerCase().includes(searchValue.toLowerCase())) {
        const sanitized = DOMPurify.sanitize(`<strong><em>${word}</em></strong>`, {
          ALLOWED_TAGS: ['em', 'strong'],
        });

        return sanitized;
      } else {
        return word;
      }
    })
    .join(' ');
};
