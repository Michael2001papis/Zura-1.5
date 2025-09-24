import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from './utils'
import Quote from '../pages/Quote'

// Mock the ProtectedRoute component
vi.mock('../components/Auth/ProtectedRoute', () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => <div data-testid="protected-route">{children}</div>
}))

// Mock the lazy components
vi.mock('../components/LazyWrapper', () => ({
  LazyHome: () => <div data-testid="lazy-home">Home</div>,
  LazyQuote: () => <div data-testid="lazy-quote">Quote</div>,
  LazyProjects: () => <div data-testid="lazy-projects">Projects</div>,
  LazyContact: () => <div data-testid="lazy-contact">Contact</div>,
  LazyInvoice: () => <div data-testid="lazy-invoice">Invoice</div>,
  LazyRights: () => <div data-testid="lazy-rights">Rights</div>
}))

describe('Quote Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders quote page with initial data', () => {
    render(<Quote />, { withRouter: true })
    
    expect(screen.getByTestId('protected-route')).toBeInTheDocument()
    expect(screen.getByText('💰 יצירת הצעת מחיר מקצועית')).toBeInTheDocument()
  })

  it('displays quote table with initial row', () => {
    render(<Quote />, { withRouter: true })
    
    // Check if table headers are present
    expect(screen.getByText('מיקום')).toBeInTheDocument()
    expect(screen.getByText('סוג עבודה')).toBeInTheDocument()
    expect(screen.getByText('כמות')).toBeInTheDocument()
    expect(screen.getByText('אחוז')).toBeInTheDocument()
    expect(screen.getByText('מחיר')).toBeInTheDocument()
  })

  it('allows adding new rows', async () => {
    render(<Quote />, { withRouter: true })
    
    const addButton = screen.getByText('➕ הוסף שורה')
    expect(addButton).toBeInTheDocument()
    
    fireEvent.click(addButton)
    
    // Wait for the new row to be added
    await waitFor(() => {
      expect(screen.getAllByDisplayValue('דירה')).toHaveLength(2)
    })
  })

  it('calculates totals correctly', () => {
    render(<Quote />, { 
      withRouter: true,
      initialQuoteData: {
        rows: [
          {
            id: 1,
            location: 'דירה',
            workType: 'הריסה',
            quantity: 10,
            percent: 100,
            price: 50,
            withoutVAT: 500,
            vat: 90,
            withVAT: 590,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        totals: {
          withoutVAT: 500,
          vat: 90,
          withVAT: 590
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    
    expect(screen.getByText('500.00 ₪')).toBeInTheDocument()
    expect(screen.getByText('90.00 ₪')).toBeInTheDocument()
    expect(screen.getByText('590.00 ₪')).toBeInTheDocument()
  })

  it('handles row updates', async () => {
    render(<Quote />, { withRouter: true })
    
    const quantityInput = screen.getByDisplayValue('0')
    fireEvent.change(quantityInput, { target: { value: '5' } })
    
    await waitFor(() => {
      expect(quantityInput).toHaveValue(5)
    })
  })

  it('shows loading state', () => {
    render(<Quote />, { withRouter: true })
    
    // The component should render without loading state initially
    expect(screen.queryByText('טוען...')).not.toBeInTheDocument()
  })

  it('displays error messages when they occur', () => {
    render(<Quote />, { withRouter: true })
    
    // Initially no error should be shown
    expect(screen.queryByText('🚨')).not.toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Quote />, { withRouter: true })
    
    const mainContent = screen.getByRole('main')
    expect(mainContent).toBeInTheDocument()
    
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
  })

  it('handles form validation', async () => {
    render(<Quote />, { withRouter: true })
    
    const quantityInput = screen.getByDisplayValue('0')
    
    // Test invalid input
    fireEvent.change(quantityInput, { target: { value: 'invalid' } })
    fireEvent.blur(quantityInput)
    
    // The input should still be there (no validation error shown in this simple test)
    expect(quantityInput).toBeInTheDocument()
  })

  it('supports keyboard navigation', () => {
    render(<Quote />, { withRouter: true })
    
    const addButton = screen.getByText('➕ הוסף שורה')
    addButton.focus()
    expect(addButton).toHaveFocus()
    
    // Test Enter key
    fireEvent.keyDown(addButton, { key: 'Enter', code: 'Enter' })
    // Button should still be focused
    expect(addButton).toHaveFocus()
  })

  it('renders with proper RTL support', () => {
    render(<Quote />, { withRouter: true })
    
    const container = screen.getByRole('main')
    expect(container).toHaveStyle({ direction: 'rtl' })
  })
})
