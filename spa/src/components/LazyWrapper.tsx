import React, { Suspense, lazy, type ComponentType } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface LazyWrapperProps {
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>טוען...</p>
    </div>
  </div>
);

// Lazy wrapper HOC
export function withLazyLoading<P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode,
  errorFallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc);

  return function LazyWrapper(props: P) {
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Suspense fallback={fallback || <LoadingSpinner />}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

// Lazy page wrapper
export const LazyPageWrapper: React.FC<LazyWrapperProps & { children: React.ReactNode }> = ({
  children,
  fallback,
  errorFallback
}) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback || <LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

// Pre-configured lazy components
export const LazyHome = withLazyLoading(
  () => import('../pages/Home'),
  <LoadingSpinner />,
  <div className="error-boundary">שגיאה בטעינת עמוד הבית</div>
);

export const LazyQuote = withLazyLoading(
  () => import('../pages/Quote'),
  <LoadingSpinner />,
  <div className="error-boundary">שגיאה בטעינת עמוד הצעת המחיר</div>
);

export const LazyProjects = withLazyLoading(
  () => import('../pages/Projects'),
  <LoadingSpinner />,
  <div className="error-boundary">שגיאה בטעינת עמוד הפרויקטים</div>
);

export const LazyContact = withLazyLoading(
  () => import('../pages/Contact'),
  <LoadingSpinner />,
  <div className="error-boundary">שגיאה בטעינת עמוד יצירת קשר</div>
);

export const LazyInvoice = withLazyLoading(
  () => import('../pages/Invoice'),
  <LoadingSpinner />,
  <div className="error-boundary">שגיאה בטעינת עמוד החשבונית</div>
);

export const LazyRights = withLazyLoading(
  () => import('../pages/Rights'),
  <LoadingSpinner />,
  <div className="error-boundary">שגיאה בטעינת עמוד הזכויות</div>
);
