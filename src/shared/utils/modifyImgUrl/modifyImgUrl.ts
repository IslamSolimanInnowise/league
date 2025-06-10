export const modifyImgUrl = (url: string, width: string = '600', height: string = '400') => {
  const arr = url.split('/');
  arr.splice(-2, 2, width, height);
  return arr.join('/');
};
