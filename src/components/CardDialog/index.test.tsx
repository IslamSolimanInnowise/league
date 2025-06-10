import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styled-components/themes";
import CardDialog from "./index";

let portalRoot: HTMLElement;
const mockRef = { current: document.createElement("dialog") };
const mockOnClick = jest.fn();
const mockOnBlur = jest.fn();

describe("CardDialog Component", () => {
  beforeAll(() => {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(portalRoot);
  });

  afterAll(() => {
    portalRoot.remove();
  });

  const setup = () => {
    return render(
      <ThemeProvider theme={theme}>
        <CardDialog
          ref={mockRef}
          imageUrl="test-image.jpg"
          author="Test Author"
          onClick={mockOnClick}
          onBlur={mockOnBlur}
        />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockOnClick.mockClear();
    mockOnBlur.mockClear();
  });
  test("renders the close button", () => {
    setup();
    const closeButton = document.querySelector("#modal-root button");
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveTextContent(/close/i);
  });
  test("renders the image with correct attributes", () => {
    setup();
    const image = document.querySelector("#modal-root img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
    expect(image).toHaveAttribute("alt", "an image by Test Author");
  });
  test("calls onClick when close button is clicked", () => {
    setup();
    const closeButton = document.querySelector("#modal-root button");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  test("calls onBlur when dialog loses focus", () => {
    setup();
    const dialog = document.querySelector("#modal-root dialog");
    expect(dialog).toBeInTheDocument();
    fireEvent.blur(dialog!);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });
});
