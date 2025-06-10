import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styled-components/themes";
import Card from "./index";
import type { ICard } from "@/types";

const mockCard: ICard = {
  id: "1",
  author: "Test Author",
  download_url: "test-url.jpg",
};

const mockHandleClick = jest.fn();

describe("Card Component", () => {
  const setup = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Card card={mockCard} handleClick={mockHandleClick} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockHandleClick.mockClear();
  });

  test("renders the card with correct author", () => {
    setup();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  test("renders the thumbnail image correctly", () => {
    setup();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "test-url.jpg");
    expect(image).toHaveAttribute("alt", "an image by Test Author");
  });

  test("renders the 'See image in full size' button", () => {
    setup();
    const button = screen.getByText(/see image in full size/i);
    expect(button).toBeInTheDocument();
  });

  test("calls handleClick when button is clicked", () => {
    setup();
    const button = screen.getByText(/see image in full size/i);
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    expect(mockHandleClick).toHaveBeenCalledWith("test-url.jpg", "Test Author");
  });

  test("sanitizes HTML in author name for alt text", () => {
    const cardWithHtml: ICard = {
      ...mockCard,
      author: "<script>alert('xss')</script>Test Author",
    };
    render(
      <ThemeProvider theme={theme}>
        <Card card={cardWithHtml} handleClick={mockHandleClick} />
      </ThemeProvider>
    );
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "an image by Test Author");
  });
});
