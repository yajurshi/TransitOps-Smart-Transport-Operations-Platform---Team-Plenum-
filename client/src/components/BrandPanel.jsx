import { BarChart3, Brain, MapPinned, Truck, Wrench } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const features = [
  ['Fleet Management', Truck],
  ['Smart Dispatch', MapPinned],
  ['Maintenance Tracking', Wrench],
  ['Analytics & Reports', BarChart3],
];

export const BrandPanel = () => (
  <aside className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900 px-6 py-8 text-white sm:px-10 lg:flex lg:w-3/5 lg:flex-col lg:px-12 lg:py-12">
    <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
    <div className="relative mx-auto flex w-full max-w-2xl flex-col lg:h-full">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-2xl shadow-indigo-500/30"><Truck className="h-6 w-6" /></div>
        <div><p className="text-lg font-bold tracking-tight">TransitOps</p><p className="text-xs text-slate-300">Smart Transport Operations Platform</p></div>
      </div>
      <div className="my-10 lg:my-auto">
        <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white dark:bg-slate-800/10 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-5">
              <div className="mb-4 flex items-center justify-between text-xs text-slate-300"><span>Live Fleet Flow</span><span>24/7</span></div>
              <div className="grid gap-3">
                <div className="h-3 rounded-full bg-white dark:bg-slate-800/10"><div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" /></div>
                <div className="h-3 rounded-full bg-white dark:bg-slate-800/10"><div className="h-3 w-2/3 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" /></div>
                <div className="h-3 rounded-full bg-white dark:bg-slate-800/10"><div className="h-3 w-5/6 rounded-full bg-gradient-to-r from-blue-400 to-emerald-300" /></div>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4 text-center"><p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Trips</p><p className="mt-2 text-2xl font-bold">128</p></div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4 text-center"><p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Uptime</p><p className="mt-2 text-2xl font-bold">99.9%</p></div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/35 px-4 py-3">
            <div><p className="text-xs text-slate-400 dark:text-slate-500">Command Center</p><p className="text-sm font-semibold text-white">Dispatch, compliance, and finance in one view</p></div>
            <Brain className="h-7 w-7 text-sky-300" />
          </div>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Connected operations</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">TransitOps</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">Digitize fleet operations, dispatch, maintenance, driver management, fuel tracking, and analytics from one centralized platform.</p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">{features.map(([title]) => <FeatureCard key={title} title={title} />)}</div>
      </div>
      <p className="mt-8 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">TransitOps © 2026</p>
    </div>
  </aside>
);
