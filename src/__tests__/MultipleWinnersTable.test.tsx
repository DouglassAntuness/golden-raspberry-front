import { render, screen, waitFor } from '@testing-library/react';
import { Provider as ChakraProvider } from "@/components/ui/provider";
import MultipleWinnersTable from '@/components/MultipleWinnersTable';
import { getYearsWithMultipleWinners } from '@/lib/api/movies';

// Mock da função da camada de API
jest.mock('@/lib/api/movies', () => ({
  getYearsWithMultipleWinners: jest.fn(),
}));

// Função de render com Chakra UI
function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('MultipleWinnersTable', () => {
  const mockData = [
    { year: 1980, winnerCount: 2 },
    { year: 1991, winnerCount: 3 },
  ];

  beforeEach(() => {
    // Garantir que a função mocked resolve os dados esperados
    (getYearsWithMultipleWinners as jest.Mock).mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o título corretamente', async () => {
    renderWithChakra(<MultipleWinnersTable />);

    await waitFor(() => {
      expect(screen.getByText(/list years with multiple winners/i)).toBeInTheDocument();
    });
  });

  it('renderiza as linhas da tabela após o fetch', async () => {
    renderWithChakra(<MultipleWinnersTable />);

    await waitFor(() => {
      expect(screen.getByText('1980')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('1991')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });
});
