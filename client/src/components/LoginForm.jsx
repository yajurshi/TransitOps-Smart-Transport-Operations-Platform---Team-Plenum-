import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from './PasswordInput';
import { Button, Input, Loader } from './ui/FormControls';
import { roleOptions } from '../services/registerSchema';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
  role: z.string().min(1, 'Role is required.')
});

const fieldErrorClass = 'border-red-400 focus:border-red-500 focus:ring-red-100';
const FieldError = ({ message }) => message ? <p className="mt-1.5 text-xs text-red-600">{message}</p> : null;

export const LoginForm = ({ error, onLogin }) => {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', role: '' },
  });

  const emailField = register('email');
  const passwordField = register('password');

  return (
    <form onSubmit={handleSubmit((values) => onLogin(values))} noValidate className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(errors.email)}
          className={errors.email ? fieldErrorClass : ''}
          {...emailField}
        />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
          <span>Password</span>
          <a href="#" className="text-sm font-medium text-orange-600 transition hover:text-orange-700 hover:underline">Forgot password?</a>
        </label>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...passwordField}
        />
      </div>

      <div>
        <label htmlFor="role" className="mb-2 block text-sm font-semibold text-slate-700">Role</label>
        <Controller name="role" control={control} render={({ field }) => (
          <select id="role" aria-invalid={Boolean(errors.role)} className={`w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-orange-100 ${errors.role ? fieldErrorClass : 'border-slate-200 focus:border-orange-500'}`} {...field}>
            <option value="">Select a role</option>
            {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
          </select>
        )} />
        <FieldError message={errors.role?.message} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-600">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
          <span>Remember me </span>
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="h-12 w-full gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-orange-700">
        {isSubmitting && <Loader />}
        {isSubmitting ? 'Signing in…' : 'Sign In'}
      </Button>

      <div className="mt-8 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <a href="/register" className="font-semibold text-orange-600 transition hover:text-orange-700 hover:underline">
          Create an account
        </a>
      </div>
    </form>
  );
};
