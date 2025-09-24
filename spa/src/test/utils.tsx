import React, { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { AppProvider } from '../context/AppContext'
import { HashRouter } from 'react-router-dom'

// Mock data for testing
export const mockQuoteData = {
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
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ],
  totals: {
    withoutVAT: 500,
    vat: 90,
    withVAT: 590
  },
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
}

export const mockClientInfo = {
  name: 'לקוח בדיקה',
  email: 'test@example.com',
  phone: '050-1234567',
  address: 'כתובת בדיקה 123, תל אביב'
}

export const mockBusinessInfo = {
  name: 'G.R. Solutions',
  address: 'גולדברג הנדבן 14, ראשון לציון',
  phone: '054-582-0008',
  email: 'Zurapapismedov@gmail.com',
  vatNumber: '123456789',
  logo: '/vite.svg'
}

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialQuoteData?: typeof mockQuoteData
  initialClientInfo?: typeof mockClientInfo
  initialBusinessInfo?: typeof mockBusinessInfo
  withRouter?: boolean
}

const AllTheProviders: React.FC<{
  children: React.ReactNode
  initialQuoteData?: typeof mockQuoteData
  initialClientInfo?: typeof mockClientInfo
  initialBusinessInfo?: typeof mockBusinessInfo
  withRouter?: boolean
}> = ({
  children,
  initialQuoteData,
  initialClientInfo,
  initialBusinessInfo,
  withRouter = false
}) => {
  const content = withRouter ? (
    <HashRouter>{children}</HashRouter>
  ) : (
    children
  )

  return (
    <AppProvider
      initialQuoteData={initialQuoteData}
      initialClientInfo={initialClientInfo}
      initialBusinessInfo={initialBusinessInfo}
    >
      {content}
    </AppProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const {
    initialQuoteData,
    initialClientInfo,
    initialBusinessInfo,
    withRouter,
    ...renderOptions
  } = options

  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders
        {...props}
        initialQuoteData={initialQuoteData}
        initialClientInfo={initialClientInfo}
        initialBusinessInfo={initialBusinessInfo}
        withRouter={withRouter}
      />
    ),
    ...renderOptions
  })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Test helpers
export const createMockQuoteRow = (overrides = {}) => ({
  id: Date.now(),
  location: 'דירה',
  workType: 'הריסה',
  quantity: 0,
  percent: 100,
  price: 0,
  withoutVAT: 0,
  vat: 0,
  withVAT: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
})

export const createMockClient = (overrides = {}) => ({
  name: '',
  email: '',
  phone: '',
  address: '',
  ...overrides
})

export const createMockBusiness = (overrides = {}) => ({
  name: 'G.R. Solutions',
  address: 'גולדברג הנדבן 14, ראשון לציון',
  phone: '054-582-0008',
  email: 'Zurapapismedov@gmail.com',
  vatNumber: '123456789',
  logo: '/vite.svg',
  ...overrides
})

// Mock functions
export const mockConsoleError = () => {
  const originalError = console.error
  console.error = vi.fn()
  return () => {
    console.error = originalError
  }
}

export const mockConsoleWarn = () => {
  const originalWarn = console.warn
  console.warn = vi.fn()
  return () => {
    console.warn = originalWarn
  }
}

// Wait for async operations
export const waitFor = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms))

// Mock localStorage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {}
  
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    })
  }
}

// Mock sessionStorage
export const mockSessionStorage = () => {
  const store: Record<string, string> = {}
  
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    })
  }
}

// Mock fetch responses
export const mockFetch = (response: unknown, ok = true) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      status: ok ? 200 : 400,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      blob: () => Promise.resolve(new Blob([JSON.stringify(response)])),
      headers: new Headers(),
      redirected: false,
      statusText: ok ? 'OK' : 'Bad Request',
      type: 'basic' as ResponseType,
      url: 'http://localhost:3000',
      clone: vi.fn(),
      body: null,
      bodyUsed: false,
      arrayBuffer: vi.fn(),
      formData: vi.fn()
    })
  ) as jest.MockedFunction<typeof fetch>
}

// Mock IntersectionObserver
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  })
  window.IntersectionObserver = mockIntersectionObserver
  return mockIntersectionObserver
}

// Mock ResizeObserver
export const mockResizeObserver = () => {
  const mockResizeObserver = vi.fn()
  mockResizeObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  })
  window.ResizeObserver = mockResizeObserver
  return mockResizeObserver
}

// Mock matchMedia
export const mockMatchMedia = (matches = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })
}

// Mock crypto
export const mockCrypto = () => {
  Object.defineProperty(global, 'crypto', {
    value: {
      getRandomValues: vi.fn((arr) => arr.map(() => Math.floor(Math.random() * 256))),
      subtle: {
        digest: vi.fn(),
        importKey: vi.fn(),
        exportKey: vi.fn(),
        sign: vi.fn(),
        verify: vi.fn(),
        encrypt: vi.fn(),
        decrypt: vi.fn(),
        deriveKey: vi.fn(),
        deriveBits: vi.fn(),
        generateKey: vi.fn()
      }
    }
  })
}

// Test data factories
export const quoteDataFactory = (count = 1) => 
  Array.from({ length: count }, (_, index) => createMockQuoteRow({ id: index + 1 }))

export const clientFactory = (count = 1) =>
  Array.from({ length: count }, (_, index) => 
    createMockClient({ 
      name: `לקוח ${index + 1}`,
      email: `client${index + 1}@example.com`
    })
  )

// Assertion helpers
export const expectToBeInTheDocument = (element: HTMLElement | null) => {
  expect(element).toBeInTheDocument()
}

export const expectToHaveClass = (element: HTMLElement | null, className: string) => {
  expect(element).toHaveClass(className)
}

export const expectToHaveTextContent = (element: HTMLElement | null, text: string) => {
  expect(element).toHaveTextContent(text)
}

export const expectToHaveAttribute = (element: HTMLElement | null, attribute: string, value?: string) => {
  expect(element).toHaveAttribute(attribute, value)
}
