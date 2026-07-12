import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { PasswordInput } from './PasswordInput';
import { Button, Input, Loader } from './ui/FormControls';
import { registerSchema, roleOptions } from '../services/registerSchema';

const fieldErrorClass = 'border-red-400 focus:border-red-500 focus:ring-red-100';

const FieldError = ({ message }) => message ? <p className="mt-1.5 text-xs text-red-600">{message}</p> : null;

export const RegisterForm = ({ onRegister }) => {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '', phoneNumber: '', role: '', terms: false },
  });

  const fullNameField = register('fullName');
  const emailField = register('email');
  const passwordField = register('password');
  const confirmPasswordField = register('confirmPassword');
  const phoneNumberField = register('phoneNumber');
  return <form onSubmit={handleSubmit((values) => onRegister(values))} noValidate className="space-y-5">
    <div><label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label><Input id="fullName" type="text" autoComplete="name" placeholder="Enter your full name" aria-invalid={Boolean(errors.fullName)} className={errors.fullName ? fieldErrorClass : ''} {...fullNameField} /><FieldError message={errors.fullName?.message} /></div>
    <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label><Input id="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={Boolean(errors.email)} className={errors.email ? fieldErrorClass : ''} {...emailField} /><FieldError message={errors.email?.message} /></div>
    <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label><PasswordInput id="password" autoComplete="new-password" placeholder="Create a password" error={errors.password?.message} {...passwordField} /></div><div><label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</label><PasswordInput id="confirmPassword" autoComplete="new-password" placeholder="Confirm your password" error={errors.confirmPassword?.message} {...confirmPasswordField} /></div></div>
    <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="phoneNumber" className="mb-2 block text-sm font-semibold text-slate-700">Phone Number</label><Input id="phoneNumber" type="tel" inputMode="numeric" maxLength={10} placeholder="10 digit phone number" aria-invalid={Boolean(errors.phoneNumber)} className={errors.phoneNumber ? fieldErrorClass : ''} {...phoneNumberField} /><FieldError message={errors.phoneNumber?.message} /></div><div><label htmlFor="role" className="mb-2 block text-sm font-semibold text-slate-700">Role</label><Controller name="role" control={control} render={({ field }) => <select id="role" aria-invalid={Boolean(errors.role)} className={`w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-amber-100 ${errors.role ? fieldErrorClass : 'border-slate-200 focus:border-amber-500'}`} {...field}><option value="">Select a role</option>{roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}</select>} /><FieldError message={errors.role?.message} /></div></div>
    <div><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-600"><Controller name="terms" control={control} render={({ field }) => <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500" aria-invalid={Boolean(errors.terms)} checked={field.value} onChange={(event) => field.onChange(event.target.checked)} onBlur={field.onBlur} ref={field.ref} />} /><span>I agree to the Terms &amp; Conditions.</span></label><FieldError message={errors.terms?.message} /></div>
    <Button type="submit" disabled={isSubmitting} className="h-12 w-full gap-2 bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-orange-600">{isSubmitting && <Loader />}{isSubmitting ? 'Creating account…' : 'Create Account'}</Button>
  </form>;
};
