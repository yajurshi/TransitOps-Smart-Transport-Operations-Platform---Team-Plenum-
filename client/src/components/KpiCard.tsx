import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trend,
  trendType = 'neutral',
  icon,
}) => {
  const getTrendClass = () => {
    if (trendType === 'positive') return 'text-green-600 bg-green-50 border-green-100';
    if (trendType === 'negative') return 'text-red-600 bg-red-50 border-red-100';
    return 'text-slate-500 bg-slate-50 border-slate-100';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-[120px]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 bg-slate-50 rounded-lg text-slate-400 border border-slate-100">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-3">
        <span className="text-2xl font-bold text-slate-800 tracking-tight">
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
