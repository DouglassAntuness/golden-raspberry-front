import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider as ChakraProvider } from "@/components/ui/provider"
import WinnersByYearTable from '@/components/WinnersByYearTable'

function renderWithChakra(ui: React.ReactElement) {
  return render(
    <ChakraProvider>
      {ui}
    </ChakraProvider>
  )
}

describe('WinnersByYearTable', () => {
  const mockData = [
    { id: 1, year: 1986, title: 'Worst Movie Ever' },
    { id: 2, year: 1986, title: 'Another Terrible Film' },
  ]

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renderiza título e campo de busca', () => {
    renderWithChakra(<WinnersByYearTable />)
    expect(screen.getByText(/List movie winners by year/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Search by Year/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('realiza busca e exibe os resultados na tabela', async () => {
    renderWithChakra(<WinnersByYearTable />)

    const input = screen.getByPlaceholderText(/Search by Year/i)
    const button = screen.getByRole('button')

    // Digita o ano e clica no botão
    await userEvent.type(input, '1986')
    await userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Worst Movie Ever')).toBeInTheDocument()
      expect(screen.getByText('Another Terrible Film')).toBeInTheDocument()
      expect(screen.getAllByText('1986')).toHaveLength(2)
    })
  })
})