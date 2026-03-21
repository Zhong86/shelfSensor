import { useEffect, createContext, useContext, useState } from 'react';
import { setToken, clearToken } from '../api.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [entries, setEntries] = useState(null);

  useEffect(() => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return;

  // get new access token using refresh token
  fetch(`${import.meta.env.VITE_API_AUTH}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  })
    .then(res => res.json())
    .then(data => {
      setToken(data.accessToken);  // restore token in api.js
        const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
        setUser({ id: payload.userId, email: payload.sub });
      })
      .catch(() => {
        localStorage.removeItem('refreshToken'); // refresh token expired, force logout
      });
  }, []);

  const login = async (email, password, name) => {
    const url = !name 
      ? `${import.meta.env.VITE_API_AUTH}/login`
      : `${import.meta.env.VITE_API_AUTH}/register`;
    const body = !name 
      ? {email, password}
      : {email, password, name};

    const res = await fetch(url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Authentication failed');
    }
    const data = await res.json();

    setToken(data.accessToken);
    const payload = JSON.parse(atob(data.accessToken.split('.')[1]));

    localStorage.setItem('refreshToken', data.refreshToken);
    setUser({ id: payload.userId, email: payload.sub });
  };

  const logout = () => {
    clearToken();
    setUser(null);
    setEntries(null);
    localStorage.removeItem('refreshToken');
  };

  const value = { user, login, logout, entries, setEntries };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }

  return context;
}
