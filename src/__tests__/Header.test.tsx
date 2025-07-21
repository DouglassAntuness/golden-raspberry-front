import { render, screen, fireEvent } from '@testing-library/react'
import { Provider as ChakraProvider } from "@/components/ui/provider"
import Header from '@/components/Header'

// Test wrapper with ChakraProvider
function renderWithChakra(ui: React.ReactElement) {
  return render(
    <ChakraProvider>
      {ui}
    </ChakraProvider>
  )
}

describe('Header', () => {
  it('renderiza o título Golden Raspberry', () => {
    renderWithChakra(<Header />)
    expect(screen.getByText(/golden raspberry/i)).toBeInTheDocument()
  })

  it('renderiza o botão de alternância de tema', () => {
    renderWithChakra(<Header />)
    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toBeInTheDocument()
  })

  it('alterna o ícone ao clicar no botão de tema', () => {
    renderWithChakra(<Header />)

    const toggleButton = screen.getByRole('button')
    const moonIcon = screen.getByTestId('icon-moon')

    // Ícone de lua no modo claro
    expect(moonIcon).toBeInTheDocument()

    // Simula clique
    fireEvent.click(toggleButton)

    // Espera o ícone de sol (modo escuro)
    const sunIcon = screen.getByTestId('icon-sun')
    expect(sunIcon).toBeInTheDocument()
  })
})
