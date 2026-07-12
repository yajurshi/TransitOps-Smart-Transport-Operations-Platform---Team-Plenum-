import React from 'react';
import { motion } from 'framer-motion';

interface TripItem {
  id: string;
  route: string;
  vehicle: string;
  vehicleReg: string;
  driver: string;
  status: 'On Trip' | 'Completed' | 'Dispatched' | 'Draft';
  eta: string;
}

interface RecentTripsTableProps {
  trips: TripItem[];
  isLoading?: boolean;
}

export const RecentTripsTable: React.FC<RecentTripsTableProps> = ({ trips, isLoading = false }) => {
  const getStatusBadge = (status: TripItem['status']) => {
    switch (status) {
      case 'On Trip':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            On Trip
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>
        );
      case 'Dispatched':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Dispatched
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
        <div>
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            Live Trip Dispatch
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">Real-time status updates and estimated times of arrival.</p>
        </div>
        <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
          {trips.length} active dispatches
        </span>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Trip ID
              </th>
              <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Vehicle Details
              </th>
              <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Assigned Driver
              </th>
              <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                ETA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              // Loading Shimmer skeleton
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-100 rounded w-16 mb-1" />
                    <div className="h-3 bg-slate-50 rounded w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-100 rounded w-24 mb-1" />
                    <div className="h-3 bg-slate-50 rounded w-16" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-100 rounded w-20" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-slate-100 rounded-full w-20" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="h-4 bg-slate-100 rounded w-12 ml-auto" />
                  </td>
                </tr>
              ))
            ) : trips.length > 0 ? (
              trips.map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-6 py-4.5">
                    <div>
                      <span className="block font-bold text-slate-800 text-sm group-hover:text-orange-500 transition-colors">
                        {trip.id}
                      </span>
                      <span className="block text-xs text-slate-400 font-medium mt-0.5">
                        {trip.route}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <div>
                      <span className="block font-semibold text-slate-700 text-sm">
                        {trip.vehicle}
                      </span>
                      <span className="block text-[10px] font-bold text-slate-400 font-mono tracking-wider mt-0.5 uppercase">
                        {trip.vehicleReg}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <span className="text-sm font-semibold text-slate-700">
                      {trip.driver}
                    </span>
                  </td>
                  <td className="px-6 py-4.5">{getStatusBadge(trip.status)}</td>
                  <td className="px-6 py-4.5 text-right">
                    <span className="text-sm font-bold text-slate-700 font-mono">
                      {trip.eta}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="max-w-[240px] mx-auto text-slate-400">
                    <p className="font-semibold text-sm">No Active Trips Found</p>
                    <p className="text-xs text-slate-400 mt-1">Try relaxing your filter parameters or search query.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
