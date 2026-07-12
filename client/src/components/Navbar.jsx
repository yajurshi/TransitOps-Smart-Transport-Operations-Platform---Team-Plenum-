import React from 'react';
import { FiSearch, FiBell, FiCalendar, FiClock } from 'react-icons/fi';
import { useApp } from '../context/AppContext';

export const Navbar = ({
  userName,
  role,
  onSearchChange,
  searchQuery,
  showSearch = true,
  searchPlaceholder = 'Search trips, vehicles or drivers...',
}) => {
  const { setCurrentView } = useApp();
  const systemDate = 'Sun, Jul 12, 2026';
  const systemTime = '11:29 AM';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-20 shadow-sm">
      {/* Search Bar */}
      {showSearch ? (
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <FiSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-150"
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Date, Time & Profile Tools */}
      <div className="flex items-center gap-6">
        {/* Date & Time Widget */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
            <FiCalendar className="text-orange-500" />
            <span>{systemDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiClock className="text-orange-500" />
            <span className="font-mono">{systemTime}</span>
          </div>
        </div>

        {/* Notifications Button */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 border border-slate-100 transition-all">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* Current User Info (Interactive) */}
        <button
          onClick={() => setCurrentView('Profile')}
          className="flex items-center gap-3 text-left hover:opacity-85 transition-opacity"
        >
          <div className="text-right">
            <span className="block text-sm font-bold text-slate-800 leading-tight">
              {userName}
            </span>
            <span className="inline-block mt-0.5 text-[10px] font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-orange-200/50">
              {role}
            </span>
          </div>

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-md ring-2 ring-orange-100">
            {userName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
        </button>
      </div>
    </header>
  );
};
