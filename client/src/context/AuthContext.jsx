import { useEffect, useState } from 'react';
import { AuthContext } from './authContext.js';
import * as authService from '../services/authService';

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    setSession(authService.getSession());
    setLoading(false);
  }, []);

  const notify = (message, type = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(
      () => setToasts((current) => current.filter((t) => t.id !== id)),
      3200
    );
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const nextSession = await authService.login(credentials);
      setSession(nextSession);
      notify('Login Success', 'success');
      return nextSession;
    } finally {
      setLoading(false);
    }
  };

  const register = async (values) => {
    setLoading(true);
    try {
      return await authService.register(values);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setSession(null);
    notify('Logout', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        notify,
        toasts,
        user: session?.user ?? null,
        role: session?.role ?? null,
        loading,
        isAuthenticated: Boolean(session?.isAuthenticated),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
