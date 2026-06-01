import React, { useState } from 'react';
import { authService } from '../services/api';
import './AuthPage.css';

function LoginPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { status, data } = await authService.login({ email, password });
        if (status === 200) {
          onLoginSuccess({ email, name: email.split('@')[0] });
        } else {
          setError(data.message || 'Login failed');
        }
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (!name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        let result;
        if (isAdmin) {
          if (!adminSecret.trim()) {
            setError('Admin secret is required for admin registration');
            setLoading(false);
            return;
          }
          result = await authService.registerAdmin({ name, email, password, adminSecret });
        } else {
          result = await authService.register({ name, email, password });
        }
        const { status, data } = result;
        if (status === 201) {
          setError('');
          setIsLogin(true);
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setIsAdmin(false);
          setAdminSecret('');
          alert('Registration successful! Please login.');
        } else {
          setError(data.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />{' '}
                Register as admin
              </label>
            </div>
          )}

          {!isLogin && isAdmin && (
            <div className="form-group">
              <label htmlFor="adminSecret">Admin Secret:</label>
              <input
                type="password"
                id="adminSecret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setName('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}
            className="toggle-btn"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
