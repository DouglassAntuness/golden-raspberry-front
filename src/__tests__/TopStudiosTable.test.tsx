import { render, screen, waitFor } from '@testing-library/react';
import { Provider as ChakraProvider } from "@/components/ui/provider";
import TopStudiosTable from '@/components/TopStudiosTable';
import { getStudiosWithWinCount } from '@/lib/api/movies';

// Mock da função da camada de API
jest.mock('@/lib/api/movies', () => ({
  getStudiosWithWinCount: jest.fn(),
}));

function renderWithChakra(ui: React.ReactElement) {
  return render(
    <ChakraProvider>
      {ui}
    </ChakraProvider>
  );
}

describe('TopStudiosTable', () => {
  const mockStudios = [
    { name: 'Studio A', winCount: 5 },
    { name: 'Studio B', winCount: 3 },
    { name: 'Studio C', winCount: 2 },
  ];

  beforeEach(() => {
    (getStudiosWithWinCount as jest.Mock).mockResolvedValue(mockStudios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o título corretamente', async () => {
    renderWithChakra(<TopStudiosTable />);

    await waitFor(() => {
      expect(screen.getByText(/Top 3 studios with winners/i)).toBeInTheDocument();
    });
  });

  it('renderiza os dados da tabela após o fetch', async () => {
    renderWithChakra(<TopStudiosTable />);

    await waitFor(() => {
      mockStudios.forEach(studio => {
        expect(screen.getByText(studio.name)).toBeInTheDocument();
        expect(screen.getByText(String(studio.winCount))).toBeInTheDocument();
      });
    });
  });
});