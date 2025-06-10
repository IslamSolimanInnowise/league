# League Coding Challenge – Photo Album App

## Overview

This project is a solution to the League coding challenge. It is a modern, accessible, and robust React application that allows users to browse and search a photo album. The app demonstrates strong problem-solving, code organization, and testing practices, and is built with TypeScript, React, Vite, and styled-components.

**Features:**

- Fetches and displays a list of photos (id, author, image_src) from a public API
- Search functionality for photo authors with intelligent, case-insensitive highlighting of matching words (entire word italicized)
- Responsive, accessible, and keyboard-navigable UI
- Robust error handling and helpful user feedback
- Modern styling with styled-components and theming
- Local caching of API responses for performance
- Comprehensive unit and integration tests

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation

1. Download the app directory to your local machine.
2. Run:

```bash
npm install
```

### Running the App

To start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

### Running Tests

This project uses Jest and React Testing Library for testing.
To run all tests:

```bash
npm test
```

A coverage report will be generated in the `coverage/` folder.

## Project Structure

```text
├── src/
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   ├── types.ts               # Shared TypeScript types
│   ├── assets/images/         # Static assets
│   ├── components/            # UI components (Card, CardDialog, CardsContainer, GalleryView, Header)
│   ├── contexts/              # React context for global state
│   ├── hooks/                 # Custom React hooks (useCachedFetch, useDebounce)
│   ├── shared/
│   │   ├── ui/Modal/          # Modal dialog implementation
│   │   └── utils/             # Utility functions (filterCardsArr, modifyAuthor)
│   └── styled-components/     # Theme and global styles
├── public/                    # Static public files
├── coverage/                  # Test coverage reports
```

## Key Implementation Details

- **API:** Uses `https://picsum.photos/v2/list` to fetch photo data.
- **Search:** The search input filters photos by author. Matching words are fully italicized and bolded for clarity, using a utility that sanitizes output to prevent XSS.
- **Accessibility:**
  - All interactive elements are keyboard-accessible
  - Semantic HTML elements are used
  - Modal dialogs are focusable and close on blur or button click
- **Responsiveness:** The layout adapts to different screen sizes using flexbox and styled-components.
- **Error Handling:**
  - Loading and error states are clearly displayed
- **Testing:**
  - All major components, hooks, and utilities are covered by unit and integration tests
  - Test coverage reports are available in the `coverage/` directory

## Assumptions & Trade-offs

- **Time constraint:** The solution was completed within the recommended 4-hour window.
- **API reliability:** The app uses localStorage to cache API responses for 5 minutes to improve performance and resilience.
- **Security:** All dynamic HTML (e.g., highlighted search matches) is sanitized with DOMPurify.
- **Styling:** Used styled-components for modular, themeable styles as recommended by League.
- **Testing:** Focused on unit and integration tests for core logic and UI.

---

Thank you for reviewing my submission! If you have any questions, please feel free to reach out.
