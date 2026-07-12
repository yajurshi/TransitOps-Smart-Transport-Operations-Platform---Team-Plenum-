import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  delayIndex?: number;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trend,
  trendType = 'neutral',
  icon,
  delayIndex = 0,
}) => {
  // Count-up state for numbers
  const [displayValue, setDisplayValue] = useState<string | number>(0);

  useEffect(() => {
    // Determine target number if value is numeric or has percentage
    let target = 0;
    let isPercent = false;
    const strVal = String(value);

    if (strVal.endsWith('%')) {
      target = parseFloat(strVal.replace('%', ''));
      isPercent = true;
    } else if (!isNaN(Number(value))) {
      target = Number(value);
    } else {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 1000; // 1 second animation duration
    const stepTime = Math.max(Math.floor(duration / (target || 1)), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(target / 20); // increment steps
      if (start >= target) {
        clearInterval(timer);
        setDisplayValue(isPercent ? `${target}%` : target);
      } else {
        setDisplayValue(isPercent ? `${start}%` : start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const getTrendStyle = () => {
    if (trendType === 'positive') return 'text-emerald-700 bg-emerald-50 border-emerald-100';
    if (trendType === 'negative') return 'text-rose-700 bg-rose-50 border-rose-100';
    return 'text-slate-500 bg-slate-50 border-slate-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delayIndex * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between h-[130px] transition-shadow duration-150 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
          {title}
        </span>
        <div className="p-2 bg-orange-50 rounded-lg text-orange-500 border border-orange-100/50">
          {icon}
        </div>
      </div>

      <div className="flex items-end justify-between mt-auto">
        <div>
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight block font-sans">
            {displayValue}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">
            Operational KPI
          </span>
        </div>
        {trend && (
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border leading-normal uppercase tracking-wider ${getTrendStyle()}`}>
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
};
