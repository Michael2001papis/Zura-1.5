import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
})

// Mock crypto for security functions
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
      generateKey: vi.fn(),
    }
  }
})

// Mock performance
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
    getEntriesByName: vi.fn(() => []),
    clearMarks: vi.fn(),
    clearMeasures: vi.fn(),
  }
})

// Mock console methods in test environment
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalConsoleError.call(console, ...args)
  }
  
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps') ||
       args[0].includes('componentWillMount'))
    ) {
      return
    }
    originalConsoleWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalConsoleError
  console.warn = originalConsoleWarn
})

// Mock fetch
global.fetch = vi.fn()

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mocked-url')
global.URL.revokeObjectURL = vi.fn()

// Mock navigator
Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  writable: true
})

Object.defineProperty(navigator, 'onLine', {
  value: true,
  writable: true
})

// Mock service worker
Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: vi.fn(() => Promise.resolve({
      installing: null,
      waiting: null,
      active: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      update: vi.fn(() => Promise.resolve()),
      unregister: vi.fn(() => Promise.resolve(true))
    })),
    ready: Promise.resolve({
      installing: null,
      waiting: null,
      active: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      update: vi.fn(() => Promise.resolve()),
      unregister: vi.fn(() => Promise.resolve(true))
    }),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    controller: null
  },
  writable: true
})

// Mock IndexedDB
const mockIndexedDB = {
  open: vi.fn(() => ({
    onsuccess: null,
    onerror: null,
    result: {
      transaction: vi.fn(() => ({
        objectStore: vi.fn(() => ({
          add: vi.fn(),
          get: vi.fn(),
          getAll: vi.fn(),
          put: vi.fn(),
          delete: vi.fn(),
          clear: vi.fn()
        }))
      }))
    }
  })),
  deleteDatabase: vi.fn()
}

Object.defineProperty(window, 'indexedDB', {
  value: mockIndexedDB,
  writable: true
})

// Suppress specific warnings
const originalError = console.error
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning:') || args[0].includes('Error:'))
  ) {
    return
  }
  originalError(...args)
}
