import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [accessToken, setAccessToken] = useState(null)
  
  const login = async (email, password) => {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    setAccessToken(data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
    setUser({ id: payload.userId, email: payload.sub });
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('refreshToken');
  };

  const authFetch = (url, options = {}) => {
    return fetch(url, {
      ...options, 
      headers: {
        ...options.headers, 
        'Authorization': `Bearer ${accessToken}`, 
        'Content-Type': 'application/json'
      }
    });
  };

  const value = { user, accessToken, login, logout, authFetch };

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
