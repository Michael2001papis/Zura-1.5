import React, { useState, useEffect, useCallback } from 'react'
import type { QuoteRow, QuoteTotals, QuoteData } from '../types/index.js'
import { useQuote, useLoading, useError } from '../context/AppContext'
import { ProtectedRoute } from '../components/Auth/ProtectedRoute'
import { QuoteHeader } from '../components/Quote/QuoteHeader'
import { QuoteControls } from '../components/Quote/QuoteControls'
import { QuoteTable } from '../components/Quote/QuoteTable'
import { QuoteSummary } from '../components/Quote/QuoteSummary'
import { QuoteActions } from '../components/Quote/QuoteActions'
import { QUOTE_CONFIG, ERROR_MESSAGES } from '../constants'
import { useMemoizedCalculation } from '../hooks/usePerformance'
import { FadeIn, SlideIn, Stagger } from '../components/Animations/FadeIn'

const Quote: React.FC = () => {
  const { quoteData, setQuoteData, updateQuoteRow, addQuoteRow, removeQuoteRow, clearQuoteData } = useQuote()
  const { loading, setLoading } = useLoading()
  const { error, setError, clearError } = useError()
  
  const [rows, setRows] = useState<QuoteRow[]>([
    { 
      id: 1, 
      location: QUOTE_CONFIG.defaultLocation,
      workType: QUOTE_CONFIG.defaultWorkType,
      quantity: QUOTE_CONFIG.defaultQuantity, 
      percent: QUOTE_CONFIG.defaultPercent, 
      price: QUOTE_CONFIG.defaultPrice,
      withoutVAT: 0,
      vat: 0,
      withVAT: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  
  const [totals, setTotals] = useState<QuoteTotals>({ withoutVAT: 0, vat: 0, withVAT: 0 })
  const [isProcessing, setIsProcessing] = useState(false)

  // Load data from context on mount
  useEffect(() => {
    if (quoteData) {
      setRows(quoteData.rows)
      setTotals(quoteData.totals)
    }
  }, [quoteData])

  // Memoized calculation for better performance
  const calculateTotals = useMemoizedCalculation(
    rows,
    (rowsData: QuoteRow[]): QuoteTotals => {
      let withoutVAT = 0
      rowsData.forEach(row => {
        const total = row.quantity * (row.percent / 100) * row.price
        withoutVAT += total
      })
      const vat = withoutVAT * QUOTE_CONFIG.vatRate
      const withVAT = withoutVAT + vat
      
      return { withoutVAT, vat, withVAT }
    }
  )

  // Update totals when rows change
  useEffect(() => {
    setTotals(calculateTotals)
    
    // Update context
    if (rows.length > 0) {
      const quoteData: QuoteData = {
        rows,
        totals: calculateTotals,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setQuoteData(quoteData)
    }
  }, [rows, calculateTotals, setQuoteData])

  const addRow = useCallback(() => {
    setLoading({ isLoading: true, loadingMessage: 'מוסיף שורה חדשה...' })
    
    try {
      const newRow: QuoteRow = {
        id: Date.now(),
        location: QUOTE_CONFIG.defaultLocation,
        workType: QUOTE_CONFIG.defaultWorkType,
        quantity: QUOTE_CONFIG.defaultQuantity,
        percent: QUOTE_CONFIG.defaultPercent,
        price: QUOTE_CONFIG.defaultPrice,
        withoutVAT: 0,
        vat: 0,
        withVAT: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      setRows(prev => [...prev, newRow])
      addQuoteRow(newRow)
    } catch {
      setError({
        code: 'ADD_ROW_ERROR',
        message: ERROR_MESSAGES.GENERIC,
        timestamp: new Date()
      })
    } finally {
      setLoading({ isLoading: false })
    }
  }, [setLoading, addQuoteRow, setError])

  const updateRow = useCallback((id: string | number, field: keyof QuoteRow, value: unknown) => {
    try {
      setRows(prev => prev.map(row => 
        row.id === id ? { ...row, [field]: value, updatedAt: new Date() } : row
      ))
      updateQuoteRow(id, { [field]: value })
    } catch {
      setError({
        code: 'UPDATE_ROW_ERROR',
        message: ERROR_MESSAGES.GENERIC,
        timestamp: new Date()
      })
    }
  }, [updateQuoteRow, setError])

  const removeRow = useCallback((id: string | number) => {
    if (rows.length <= QUOTE_CONFIG.minRows) return
    
    try {
      setRows(prev => prev.filter(row => row.id !== id))
      removeQuoteRow(id)
    } catch {
      setError({
        code: 'REMOVE_ROW_ERROR',
        message: ERROR_MESSAGES.GENERIC,
        timestamp: new Date()
      })
    }
  }, [rows.length, removeQuoteRow, setError])

  const duplicateRow = useCallback(() => {
    if (rows.length === 0) return
    
    const lastRow = rows[rows.length - 1]
    const newRow: QuoteRow = {
      ...lastRow,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setRows(prev => [...prev, newRow])
    addQuoteRow(newRow)
  }, [rows, addQuoteRow])

  const handlePrint = useCallback(() => {
    setIsProcessing(true)
    try {
      window.print()
    } catch {
      setError({
        code: 'PRINT_ERROR',
        message: ERROR_MESSAGES.GENERIC,
        timestamp: new Date()
      })
    } finally {
      setIsProcessing(false)
    }
  }, [setError])

  const handleEmail = useCallback(() => {
    setIsProcessing(true)
    try {
      // TODO: Implement email functionality
      alert('שליחת הצעה באימייל...')
    } catch {
      setError({
        code: 'EMAIL_ERROR',
        message: ERROR_MESSAGES.GENERIC,
        timestamp: new Date()
      })
    } finally {
      setIsProcessing(false)
    }
  }, [setError])

  const handleSave = useCallback(() => {
    setIsProcessing(true)
    try {
      // Data is already saved via context
      alert('הצעת המחיר נשמרה בהצלחה!')
    } catch {
      setError({
        code: 'SAVE_ERROR',
        message: ERROR_MESSAGES.STORAGE_ERROR,
        timestamp: new Date()
      })
    } finally {
      setIsProcessing(false)
    }
  }, [setError])

  const handleReset = useCallback(() => {
    try {
      setRows([{
        id: 1,
        location: QUOTE_CONFIG.defaultLocation,
        workType: QUOTE_CONFIG.defaultWorkType,
        quantity: QUOTE_CONFIG.defaultQuantity,
        percent: QUOTE_CONFIG.defaultPercent,
        price: QUOTE_CONFIG.defaultPrice,
        withoutVAT: 0,
        vat: 0,
        withVAT: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      clearQuoteData()
    } catch {
      setError({
        code: 'RESET_ERROR',
        message: ERROR_MESSAGES.GENERIC,
        timestamp: new Date()
      })
    }
  }, [clearQuoteData, setError])

  const headerData = {
    title: '💰 יצירת הצעת מחיר מקצועית',
    subtitle: 'מלא את הפרטים הבאים כדי ליצור הצעת מחיר מקצועית ומדויקת',
    badges: [
      { text: 'מהיר', icon: '⚡' },
      { text: 'מדויק', icon: '🎯' },
      { text: 'מקצועי', icon: '💼' }
    ]
  }

  const quoteContent = (
    <FadeIn direction="fade" duration={600}>
      <div className="container">
        {error && (
          <SlideIn direction="down" duration={400}>
            <div className="error-message">
              <p>🚨 {error.message}</p>
              <button onClick={clearError} className="btn secondary-btn">סגור</button>
            </div>
          </SlideIn>
        )}
        
        <Stagger delay={100} staggerDelay={150}>
          <QuoteHeader {...headerData} />
          
          <QuoteControls
            onAddRow={addRow}
            onDuplicateRow={duplicateRow}
            rowCount={rows.length}
            isAdding={loading.isLoading}
          />
          
          <QuoteTable
            rows={rows}
            onUpdateRow={updateRow}
            onRemoveRow={removeRow}
            isLoading={loading.isLoading}
          />
          
          <QuoteSummary
            totals={totals}
            isLoading={loading.isLoading}
          />
          
          <QuoteActions
            onPrint={handlePrint}
            onEmail={handleEmail}
            onSave={handleSave}
            onReset={handleReset}
            isProcessing={isProcessing}
          />
        </Stagger>
      </div>
    </FadeIn>
  )

  return (
    <ProtectedRoute fallback={
      <div className="container">
        <div className="access-denied">
          <h1>🚫 גישה מוגבלת</h1>
          <p>עמוד זה זמין רק למשתמשים מורשים</p>
          <p>אנא התחבר למערכת כדי לגשת לעמוד הצעת המחיר</p>
        </div>
      </div>
    }>
      {quoteContent}
    </ProtectedRoute>
  )
}

export default Quote
