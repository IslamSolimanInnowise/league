import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styled-components/themes';
import Header from './index';
import { GlobalContext } from '@/contexts/global-context/global-context';

jest.mock('../../assets/images/logo.jpg', () => 'mocked-image-path');

describe('Header Component', () => {
  const mockSetSearchTerm = jest.fn();

  const setup = (initialSearchTerm = '') => {
    return render(
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider
          value={{
            searchTerm: initialSearchTerm,
            setSearchTerm: mockSetSearchTerm,
          }}
        >
          <Header />
        </GlobalContext.Provider>
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    mockSetSearchTerm.mockClear();
  });

  test('renders logo image', () => {
    setup();
    const logoImage = screen.getByRole('img', {
      name: /logo image of a photo album/i,
    });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'mocked-image-path');
  });

  test('renders search input', () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search for photos/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
  });

  test('calls setSearchTerm when input value changes', () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search for photos/i);
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test search');
  });

  test('input value updates correctly from context', () => {
    setup('test value');
    const searchInput = screen.getByPlaceholderText(/search for photos/i) as HTMLInputElement;
    expect(searchInput.value).toBe('test value');
  });

  test('input is empty by default', () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search for photos/i) as HTMLInputElement;
    expect(searchInput.value).toBe('');
  });

  test('search input has correct placeholder', () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/search for photos/i);
    expect(searchInput).toHaveAttribute('placeholder', 'Search for photos');
  });

  test('header has correct styling', () => {
    setup();
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveStyle('display: flex');
  });

  test('logo image has correct alt text', () => {
    setup();
    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveAttribute('alt', 'logo image of a photo album');
  });
});
