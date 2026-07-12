import React from 'react';

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
    if (total === 0) return '0%';
    return `${Math.round((count / total) * 100)}%`;
  };

  const statusItems = [
    {
      label: 'Available',
      count: statusCounts.available,
      colorClass: 'bg-green-500',
      bgClass: 'bg-green-100',
      percentage: calculatePercentage(statusCounts.available),
    },
    {
      label: 'On Trip',
      count: statusCounts.onTrip,
      colorClass: 'bg-amber-500',
      bgClass: 'bg-amber-100',
      percentage: calculatePercentage(statusCounts.onTrip),
    },
    {
      label: 'In Shop',
      count: statusCounts.inShop,
      colorClass: 'bg-rose-500',
      bgClass: 'bg-rose-100',
      percentage: calculatePercentage(statusCounts.inShop),
    },
    {
      label: 'Retired',
      count: statusCounts.retired,
      colorClass: 'bg-slate-400',
      bgClass: 'bg-slate-100',
      percentage: calculatePercentage(statusCounts.retired),
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm w-96 flex flex-col justify-between">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
          Vehicle Status
        </h3>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
          {total} Total
        </span>
      </div>

      {/* Progress Bars */}
      <div className="space-y-5 flex-1 flex flex-col justify-center">
        {statusItems.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1.5">
              <span>{item.label}</span>
              <span className="text-slate-500">
                {item.count} ({item.percentage})
              </span>
            </div>
            {/* Outer Track */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
              {/* Progress bar */}
              <div
                className={`h-full ${item.colorClass} rounded-full transition-all duration-500 ease-out`}
                style={{ width: item.percentage }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
