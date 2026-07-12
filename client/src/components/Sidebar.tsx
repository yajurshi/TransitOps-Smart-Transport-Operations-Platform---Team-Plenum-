import React from 'react';
import { FiGrid, FiUsers, FiBarChart2, FiSettings, FiTool } from 'react-icons/fi';
import { FaTruck, FaRoute, FaGasPump } from 'react-icons/fa';

interface SidebarProps {
  activeTab?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab = 'Dashboard' }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <FiGrid className="w-5 h-5" /> },
    { name: 'Fleet', icon: <FaTruck className="w-5 h-5" /> },
    { name: 'Drivers', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'Trips', icon: <FaRoute className="w-5 h-5" /> },
    { name: 'Maintenance', icon: <FiTool className="w-5 h-5" /> },
    { name: 'Fuel & Expenses', icon: <FaGasPump className="w-5 h-5" /> },
    { name: 'Analytics', icon: <FiBarChart2 className="w-5 h-5" /> },
    { name: 'Settings', icon: <FiSettings className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800 z-30">
      {/* Logo Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-900/30">
            T
          </div>
          <div>
            <span className="font-bold text-white text-lg tracking-wide">TransitOps</span>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Operations Platform</p>
          </div>
        </div>
      </div>

      {/* Menu Header */}
      <div className="px-6 pt-6 pb-2">
        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Menu</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = item.name === activeTab;
          return (
            <button
              key={item.name}
              disabled={item.name !== 'Dashboard'} // Hackathon scope: only Dashboard is interactive
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'hover:bg-slate-800 hover:text-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
        <span>Version 1.0.0</span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-slate-900" title="System Online" />
      </div>
    </div>
  );
};
