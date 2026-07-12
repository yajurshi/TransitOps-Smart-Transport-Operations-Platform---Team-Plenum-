import { z } from 'zod';
import { roles } from './registerService';

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required.'),
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.').regex(passwordRule, 'Password must contain uppercase, lowercase, number, and special character.'),
  confirmPassword: z.string().min(1, 'Please confirm your password.'),
  phoneNumber: z.string().trim().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits.'),
  role: z.string().min(1, 'Role is required.'),
  terms: z.boolean().refine((value) => value, 'You must accept the Terms & Conditions.'),
}).refine((values) => values.password === values.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match.' });

export const roleOptions = roles;
