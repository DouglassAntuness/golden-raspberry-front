import { act, render, screen, waitFor, within } from '@testing-library/react';
import { Provider as ChakraProvider } from "@/components/ui/provider";
import MoviesPage from '@/app/movies/page'

// Mock da API
jest.mock('@/lib/api/movies', () => ({
  getMovies: jest.fn(() => Promise.resolve({
    content: [
      { id: 1, year: 1990, title: 'Bad Film 1', winner: true },
      { id: 2, year: 1991, title: 'Bad Film 2', winner: false },
    ],
    totalPages: 1,
  }))
}))

function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('MoviesPage', () => {
  it('renderiza o título e os filtros', async () => {
    await act(async () => {
      renderWithChakra(<MoviesPage />);
    });

    // Usa getAllByText para evitar erro de múltiplos elementos
    const titles = screen.getAllByText(/List Movies/i);
    expect(titles.length).toBeGreaterThan(0);

    expect(screen.getByPlaceholderText(/Filter by year/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  it('renderiza os dados dos filmes na tabela', async () => {
    await act(async () => {
      renderWithChakra(<MoviesPage />);
    });

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThanOrEqual(3);

      const movieRow1 = rows.find(row => row.textContent?.includes('Bad Film 1'));
      const movieRow2 = rows.find(row => row.textContent?.includes('Bad Film 2'));

      expect(movieRow1).toBeDefined();
      expect(movieRow1).toHaveTextContent('1990');
      expect(movieRow1).toHaveTextContent('yes');

      expect(movieRow2).toBeDefined();
      expect(movieRow2).toHaveTextContent('1991');
      expect(movieRow2).toHaveTextContent('no');
    });
  });
});
