import { modifyImgUrl } from './modifyImgUrl';

describe('modifyImgUrl', () => {
  it('modifies URL with default dimensions (600x400)', () => {
    const originalUrl = 'https://picsum.photos/id/1/800/600';
    const expectedUrl = 'https://picsum.photos/id/1/600/400';

    expect(modifyImgUrl(originalUrl)).toBe(expectedUrl);
  });

  it('modifies URL with custom dimensions', () => {
    const originalUrl = 'https://picsum.photos/id/1/800/600';
    const expectedUrl = 'https://picsum.photos/id/1/300/200';

    expect(modifyImgUrl(originalUrl, '300', '200')).toBe(expectedUrl);
  });

  it('handles URLs with different initial dimensions', () => {
    const originalUrl = 'https://picsum.photos/id/1/1200/900';
    const expectedUrl = 'https://picsum.photos/id/1/600/400';

    expect(modifyImgUrl(originalUrl)).toBe(expectedUrl);
  });

  it('preserves URL structure up to dimensions', () => {
    const originalUrl = 'https://picsum.photos/id/999/800/600';
    const expectedUrl = 'https://picsum.photos/id/999/600/400';

    expect(modifyImgUrl(originalUrl)).toBe(expectedUrl);
  });

  it('works with different width/height ratios', () => {
    const originalUrl = 'https://picsum.photos/id/1/400/800';
    const expectedUrl = 'https://picsum.photos/id/1/200/400';

    expect(modifyImgUrl(originalUrl, '200', '400')).toBe(expectedUrl);
  });
});
