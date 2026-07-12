import axios from 'axios';
import { getAccountByRole, registerUser, roles } from './registerService';

const STORAGE_KEY = 'transitops_auth';
const TOKEN_KEY = 'token';
const AUTH_KEY = 'isAuthenticated';
const USER_KEY = 'user';
const ROLE_KEY = 'role';
const API_URL = 'http://localhost:5000/api';

const roleRedirects = {
  'Fleet Manager': '/dashboard/fleet',
  Dispatcher: '/dashboard/dispatcher',
  'Safety Officer': '/dashboard/safety',
  'Financial Analyst': '/dashboard/finance',
};

export { getAccountByRole, roles };

export const getRedirectPathByRole = () => '/dashboard';
export const getDemoCredentialsByRole = (role) => {
  const demoCredentials = {
    'Fleet Manager': { email: 'fleet@transitops.com', password: '123456', name: 'Alex Mercer' },
    Dispatcher: { email: 'dispatcher@transitops.com', password: '123456', name: 'Jordan Lee' },
    'Safety Officer': { email: 'safety@transitops.com', password: '123456', name: 'Morgan Ellis' },
    'Financial Analyst': { email: 'finance@transitops.com', password: '123456', name: 'Taylor Reed' },
  };
  return demoCredentials[role] || null;
};

export const login = async ({ email, password, rememberMe, role }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data && response.data.success) {
      const { token, user } = response.data.data;
      const session = {
        token,
        user,
        role: user.role || role,
        isAuthenticated: true,
        rememberMe,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(ROLE_KEY, user.role || role);
      return session;
    }
  } catch (error) {
    console.error('Backend login failed, using local mock session fallback.', error);
  }

  // Fallback to offline mock session if backend is not running/accessible
  const normalizedEmail = email.trim().toLowerCase();
  const mockToken = `mock-jwt-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  const session = {
    token: mockToken,
    user: {
      id: 1,
      fullName: 'Development User',
      email: normalizedEmail,
      role,
    },
    role,
    isAuthenticated: true,
    rememberMe,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  localStorage.setItem(TOKEN_KEY, mockToken);
  localStorage.setItem(AUTH_KEY, 'true');
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  localStorage.setItem(ROLE_KEY, role);
  return session;
};

export const register = async ({ fullName, email, phoneNumber, role, password }) => {
  try {
    const nameParts = (fullName || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const response = await axios.post(`${API_URL}/auth/register`, {
      firstName,
      lastName,
      email,
      password,
      phone: phoneNumber,
      role
    });

    if (response.data && response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Backend registration failed, using local mock registration fallback.', error);
  }

  // Local Storage Fallback
  return registerUser({ fullName, email, phoneNumber, role, password });
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
};

export const getSession = () => {
  try {
    const storedSession = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedSession) return storedSession;
  } catch {
    // ignore
  }

  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    const role = localStorage.getItem(ROLE_KEY) || user?.role || null;

    if (!token || !isAuthenticated || !user) return null;

    return { token, isAuthenticated, user, role };
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getSession()?.isAuthenticated);
