export const Card = ({ className = '', children }) => (
  <section className={`rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${className}`}>{children}</section>
);

import { forwardRef } from 'react';

export const Button = ({ className = '', children, ...props }) => (
  <button className={`inline-flex items-center justify-center rounded-xl font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${className}`} {...props}>
    {children}
  </button>
);

export const Input = forwardRef(function Input({ className = '', ...props }, ref) {
  return <input ref={ref} className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-3 text-sm text-slate-800 dark:text-white outline-none transition duration-300 placeholder:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${className}`} {...props} />;
});

export const Separator = () => <div className="h-px flex-1 bg-slate-200" />;

export const Alert = ({ children }) => (
  <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-medium text-red-700">{children}</div>
);

export const Loader = () => <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" aria-label="Signing in" />;
