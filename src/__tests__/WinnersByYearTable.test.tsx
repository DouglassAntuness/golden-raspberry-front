import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider as ChakraProvider } from "@/components/ui/provider";
import WinnersByYearTable from '@/components/WinnersByYearTable';
import { getWinnersByYear } from '@/lib/api/movies';

jest.mock('@/lib/api/movies', () => ({
  getWinnersByYear: jest.fn(),
}));

function renderWithChakra(ui: React.ReactElement) {
  return render(
    <ChakraProvider>
      {ui}
    </ChakraProvider>
  );
}

describe('WinnersByYearTable', () => {
  const mockData = [
    { id: 1, year: 1986, title: 'Worst Movie Ever' },
    { id: 2, year: 1986, title: 'Another Terrible Film' },
  ];

  beforeEach(() => {
    (getWinnersByYear as jest.Mock).mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza título e campo de busca', () => {
    renderWithChakra(<WinnersByYearTable />);
    expect(screen.getByText(/List movie winners by year/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by Year/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('realiza busca e exibe os resultados na tabela', async () => {
    renderWithChakra(<WinnersByYearTable />);

    const input = screen.getByPlaceholderText(/Search by Year/i);
    const button = screen.getByRole('button');

    await userEvent.type(input, '1986');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Worst Movie Ever')).toBeInTheDocument();
      expect(screen.getByText('Another Terrible Film')).toBeInTheDocument();
      expect(screen.getAllByText('1986')).toHaveLength(2);
    });
  });
});