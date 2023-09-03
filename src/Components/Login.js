// Login.js (with logout functionality)
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectIsAuthenticated, selectIsAdmin } from '../store/Slices/authSlice';// Import the logout action and selectors
import styles from '../Styles/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      dispatch(login());
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear authentication state
  };

  return (
    <div className={styles['login-container']}>
      <h2 className={styles['login-heading']}>Login</h2>
      {isAuthenticated ? (
        <div>
          {isAdmin ? (
            <div>
              <p>Welcome, Admin!</p>
              <button onClick={handleLogout}>Logout</button> {/* Add logout button */}
            </div>
          ) : (
            <p>Welcome, User!</p>
          )}
        </div>
      ) : (
        <div>
          <div className={styles['form-group']}>
            <label className={styles['label']} htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles['input']}
            />
          </div>
          <div className={styles['form-group']}>
            <label className={styles['label']} htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles['input']}
            />
          </div>
          <button onClick={handleLogin} className={styles['button']}>
            Login
          </button>
          {error && <p className={styles['error-message']}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
