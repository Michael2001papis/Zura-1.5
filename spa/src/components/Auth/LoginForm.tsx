import React, { useState } from 'react';
import type { BaseComponentProps } from '../../types/index.js';

interface LoginFormProps extends BaseComponentProps {
  onLogin: (username: string, password: string) => boolean;
  onCancel: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onCancel,
  className = ''
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = onLogin(username, password);
    
    if (!success) {
      setError('שם משתמש או סיסמה שגויים');
    }
    
    setIsLoading(false);
  };

  return (
    <div className={`login-overlay ${className}`}>
      <div className="login-container">
        <div className="login-header">
          <h2>🔐 התחברות למערכת</h2>
          <p>הזן את פרטי ההתחברות שלך</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">שם משתמש:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="הזן שם משתמש"
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">סיסמה:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הזן סיסמה"
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}

          <div className="login-actions">
            <button
              type="submit"
              className="btn primary-btn"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? 'מתחבר...' : 'התחבר'}
            </button>
            
            <button
              type="button"
              className="btn secondary-btn"
              onClick={onCancel}
              disabled={isLoading}
            >
              ביטול
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>רק משתמשים מורשים יכולים לגשת למערכת</p>
        </div>
      </div>
    </div>
  );
};
