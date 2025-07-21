import { render, screen, waitFor } from '@testing-library/react'
import { Provider as ChakraProvider } from "@/components/ui/provider"
import ProducerIntervalTable from '@/components/ProducerIntervalTable'

function renderWithChakra(ui: React.ReactElement) {
  return render(
    <ChakraProvider>
      {ui}
    </ChakraProvider>
  )
}

describe('ProducerIntervalTable', () => {
  const mockData = {
    max: [
      {
        producer: 'Producer A',
        interval: 20,
        previousWin: 1980,
        followingWin: 2000,
      }
    ],
    min: [
      {
        producer: 'Producer B',
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      }
    ]
  }

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

  it('renderiza o título principal', async () => {
    renderWithChakra(<ProducerIntervalTable />)

    await waitFor(() => {
      expect(
        screen.getByText(/Producers with longest and shortest interval between wins/i)
      ).toBeInTheDocument()
    })
  })


  it('renderiza os dados das tabelas após o fetch', async () => {
    renderWithChakra(<ProducerIntervalTable />)

    await waitFor(() => {
      // Seção Maximum
      expect(screen.getByText('Maximum')).toBeInTheDocument()
      expect(screen.getByText('Producer A')).toBeInTheDocument()
      expect(screen.getByText('20')).toBeInTheDocument()
      expect(screen.getByText('1980')).toBeInTheDocument()
      expect(screen.getByText('2000')).toBeInTheDocument()

      // Seção Minimum
      expect(screen.getByText('Minimum')).toBeInTheDocument()
      expect(screen.getByText('Producer B')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('1990')).toBeInTheDocument()
      expect(screen.getByText('1991')).toBeInTheDocument()
    })
  })
})
