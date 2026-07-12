import { ShieldCheck, Truck, Route, WalletCards } from 'lucide-react';

const icons = { 'Fleet Manager': Truck, Dispatcher: Route, 'Safety Officer': ShieldCheck, 'Financial Analyst': WalletCards };

export const RoleCard = ({ role, description }) => {
  const Icon = icons[role] || Truck;

  return (
    <article className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm transition hover:bg-white/15">
      <Icon className="mb-2 h-4 w-4 text-amber-300" aria-hidden="true" />
      <h3 className="text-sm font-semibold text-white">{role}</h3>
      <p className="mt-1 text-xs leading-5 text-slate-300">{description}</p>
    </article>
  );
};
