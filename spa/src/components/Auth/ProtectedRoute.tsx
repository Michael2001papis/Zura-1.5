import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LoginForm } from './LoginForm';
import { hashPassword, verifyPassword, encryptData, rateLimiter, sanitizeInput, generateSecureToken } from '../../utils/security';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Secure credentials - in production, these should be environment variables
const VALID_CREDENTIALS = {
  username: 'ZURA',
  password: 'G.R.Solutions2025!@#' // Strong password
};

// Pre-hashed password for security
const HASHED_PASSWORD = hashPassword(VALID_CREDENTIALS.password);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback
}) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('isAuthenticated', false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      setIsLoading(false);
    } else {
      // Show login form after a short delay
      setTimeout(() => {
        setShowLogin(true);
        setIsLoading(false);
      }, 500);
    }
  }, [isAuthenticated]);

  const handleLogin = (username: string, password: string): boolean => {
    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);
    
    // Check rate limiting
    const clientId = navigator.userAgent + window.location.hostname;
    if (!rateLimiter.isAllowed(clientId)) {
      console.warn('Too many login attempts. Please try again later.');
      return false;
    }

    // Verify credentials
    const isValid = 
      sanitizedUsername.toUpperCase() === VALID_CREDENTIALS.username.toUpperCase() &&
      verifyPassword(sanitizedPassword, HASHED_PASSWORD);

    if (isValid) {
      // Reset rate limiter on successful login
      rateLimiter.reset(clientId);
      
      // Encrypt authentication data
      const authData = {
        username: sanitizedUsername,
        loginTime: Date.now(),
        token: generateSecureToken()
      };
      
      // Store encrypted auth data
      localStorage.setItem('authData', encryptData(authData));
      setIsAuthenticated(true);
      setShowLogin(false);
      return true;
    }
    
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  const handleCancel = () => {
    // Redirect to home page
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>בודק הרשאות...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        {showLogin && (
          <LoginForm
            onLogin={handleLogin}
            onCancel={handleCancel}
          />
        )}
        {fallback}
      </>
    );
  }

  return (
    <div className="protected-content">
      <div className="auth-header">
        <div className="user-info">
          <span className="user-name">👤 {VALID_CREDENTIALS.username}</span>
          <button 
            className="btn logout-btn"
            onClick={handleLogout}
            title="התנתק"
          >
            🚪 התנתק
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};
