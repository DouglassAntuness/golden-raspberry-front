import { render, screen, waitFor } from '@testing-library/react'
import { Provider as ChakraProvider } from "@/components/ui/provider";
import MultipleWinnersTable from '@/components/MultipleWinnersTable'

// Função de render com Chakra UI
function renderWithChakra(ui: React.ReactElement) {
  return render(
    <ChakraProvider>
      {ui}
    </ChakraProvider>
  )
}

describe('MultipleWinnersTable', () => {
  const mockData = [
    { year: 1980, winCount: 2 },
    { year: 1991, winCount: 3 },
  ]

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as unknown as typeof fetch
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renderiza o título corretamente', async () => {
    renderWithChakra(<MultipleWinnersTable />)

    await waitFor(() => {
      expect(screen.getByText(/list years with multiple winners/i)).toBeInTheDocument()
    })
  })


  it('renderiza as linhas da tabela após o fetch', async () => {
    renderWithChakra(<MultipleWinnersTable />)

    // Espera a tabela carregar os dados
    await waitFor(() => {
      expect(screen.getByText('1980')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('1991')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })
})
