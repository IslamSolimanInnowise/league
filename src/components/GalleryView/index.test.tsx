import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styled-components/themes";
import GalleryView from "./index";
import type { ICard } from "../../types";
import { useCachedFetch } from "../../hooks/useCachedFetch/useCachedFetch";

// Mock the custom hook
jest.mock("../../hooks/useCachedFetch");
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
  const setup = (inputVal = "") => {
    return render(
      <ThemeProvider theme={theme}>
        <GalleryView inputVal={inputVal} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    // Clear all mocks between tests
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

  test("filters cards based on input value", async () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    setup("Author 1");

    // Wait for debounce to complete
    await waitFor(() => {
      expect(screen.getByText("Author 1")).toBeInTheDocument();
      expect(screen.queryByText("Author 2")).not.toBeInTheDocument();
    });
  });

  test("shows no matches message when filter returns no results", async () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    setup("NonexistentAuthor");

    // Wait for debounce to complete
    await waitFor(() => {
      expect(
        screen.getByText(/seems like nothing matches your search/i)
      ).toBeInTheDocument();
    });
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

  test("shows all cards when input is empty", async () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    setup("");

    // Wait for debounce to complete
    await waitFor(() => {
      expect(screen.getByText("Author 1")).toBeInTheDocument();
      expect(screen.getByText("Author 2")).toBeInTheDocument();
    });
  });

  test("debounces input value changes", async () => {
    mockedUseCachedFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: "",
    });

    setup("Author 1");

    // Immediately after render, before debounce
    expect(
      screen.queryByText(/seems like nothing matches your search/i)
    ).not.toBeInTheDocument();

    // After debounce
    await waitFor(() => {
      expect(screen.getByText("Author 1")).toBeInTheDocument();
    });
  });
});
