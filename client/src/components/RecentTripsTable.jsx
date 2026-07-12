import React from 'react';

export const RecentTripsTable = ({ trips }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Trip':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            On Trip
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Completed
          </span>
        );
      case 'Dispatched':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Dispatched
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-50 text-slate-600 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
          Recent Trips
        </h3>
        <span className="text-xs text-slate-400 font-semibold">
          Showing {trips.length} entries
        </span>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Trip
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Vehicle
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Driver
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                ETA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {trips.length > 0 ? (
              trips.map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <span className="block font-semibold text-slate-800 text-sm">
                        {trip.id}
                      </span>
                      <span className="block text-xs text-slate-400 font-medium">
                        {trip.route}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="block font-semibold text-slate-700 text-sm">
                        {trip.vehicle}
                      </span>
                      <span className="block text-[11px] font-bold text-slate-400 font-mono">
                        {trip.vehicleReg}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-700">
                      {trip.driver}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(trip.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-slate-700 font-mono">
                      {trip.eta}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-medium">
                  No trips matched the filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
