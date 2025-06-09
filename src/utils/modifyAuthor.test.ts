import { modifyAuthor } from "./modifyAuthor";
import DOMPurify from "dompurify";

jest.mock("dompurify", () => ({
  sanitize: jest.fn((input) => input),
}));

describe("modifyAuthor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should wrap matching word with strong and em tags", () => {
    const result = modifyAuthor("John Doe", "john");

    expect(result).toBe("<strong><em>John</em></strong> Doe");
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      "<strong><em>John</em></strong>",
      { ALLOWED_TAGS: ["em", "strong"] }
    );
  });

  it("should handle case-insensitive matches", () => {
    const result = modifyAuthor("John Doe", "JOHN");

    expect(result).toBe("<strong><em>John</em></strong> Doe");
  });

  it("should handle multiple word matches", () => {
    const result = modifyAuthor("John John Doe", "john");

    expect(result).toBe(
      "<strong><em>John</em></strong> <strong><em>John</em></strong> Doe"
    );
  });

  it("should return original text when no match found", () => {
    const result = modifyAuthor("John Doe", "xyz");

    expect(result).toBe("John Doe");
    expect(DOMPurify.sanitize).not.toHaveBeenCalled();
  });

  it("should handle partial word matches", () => {
    const result = modifyAuthor("Johnson Doe", "john");

    expect(result).toBe("<strong><em>Johnson</em></strong> Doe");
  });

  it("should sanitize HTML content", () => {
    modifyAuthor("John Doe", "john");

    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      "<strong><em>John</em></strong>",
      { ALLOWED_TAGS: ["em", "strong"] }
    );
  });
});
