import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styled-components/themes";
import GalleryView from "./index";
import type { ICard } from "../../types";
import { useCachedFetch } from "../../hooks/useCachedFetch/useCachedFetch";
import { GlobalContext } from "../../contexts/global-context";

jest.mock("../../shared/ui/Modal", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("../../hooks/useCachedFetch/useCachedFetch");
jest.mock("../../hooks/useDebounce/useDebounce", () => ({
  __esModule: true,
  default: (val: string) => val,
}));

const mockedUseCachedFetch = useCachedFetch as jest.Mock;

const mockData: ICard[] = [
  {
    id: "1",
    author: "Author 1",
    download_url: "test-url-1.jpg",
  },
  {
    id: "2",
    author: "Author 2",
    download_url: "test-url-2.jpg",
  },
];

describe("GalleryView Component", () => {
  const mockSetInputVal = jest.fn();

  const setup = (initialInputVal = "") => {
    return render(
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider
          value={{ inputVal: initialInputVal, setInputVal: mockSetInputVal }}
        >
          <GalleryView />
        </GlobalContext.Provider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    mockedUseCachedFetch.mockReturnValue({
      data: undefined,
      loading: true,
      error: "",
    });

    setup();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    mockedUseCachedFetch.mockReturnValue({
      data: undefined,
      loading: false,
      error: "Test error",
    });

    setup();
    expect(screen.getByText(/error: test error/i)).toBeInTheDocument();
  });

  test("renders data correctly", () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    setup();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("Author 2")).toBeInTheDocument();
  });

  test("filters cards based on input value from context", () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    setup("Author 1");

    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.queryByText("Author 2")).not.toBeInTheDocument();
  });

  test("shows no matches message when filter returns no results", () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    setup("NonexistentAuthor");
    expect(
      screen.getByText(/seems like nothing matches your search/i)
    ).toBeInTheDocument();
  });

  test("uses correct URL for API call", () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    setup();
    expect(mockedUseCachedFetch).toHaveBeenCalledWith(
      "https://picsum.photos/v2/list"
    );
  });

  test("shows all cards when input is empty", () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    setup("");

    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("Author 2")).toBeInTheDocument();
  });

  test("uses input value from context", () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    const testInput = "Test Input";
    setup(testInput);

    expect(mockedUseCachedFetch).toHaveBeenCalledWith(
      "https://picsum.photos/v2/list"
    );
  });
});
