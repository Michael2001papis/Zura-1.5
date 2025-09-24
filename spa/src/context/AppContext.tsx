import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { QuoteData, ClientInfo, BusinessInfo, AppError, LoadingState, BusinessStats } from '../types/index.js';
import { encryptData, decryptData } from '../utils/security';

// Action types
type AppAction =
  | { type: 'SET_LOADING'; payload: LoadingState }
  | { type: 'SET_ERROR'; payload: AppError | null }
  | { type: 'SET_QUOTE_DATA'; payload: QuoteData }
  | { type: 'UPDATE_QUOTE_ROW'; payload: { id: string | number; data: Partial<QuoteData['rows'][0]> } }
  | { type: 'ADD_QUOTE_ROW'; payload: QuoteData['rows'][0] }
  | { type: 'REMOVE_QUOTE_ROW'; payload: string | number }
  | { type: 'SET_CLIENT_INFO'; payload: ClientInfo }
  | { type: 'CLEAR_QUOTE_DATA' }
  | { type: 'HYDRATE_STATE'; payload: Partial<AppState> };

// State interface
interface AppState {
  loading: LoadingState;
  error: AppError | null;
  quoteData: QuoteData | null;
  clientInfo: ClientInfo | null;
  businessInfo: BusinessInfo;
  stats: BusinessStats;
  isInitialized: boolean;
}

// Initial state
const initialState: AppState = {
  loading: { isLoading: false },
  error: null,
  quoteData: null,
  clientInfo: null,
  businessInfo: {
    name: 'G.R. Solutions',
    address: 'גולדברג הנדבן 14, ראשון לציון',
    phone: '054-582-0008',
    email: 'Zurapapismedov@gmail.com',
    workingHours: {
      sundayToThursday: '08:00 - 18:00',
      friday: '08:00 - 14:00',
      saturday: 'סגור'
    }
  },
  stats: {
    completedProjects: 50,
    satisfiedClients: 100,
    yearsExperience: 5,
    averageRating: 5.0
  },
  isInitialized: false
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_QUOTE_DATA':
      return { ...state, quoteData: action.payload };
    
    case 'UPDATE_QUOTE_ROW':
      if (!state.quoteData) return state;
      return {
        ...state,
        quoteData: {
          ...state.quoteData,
          rows: state.quoteData.rows.map(row =>
            row.id === action.payload.id
              ? { ...row, ...action.payload.data }
              : row
          ),
          updatedAt: new Date()
        }
      };
    
    case 'ADD_QUOTE_ROW':
      if (!state.quoteData) return state;
      return {
        ...state,
        quoteData: {
          ...state.quoteData,
          rows: [...state.quoteData.rows, action.payload],
          updatedAt: new Date()
        }
      };
    
    case 'REMOVE_QUOTE_ROW':
      if (!state.quoteData) return state;
      return {
        ...state,
        quoteData: {
          ...state.quoteData,
          rows: state.quoteData.rows.filter(row => row.id !== action.payload),
          updatedAt: new Date()
        }
      };
    
    case 'SET_CLIENT_INFO':
      return { ...state, clientInfo: action.payload };
    
    case 'CLEAR_QUOTE_DATA':
      return { ...state, quoteData: null };
    
    case 'HYDRATE_STATE':
      return { ...state, ...action.payload, isInitialized: true };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedQuoteData = localStorage.getItem('quoteData');
        const storedClientInfo = localStorage.getItem('clientInfo');
        
        if (storedQuoteData) {
          // Try to decrypt first, fallback to plain JSON
          let parsedQuoteData;
          try {
            parsedQuoteData = decryptData(storedQuoteData);
          } catch {
            // Fallback for old unencrypted data
            parsedQuoteData = JSON.parse(storedQuoteData);
          }
          
          if (parsedQuoteData) {
            // Convert date strings back to Date objects
            parsedQuoteData.createdAt = new Date(parsedQuoteData.createdAt);
            parsedQuoteData.updatedAt = new Date(parsedQuoteData.updatedAt);
            dispatch({ type: 'SET_QUOTE_DATA', payload: parsedQuoteData });
          }
        }
        
        if (storedClientInfo) {
          // Try to decrypt first, fallback to plain JSON
          let parsedClientInfo;
          try {
            parsedClientInfo = decryptData(storedClientInfo);
          } catch {
            // Fallback for old unencrypted data
            parsedClientInfo = JSON.parse(storedClientInfo);
          }
          
          if (parsedClientInfo) {
            dispatch({ type: 'SET_CLIENT_INFO', payload: parsedClientInfo });
          }
        }
        
        dispatch({ type: 'HYDRATE_STATE', payload: {} });
      } catch (error) {
        console.error('Error loading stored data:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: {
            code: 'STORAGE_LOAD_ERROR',
            message: 'Failed to load stored data',
            timestamp: new Date()
          }
        });
      }
    };

    loadStoredData();
  }, []);

  // Save quote data to localStorage whenever it changes
  useEffect(() => {
    if (state.quoteData && state.isInitialized) {
      try {
        // Encrypt data before storing
        const encryptedData = encryptData(state.quoteData);
        localStorage.setItem('quoteData', encryptedData);
      } catch (error) {
        console.error('Error saving quote data:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: {
            code: 'STORAGE_SAVE_ERROR',
            message: 'Failed to save quote data',
            timestamp: new Date()
          }
        });
      }
    }
  }, [state.quoteData, state.isInitialized]);

  // Save client info to localStorage whenever it changes
  useEffect(() => {
    if (state.clientInfo && state.isInitialized) {
      try {
        // Encrypt data before storing
        const encryptedData = encryptData(state.clientInfo);
        localStorage.setItem('clientInfo', encryptedData);
      } catch (error) {
        console.error('Error saving client info:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: {
            code: 'STORAGE_SAVE_ERROR',
            message: 'Failed to save client info',
            timestamp: new Date()
          }
        });
      }
    }
  }, [state.clientInfo, state.isInitialized]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Custom hooks for specific functionality
export function useQuote() {
  const { state, dispatch } = useAppContext();
  
  const setQuoteData = (data: QuoteData) => {
    dispatch({ type: 'SET_QUOTE_DATA', payload: data });
  };
  
  const updateQuoteRow = (id: string | number, data: Partial<QuoteData['rows'][0]>) => {
    dispatch({ type: 'UPDATE_QUOTE_ROW', payload: { id, data } });
  };
  
  const addQuoteRow = (row: QuoteData['rows'][0]) => {
    dispatch({ type: 'ADD_QUOTE_ROW', payload: row });
  };
  
  const removeQuoteRow = (id: string | number) => {
    dispatch({ type: 'REMOVE_QUOTE_ROW', payload: id });
  };
  
  const clearQuoteData = () => {
    dispatch({ type: 'CLEAR_QUOTE_DATA' });
  };
  
  return {
    quoteData: state.quoteData,
    setQuoteData,
    updateQuoteRow,
    addQuoteRow,
    removeQuoteRow,
    clearQuoteData
  };
}

export function useClient() {
  const { state, dispatch } = useAppContext();
  
  const setClientInfo = (info: ClientInfo) => {
    dispatch({ type: 'SET_CLIENT_INFO', payload: info });
  };
  
  return {
    clientInfo: state.clientInfo,
    setClientInfo
  };
}

export function useLoading() {
  const { state, dispatch } = useAppContext();
  
  const setLoading = (loading: LoadingState) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };
  
  return {
    loading: state.loading,
    setLoading
  };
}

export function useError() {
  const { state, dispatch } = useAppContext();
  
  const setError = (error: AppError | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };
  
  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };
  
  return {
    error: state.error,
    setError,
    clearError
  };
}
