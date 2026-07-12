const STORAGE_KEY = 'transitops_users';

export const roles = ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'];

const defaultUsers = [
  { id: 'seed-fleet-manager', fullName: 'Alex Mercer', email: 'fleet@transitops.com', phoneNumber: '5551234001', role: 'Fleet Manager', password: '123456', createdAt: '2026-07-12T00:00:00.000Z' },
  { id: 'seed-dispatcher', fullName: 'Jordan Lee', email: 'dispatcher@transitops.com', phoneNumber: '5551234002', role: 'Dispatcher', password: '123456', createdAt: '2026-07-12T00:00:00.000Z' },
  { id: 'seed-safety-officer', fullName: 'Morgan Ellis', email: 'safety@transitops.com', phoneNumber: '5551234003', role: 'Safety Officer', password: '123456', createdAt: '2026-07-12T00:00:00.000Z' },
  { id: 'seed-financial-analyst', fullName: 'Taylor Reed', email: 'finance@transitops.com', phoneNumber: '5551234004', role: 'Financial Analyst', password: '123456', createdAt: '2026-07-12T00:00:00.000Z' },
];

const normalizeEmail = (value) => value.trim().toLowerCase();

const readStoredUsers = () => {
  try {
    const rawUsers = localStorage.getItem(STORAGE_KEY);
    const parsedUsers = rawUsers ? JSON.parse(rawUsers) : null;
    return Array.isArray(parsedUsers) ? parsedUsers : null;
  } catch {
    return null;
  }
};

const writeStoredUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const getAllUsers = () => {
  const storedUsers = readStoredUsers();
  if (!storedUsers?.length) {
    writeStoredUsers(defaultUsers);
    return defaultUsers;
  }

  const migratedUsers = storedUsers.map((user) => (
    defaultUsers.some((account) => account.email === user.email)
      ? { ...user, password: '123456' }
      : user
  ));

  writeStoredUsers(migratedUsers);
  return migratedUsers;
};

export const getAccountByRole = (role) => defaultUsers.find((account) => account.role === role);

export const registerUser = ({ fullName, email, phoneNumber, role, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const users = getAllUsers();

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error('Account already exists.');
  }

  const user = {
    id: globalThis.crypto?.randomUUID?.() ?? `user-${Date.now()}`,
    fullName: fullName.trim(),
    email: normalizedEmail,
    phoneNumber: phoneNumber.trim(),
    role,
    password,
    createdAt: new Date().toISOString(),
  };

  const nextUsers = [...users, user];
  writeStoredUsers(nextUsers);
  return user;
};
