import { createContext } from 'react';

export const NotificationContext = createContext(null);

export const CATEGORY_COLORS = {
  Maintenance: 'bg-orange-50 text-orange-700 border-orange-200',
  Fleet:       'bg-blue-50 text-blue-700 border-blue-200',
  Alert:       'bg-rose-50 text-rose-700 border-rose-200',
  Trip:        'bg-indigo-50 text-indigo-700 border-indigo-200',
  Compliance:  'bg-purple-50 text-purple-700 border-purple-200',
  Safety:      'bg-amber-50 text-amber-700 border-amber-200',
  Fuel:        'bg-emerald-50 text-emerald-700 border-emerald-200',
  Expense:     'bg-rose-50 text-rose-700 border-rose-200',
  Finance:     'bg-teal-50 text-teal-700 border-teal-200',
  Report:      'bg-slate-50 text-slate-700 border-slate-200',
  Export:      'bg-lime-50 text-lime-700 border-lime-200',
};

export const getCategoryClass = (category) =>
  CATEGORY_COLORS[category] || 'bg-slate-50 text-slate-600 border-slate-200';
