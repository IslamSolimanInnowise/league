import { filterArr } from "./filterArr";
import type { CardInterface } from "../types";

describe("filterArr", () => {
  const mockCards: CardInterface[] = [
    {
      id: "1",
      author: "John Doe",
      download_url: "image1.jpg",
    },
    {
      id: "2",
      author: "Jane Smith",
      download_url: "image2.jpg",
    },
    {
      id: "3",
      author: "John Smith",
      download_url: "image3.jpg",
    },
  ];

  it("should filter cards by author name case-insensitively", () => {
    const result = filterArr(mockCards, "john");

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("3");
  });

  it("should return empty array when no matches found", () => {
    const result = filterArr(mockCards, "XYZ");

    expect(result).toHaveLength(0);
  });

  it("should return all cards when search string is empty", () => {
    const result = filterArr(mockCards, "");

    expect(result).toHaveLength(mockCards.length);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
    expect(result[2].id).toBe("3");
  });

  it("should modify the author name according to search term", () => {
    const result = filterArr(mockCards, "john");

    expect(result[0].author).not.toBe("John Doe");
    expect(result[1].author).not.toBe("John Smith");
  });

  it("should preserve other card properties while filtering", () => {
    const result = filterArr(mockCards, "jane");

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      ...mockCards[1],
      author: expect.any(String),
    });
  });
});
