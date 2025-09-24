import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import type { AppError } from '../types/index.js';
import { ERROR_MESSAGES } from '../constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: AppError) => void;
}

interface State {
  hasError: boolean;
  error: AppError | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    const appError: AppError = {
      code: 'COMPONENT_ERROR',
      message: error.message,
      details: {
        stack: error.stack,
        name: error.name
      },
      timestamp: new Date()
    };

    return {
      hasError: true,
      error: appError
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const appError: AppError = {
      code: 'COMPONENT_ERROR',
      message: error.message,
      details: {
        stack: error.stack,
        name: error.name,
        componentStack: errorInfo.componentStack
      },
      timestamp: new Date()
    };

    // Log error
    console.error('ErrorBoundary caught an error:', appError);

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(appError);
    }

    // You could also send error to logging service here
    // logErrorToService(appError);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">🚨</div>
            <h2>אופס! משהו השתבש</h2>
            <p>{ERROR_MESSAGES.GENERIC}</p>
            
            {import.meta.env.DEV && this.state.error && (
              <details className="error-details">
                <summary>פרטי השגיאה (למפתחים)</summary>
                <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
              </details>
            )}
            
            <div className="error-actions">
              <button 
                className="btn btn--primary" 
                onClick={this.handleRetry}
              >
                🔄 נסה שוב
              </button>
              <button 
                className="btn btn--secondary" 
                onClick={() => window.location.reload()}
              >
                🔃 רענן דף
              </button>
              <button 
                className="btn btn--outline" 
                onClick={() => window.open(`mailto:Zurapapismedov@gmail.com?subject=Error Report&body=Error: ${this.state.error?.message}`)}
              >
                📧 דווח על השגיאה
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
