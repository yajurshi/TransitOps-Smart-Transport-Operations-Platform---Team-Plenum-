import { getAccountByRole, getAllUsers, registerUser, roles } from './registerService';

const STORAGE_KEY = 'transitops_auth';
const TOKEN_KEY = 'token';
const AUTH_KEY = 'isAuthenticated';
const USER_KEY = 'user';
const ROLE_KEY = 'role';
const MOCK_USER_ID = 1;
const roleRedirects = {
  'Fleet Manager': '/dashboard/fleet',
  Dispatcher: '/dashboard/dispatcher',
  'Safety Officer': '/dashboard/safety',
  'Financial Analyst': '/dashboard/finance',
};

const demoCredentials = {
  'Fleet Manager': { email: 'fleet@transitops.com', password: '123456', name: 'Aarav Patel' },
  Dispatcher: { email: 'dispatcher@transitops.com', password: '123456', name: 'Jordan Lee' },
  'Safety Officer': { email: 'safety@transitops.com', password: '123456', name: 'Morgan Ellis' },
  'Financial Analyst': { email: 'finance@transitops.com', password: '123456', name: 'Taylor Reed' },
};

export { getAccountByRole, roles };

export const getRedirectPathByRole = () => '/dashboard';
export const getDemoCredentialsByRole = (role) => demoCredentials[role] || null;

export const login = async ({ email, password, rememberMe, role }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const mockToken = `mock-jwt-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  const session = {
    token: mockToken,
    user: {
      id: MOCK_USER_ID,
      fullName: 'Hency Patel',
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

export const register = async (payload) => registerUser(payload);

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
    // Temporary mock auth can leave the legacy session blob empty or invalid.
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
