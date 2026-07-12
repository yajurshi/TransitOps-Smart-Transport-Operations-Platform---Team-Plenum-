import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/RegisterForm';
import { Alert, Card } from '../../components/ui/FormControls';
import { useAuth } from '../../hooks/useAuth';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let redirectTimer = null;
    if (success) {
      redirectTimer = window.setTimeout(() => navigate('/login', { replace: true }), 1400);
    }
    return () => { if (redirectTimer) window.clearTimeout(redirectTimer); };
  }, [navigate, success]);

  const submitRegister = async (values) => {
    setError('');
    setSuccess('');
    try {
      await register(values);
      setSuccess('Account created successfully.');
    } catch (registerError) {
      setError(registerError.message || 'Account already exists.');
    }
  };

  return <main className="relative min-h-screen overflow-hidden bg-[#F8FAFC] text-slate-900"><style>{`@keyframes transitopsFadeIn{0%{opacity:0;transform:translateY(18px) scale(.985)}100%{opacity:1;transform:translateY(0) scale(1)}}@keyframes transitopsFloat{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-14px) translateX(8px)}}@keyframes transitopsDrift{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(60px,-30px,0)}}@keyframes transitopsPulse{0%,100%{opacity:.10;transform:scale(1)}50%{opacity:.18;transform:scale(1.08)}}`}</style><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.10),_transparent_26%),radial-gradient(circle_at_80%_18%,_rgba(248,250,252,0.95),_transparent_30%),linear-gradient(135deg,_#F8FAFC_0%,_#F1F5F9_45%,_#FFFFFF_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(rgba(226,232,240,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(226,232,240,0.8)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" /><div className="pointer-events-none absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.10) 1px, transparent 1px)', backgroundSize: '28px 28px', animation: 'transitopsDrift 34s linear infinite' }} /><div className="absolute left-10 top-16 h-28 w-28 rounded-full bg-orange-100/60 blur-3xl" style={{ animation: 'transitopsPulse 8s ease-in-out infinite' }} /><div className="absolute right-12 top-1/3 h-36 w-36 rounded-full bg-slate-200/60 blur-3xl" style={{ animation: 'transitopsPulse 10s ease-in-out infinite' }} /><div className="absolute bottom-10 left-1/4 h-24 w-24 rounded-full border border-slate-200 bg-white/40 backdrop-blur-sm" style={{ animation: 'transitopsFloat 12s ease-in-out infinite' }} /><div className="absolute right-1/4 top-16 h-12 w-12 rounded-full border border-orange-200 bg-orange-50/70" style={{ animation: 'transitopsFloat 14s ease-in-out infinite' }} /><div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6"><div className="w-full max-w-[500px] animate-[transitopsFadeIn_0.7s_ease-out]"><Card className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.10)] sm:p-8"><div className="mb-8 text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20"><span className="text-sm font-black tracking-tight text-white">T</span></div><p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-600">TransitOps</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Smart Transport Operations Platform</p><p className="mt-1 text-sm font-medium text-slate-500">Fleet Operations Management</p><h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-800">Create Account</h1><p className="mt-2 text-sm leading-6 text-slate-500">Register your TransitOps access.</p></div>{error && <div className="mb-5"><Alert>{error}</Alert></div>}{success && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm font-medium text-emerald-700">{success}</div>}<RegisterForm onRegister={submitRegister} /><div className="mt-6 text-center text-xs text-slate-500"><p className="mb-2 text-sm font-medium text-slate-500">🔒 Your credentials are securely encrypted.</p><p className="mb-3 text-sm text-slate-500">Already registered? <Link to="/login" className="font-medium text-orange-600 transition hover:underline">Sign In</Link></p><div className="flex flex-wrap items-center justify-center gap-3"><span>TransitOps © 2026</span><span className="text-slate-300">|</span><a href="#" className="transition hover:text-slate-700">Privacy Policy</a><span className="text-slate-300">|</span><a href="#" className="transition hover:text-slate-700">Terms</a><span className="text-slate-300">|</span><a href="#" className="transition hover:text-slate-700">Support</a></div></div></Card></div></div></main>;
};