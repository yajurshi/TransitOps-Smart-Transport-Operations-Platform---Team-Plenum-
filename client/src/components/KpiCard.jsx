import React from 'react';

export const KpiCard = ({
  title,
  value,
  trend,
  trendType = 'neutral',
  icon,
}) => {
  const getTrendClass = () => {
    if (trendType === 'positive') return 'text-green-600 bg-green-50 border-green-100';
    if (trendType === 'negative') return 'text-red-600 bg-red-50 border-red-100';
    return 'text-slate-500 dark:text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800';
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-[120px]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-3">
        <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          {value}
        </span>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTrendClass()}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
