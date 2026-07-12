import React from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';

export const FilterSection = ({
  vehicleType,
  setVehicleType,
  status,
  setStatus,
  region,
  setRegion,
  onClearFilters,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-6 flex flex-wrap items-end gap-5 shadow-sm">
      <div className="flex items-center gap-2 text-slate-800 dark:text-white font-semibold text-sm mb-auto py-2">
        <FiFilter className="text-blue-500 w-4 h-4" />
        <span>Filters</span>
      </div>

      {/* Vehicle Type Dropdown */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          Vehicle Type
        </label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        >
          <option value="All">All Vehicle Types</option>
          <option value="Heavy Duty">Heavy Duty</option>
          <option value="Light Truck">Light Truck</option>
          <option value="Van">Van</option>
          <option value="Sedan">Sedan</option>
        </select>
      </div>

      {/* Status Dropdown */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="On Trip">On Trip</option>
          <option value="Completed">Completed</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Region Dropdown */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          Region
        </label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        >
          <option value="All">All Regions</option>
          <option value="North">North Region</option>
          <option value="South">South Region</option>
          <option value="East">East Region</option>
          <option value="West">West Region</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="h-[38px] flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:text-white dark:hover:text-white dark:text-white rounded-lg px-4 text-sm font-semibold transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
      >
        <FiRefreshCw className="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>
    </div>
  );
};
