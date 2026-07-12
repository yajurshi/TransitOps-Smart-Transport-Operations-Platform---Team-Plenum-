import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Input } from './ui/FormControls';

export const PasswordInput = forwardRef(function PasswordInput({ error, autoComplete = 'current-password', ...props }, ref) {
  const [visible, setVisible] = useState(false);
  return <div><div className="relative"><Input ref={ref} type={visible ? 'text' : 'password'} autoComplete={autoComplete} aria-invalid={Boolean(error)} className={error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''} {...props} /><button type="button" onClick={() => setVisible(!visible)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500" aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>{error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}</div>;
});
