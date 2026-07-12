import { useAuth } from '../hooks/useAuth';

const toneClasses = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  error: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-slate-200 bg-slate-900 text-white',
};

export const ToastStack = () => {
  const { toasts } = useAuth();
  return <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6 sm:w-full">{toasts.map((toast) => <div key={toast.id} role="status" className={`pointer-events-auto rounded-2xl border px-4 py-3 text-sm font-medium shadow-xl transition-all ${toneClasses[toast.type] || toneClasses.info}`}>{toast.message}</div>)}</div>;
};