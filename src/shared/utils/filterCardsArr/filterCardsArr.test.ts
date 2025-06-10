import { filterCardsArr } from '../filterCardsArr/filterCardsArr';
import type { ICard } from '@/types';

describe('filterCardsArr', () => {
  const mockCards: ICard[] = [
    {
      id: '1',
      author: 'John Doe',
      download_url: 'image1.jpg',
    },
    {
      id: '2',
      author: 'Jane Smith',
      download_url: 'image2.jpg',
    },
    {
      id: '3',
      author: 'John Smith',
      download_url: 'image3.jpg',
    },
  ];

  it('should filter cards by author name case-insensitively', () => {
    const result = filterCardsArr(mockCards, 'john');

    expect(result).toHaveLength(2);
    expect(result[0]?.id).toBe('1');
    expect(result[1]?.id).toBe('3');
  });

  it('should return empty array when no matches found', () => {
    const result = filterCardsArr(mockCards, 'XYZ');

    expect(result).toHaveLength(0);
  });

  it('should return all cards when search string is empty', () => {
    const result = filterCardsArr(mockCards, '');

    expect(result).toHaveLength(mockCards.length);
    expect(result[0]?.id).toBe('1');
    expect(result[1]?.id).toBe('2');
    expect(result[2]?.id).toBe('3');
  });

  it('should modify the author name according to search term', () => {
    const result = filterCardsArr(mockCards, 'john');

    expect(result[0]?.author).not.toBe('John Doe');
    expect(result[1]?.author).not.toBe('John Smith');
  });

  it('should preserve other card properties while filtering', () => {
    const result = filterCardsArr(mockCards, 'jane');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      ...mockCards[1],
      author: expect.any(String),
    });
  });
});
