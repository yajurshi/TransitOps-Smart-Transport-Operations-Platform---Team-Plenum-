import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/RegisterForm';
import { Alert } from '../../components/ui/FormControls';
import { useAuth } from '../../hooks/useAuth';
import { TransitOpsLogo } from '../../components/TransitOpsLogo';




/* ── Page ───────────────────────────────────────────────────────────── */
export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let t = null;
    if (success) t = window.setTimeout(() => navigate('/login', { replace: true }), 1400);
    return () => { if (t) window.clearTimeout(t); };
  }, [navigate, success]);

  const submitRegister = async (values) => {
    setError('');
    setSuccess('');
    try {
      await register(values);
      setSuccess('Account created successfully.');
    } catch (e) {
      setError(e.message || 'Account already exists.');
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-900 bg-[#f8fafc]">
      <style>{`
        @keyframes toFadeIn  { 0%   { opacity:0; transform: translateY(24px) scale(.97) } 100% { opacity:1; transform: translateY(0) scale(1) } }
        @keyframes toDrift   { 0%   { transform: translate3d(0,0,0) } 100% { transform: translate3d(40px,-20px,0) } }
        @keyframes orbit1    { 0%   { transform: rotate(0deg) translateX(80px) rotate(0deg) } 100% { transform: rotate(360deg) translateX(80px) rotate(-360deg) } }
        @keyframes orbit2    { 0%   { transform: rotate(0deg) translateX(-100px) rotate(0deg) } 100% { transform: rotate(-360deg) translateX(-100px) rotate(360deg) } }
        @keyframes orbit3    { 0%   { transform: rotate(0deg) translateY(60px) rotate(0deg) } 100% { transform: rotate(360deg) translateY(60px) rotate(-360deg) } }
        .auth-card-enter { animation: toFadeIn 0.65s cubic-bezier(.22,.68,0,1.2) both; }
        .btn-auth { transition: all 0.2s cubic-bezier(.4,0,.2,1); }
        .btn-auth:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(249,115,22,0.35); }
        .btn-auth:active { transform: translateY(0); }
      `}</style>

      {/* Noise Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\"%3E%3C/rect%3E%3C/svg%3E")' }} />

      {/* Vibrant Animated Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-500/30 to-blue-300/10 blur-[100px]" style={{ animation: 'orbit1 25s linear infinite' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-orange-500/25 to-orange-300/10 blur-[120px]" style={{ animation: 'orbit2 30s linear infinite' }} />
        <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-sky-400/20 to-purple-400/10 blur-[90px]" style={{ animation: 'orbit3 20s linear infinite' }} />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />


      {/* Dot drift */}
      <div className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.15) 1.5px, transparent 1.5px)', backgroundSize: '40px 40px', animation: 'toDrift 30s linear infinite' }} />

      {/* Center layout */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-[460px] auth-card-enter">

          {/* Logo — big, centered, no text */}
          <div className="mb-6 flex justify-center">
            <TransitOpsLogo size={100} showText={false} />
          </div>

          {/* Glass card */}
          <div className="rounded-[24px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-[0_32px_80px_rgba(37,99,235,0.12),0_8px_24px_rgba(0,0,0,0.06)] p-8">

            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-100 px-4 py-1.5 mb-4">
                <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                <span className="text-xs font-bold text-orange-700 tracking-wide">Create Your Account</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Get Started</h2>
              <p className="mt-1 text-sm text-slate-500">Register your TransitOps operator account.</p>
            </div>

            {error && <div className="mb-5"><Alert>{error}</Alert></div>}
            {success && (
              <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 flex items-center gap-2 text-sm font-medium text-emerald-700">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {success}
              </div>
            )}

            <RegisterForm onRegister={submitRegister} />
          </div>

          {/* Footer */}
          <div className="mt-6 text-center space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span>256-bit SSL encryption · SOC 2 compliant</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              <span>TransitOps © 2026</span>
              <span className="text-slate-300">·</span>
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
              <span className="text-slate-300">·</span>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
              <span className="text-slate-300">·</span>
              <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};