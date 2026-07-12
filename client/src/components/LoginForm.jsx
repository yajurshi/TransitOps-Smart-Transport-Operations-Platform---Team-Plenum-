import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { roles } from '../services/authService';
import { PasswordInput } from './PasswordInput';
import { Alert, Button, Input, Loader } from './ui/FormControls';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.'),
  password: z.string().trim().min(1, 'Password is required.').min(8, 'Password must be at least 8 characters.'),
  role: z.string().min(1, 'Role is required.'),
  rememberMe: z.boolean().optional(),
});

const FieldError = ({ message }) => message ? <p className="mt-1.5 text-xs text-red-600">{message}</p> : null;

export const LoginForm = ({ onLogin, error }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '', role: '', rememberMe: true } });
  const [emailField, passwordField, roleField, rememberField] = [register('email'), register('password'), register('role'), register('rememberMe')];

  return <form onSubmit={handleSubmit(onLogin)} noValidate className="space-y-5">
    {error && <Alert>{error}</Alert>}
    <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label><div className="relative"><Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" /><Input id="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={Boolean(errors.email)} className={`pl-10 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`} {...emailField} /></div><FieldError message={errors.email?.message} /></div>
    <div><label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label><PasswordInput id="password" placeholder="Enter your password" error={errors.password?.message} autoComplete="current-password" {...passwordField} /></div>
    <div><label htmlFor="role" className="mb-2 block text-sm font-semibold text-slate-700">Select Role</label><div className="relative"><Shield className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" /><select id="role" aria-invalid={Boolean(errors.role)} className={`w-full rounded-2xl border bg-white py-3 pl-10 pr-3.5 text-sm text-slate-800 outline-none transition duration-300 focus:scale-[1.01] focus:ring-4 focus:ring-orange-100/70 ${errors.role ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-orange-500'}`} {...roleField}><option value="">Select Role</option>{roles.map((role) => <option key={role} value={role}>{role}</option>)}</select></div><FieldError message={errors.role?.message} /></div>
    <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" {...rememberField} />Remember Me</label>
    <div className="flex items-center justify-between gap-3"><button type="button" className="text-sm font-semibold text-orange-600 transition hover:text-orange-700 hover:underline">Forgot Password?</button><span className="text-xs text-slate-400">Press Enter to login</span></div>
    <Button type="submit" disabled={isSubmitting} className="h-12 w-full gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700">{isSubmitting && <Loader />}{isSubmitting ? 'Logging in…' : 'Login'}</Button>
    <div className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-xs text-orange-700">
      <strong className="font-semibold">Development Mode:</strong> Authentication is temporarily mocked until backend integration.
    </div>
    <p className="pt-2 text-center text-xs text-slate-500">Don't have an account? <a href="/register" className="font-medium text-orange-600 transition hover:underline">Create Account</a></p>
  </form>;
};
