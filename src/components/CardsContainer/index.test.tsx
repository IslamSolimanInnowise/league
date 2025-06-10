import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styled-components/themes";
import CardsContainer from "./index";
import type { ICard } from "@/types";

let portalRoot: HTMLElement;

const mockCards: ICard[] = [
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

describe("CardsContainer Component", () => {
  beforeAll(() => {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(portalRoot);
  });

  afterAll(() => {
    portalRoot.remove();
  });

  const setup = (cards = mockCards) => {
    return render(
      <ThemeProvider theme={theme}>
        <CardsContainer cards={cards} />
      </ThemeProvider>
    );
  };

  test("renders all cards", () => {
    setup();
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(2);
  });

  test("displays authors for all cards", () => {
    setup();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("Author 2")).toBeInTheDocument();
  });
  test("opens modal when a card is clicked", async () => {
    setup();

    HTMLDialogElement.prototype.showModal = jest.fn();

    const buttons = screen.getAllByText(/see image in full size/i);
    fireEvent.click(buttons[0]);
    await waitFor(() => {
      const dialog = document.querySelector("#modal-root dialog");
      expect(dialog).toBeInTheDocument();
      const modalImage = dialog?.querySelector(
        'img[alt="an image by Author 1"]'
      );
      expect(modalImage).toBeInTheDocument();
    });
  });

  test("closes modal when close button is clicked", async () => {
    setup();

    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();

    const buttons = screen.getAllByText(/see image in full size/i);
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(document.querySelector("#modal-root dialog")).toBeInTheDocument();
    });

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });
  });

  test("closes modal when dialog loses focus", async () => {
    setup();

    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();

    const buttons = screen.getAllByText(/see image in full size/i);
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(document.querySelector("#modal-root dialog")).toBeInTheDocument();
    });

    const dialog = document.querySelector("#modal-root dialog");
    fireEvent.blur(dialog!);

    await waitFor(() => {
      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });
  });

  test("renders empty container when no cards provided", () => {
    setup([]);
    const container = screen.getByRole("list");
    expect(container.children).toHaveLength(0);
  });

  test("renders cards in correct DOM structure", () => {
    setup();
    const list = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(2);
    listItems.forEach((item) => {
      expect(item.parentElement).toBe(list);
    });
  });
});
