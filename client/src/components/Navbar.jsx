import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';

export const Navbar = ({
  userName,
  role,
  onSearchChange,
  searchQuery,
  showSearch = true,
  searchPlaceholder = 'Search trips, vehicles or drivers...',
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-20 shadow-sm">
      {/* Search Box */}
      {showSearch ? (
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <FiSearch className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
          />
        </div>
      ) : <div className="flex-1" />}

      {/* Right Side Tools */}
      <div className="flex items-center gap-6">
        {/* Notifications Icon */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* User Profile Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="block text-sm font-semibold text-slate-800 leading-tight">
              {userName}
            </span>
            <span className="inline-block mt-0.5 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100">
              {role}
            </span>
          </div>

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-md ring-2 ring-slate-100 cursor-pointer">
            {userName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
        </div>
      </div>
    </header>
  );
};
