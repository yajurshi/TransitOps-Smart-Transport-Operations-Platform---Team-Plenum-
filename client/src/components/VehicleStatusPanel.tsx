import React from 'react';
import { motion } from 'framer-motion';

interface VehicleStatusCount {
  available: number;
  onTrip: number;
  inShop: number;
  retired: number;
}

interface VehicleStatusPanelProps {
  statusCounts: VehicleStatusCount;
}

export const VehicleStatusPanel: React.FC<VehicleStatusPanelProps> = ({
  statusCounts,
}) => {
  const total =
    statusCounts.available +
    statusCounts.onTrip +
    statusCounts.inShop +
    statusCounts.retired;

  const calculatePercentage = (count: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const statusItems = [
    {
      label: 'Available',
      count: statusCounts.available,
      colorClass: 'bg-emerald-500',
      textClass: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      percentage: calculatePercentage(statusCounts.available),
    },
    {
      label: 'On Trip',
      count: statusCounts.onTrip,
      colorClass: 'bg-blue-500',
      textClass: 'text-blue-700 bg-blue-50 border-blue-100',
      percentage: calculatePercentage(statusCounts.onTrip),
    },
    {
      label: 'In Shop (Maintenance)',
      count: statusCounts.inShop,
      colorClass: 'bg-orange-500',
      textClass: 'text-orange-700 bg-orange-50 border-orange-100',
      percentage: calculatePercentage(statusCounts.inShop),
    },
    {
      label: 'Retired',
      count: statusCounts.retired,
      colorClass: 'bg-slate-400',
      textClass: 'text-slate-700 bg-slate-50 border-slate-200',
      percentage: calculatePercentage(statusCounts.retired),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm w-96 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            Fleet Distribution
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">Breakdown of operational resource status.</p>
        </div>
        <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 uppercase tracking-wider">
          {total} Vehicles
        </span>
      </div>

      {/* Progress Bars with Framer Motion Animation */}
      <div className="space-y-5 flex-1 flex flex-col justify-center">
        {statusItems.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
              <span className="uppercase tracking-wider text-[10px]">{item.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.textClass}`}>
                {item.count} ({item.percentage}%)
              </span>
            </div>
            {/* Outer Track */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50">
              {/* Animated Progress bar */}
              <motion.div
                className={`h-full ${item.colorClass} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
