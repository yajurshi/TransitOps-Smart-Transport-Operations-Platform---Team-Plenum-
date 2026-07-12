import { CheckCircle2 } from 'lucide-react';

export const FeatureCard = ({ title }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/15">
    <div className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-emerald-300">
      <CheckCircle2 className="h-4 w-4" />
    </div>
    <p className="text-sm font-semibold text-white">{title}</p>
  </div>
);