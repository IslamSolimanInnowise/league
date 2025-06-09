import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styled-components/themes";
import Header from "./index";

jest.mock("../../assets/images/logo.jpg", () => "mocked-image-path");

const mockOnChange = jest.fn();

describe("Header Component", () => {
  const setup = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Header onChange={mockOnChange} inputVal="" />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders logo image", () => {
    setup();
    const logoImage = screen.getByRole("img", {
      name: /logo image of a photo album/i,
    });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "mocked-image-path");
  });

  test("renders search input", () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search for photos/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "text");
  });

  test("calls onChange when input value changes", () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search for photos/i);
    fireEvent.change(searchInput, { target: { value: "test search" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("input value updates correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <Header onChange={mockOnChange} inputVal="test value" />
      </ThemeProvider>
    );
    const searchInput = screen.getByPlaceholderText(
      /search for photos/i
    ) as HTMLInputElement;
    expect(searchInput.value).toBe("test value");
  });

  test("input is empty by default", () => {
    setup();
    const searchInput = screen.getByPlaceholderText(
      /search for photos/i
    ) as HTMLInputElement;
    expect(searchInput.value).toBe("");
  });

  test("search input has correct placeholder", () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search for photos/i);
    expect(searchInput).toHaveAttribute("placeholder", "Search for photos");
  });

  test("header has correct styling", () => {
    setup();
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveStyle("display: flex");
  });

  test("logo image has correct alt text", () => {
    setup();
    const logoImage = screen.getByRole("img");
    expect(logoImage).toHaveAttribute("alt", "logo image of a photo album");
  });
});
