import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Auth.module.css'; // Assuming a CSS module for Auth component

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experienceLevel, setExperienceLevel] = useState(''); // Only for signup
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    const endpoint = isLogin ? '/auth/signin' : '/auth/signup';
    const body = isLogin
      ? { email, password }
      : { email, password, experience_level: experienceLevel };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || (isLogin ? 'Login successful!' : 'Signup successful!'));
        if (onAuthSuccess && isLogin) {
          onAuthSuccess(data.access_token); // Pass token to parent
        } else if (!isLogin) {
          setIsLogin(true); // After signup, switch to login
        }
      } else {
        setMessage(data.detail || 'Authentication failed.');
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setMessage('Network error or server unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx('card', styles.authContainer)}>
      <div className="card__header">
        <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
      </div>
      <div className="card__body">
        {message && <div className={styles.message}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="margin-bottom--md">
            <label htmlFor="email" className="form__label">Email:</label>
            <input
              type="email"
              id="email"
              className="form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="margin-bottom--md">
            <label htmlFor="password" className="form__label">Password:</label>
            <input
              type="password"
              id="password"
              className="form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {!isLogin && (
            <div className="margin-bottom--md">
              <label htmlFor="experienceLevel" className="form__label">Experience Level (optional):</label>
              <input
                type="text"
                id="experienceLevel"
                className="form__input"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                disabled={isLoading}
              />
            </div>
          )}
          <button type="submit" className={clsx('button button--primary button--block', styles.authButton)} disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <div className="margin-top--md text--center">
          <a onClick={() => setIsLogin(!isLogin)} className={styles.toggleLink}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;