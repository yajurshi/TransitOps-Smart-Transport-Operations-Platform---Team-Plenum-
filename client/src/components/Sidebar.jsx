import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiBarChart2, FiGrid, FiLogOut, FiSettings, FiUsers } from 'react-icons/fi';
import { FaRoute, FaTools } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = ({ activeTab = 'Dashboard' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: <FiGrid className="w-5 h-5" />, to: '/dashboard/safety' },
    { name: 'Drivers', icon: <FiUsers className="w-5 h-5" />, to: '/dashboard/safety/drivers' },
    { name: 'Trips', icon: <FaRoute className="w-5 h-5" />, to: '/dashboard/safety/trips' },
    { name: 'Maintenance', icon: <FaTools className="w-5 h-5" />, to: '/dashboard/safety/maintenance' },
    { name: 'Analytics', icon: <FiBarChart2 className="w-5 h-5" />, to: '/dashboard/safety/analytics' },
    { name: 'Settings', icon: <FiSettings className="w-5 h-5" />, to: '/dashboard/safety/settings' },
    { name: 'Profile', icon: <FiUsers className="w-5 h-5" />, to: '/dashboard/safety/profile' },
  ];

  const isRouteActive = (route) => location.pathname === route || location.pathname.startsWith(`${route}/`);

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
          const isActive = item.name === activeTab || isRouteActive(item.to);
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'hover:bg-slate-800 hover:text-slate-100 text-slate-400'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col gap-3">
        <button onClick={() => { logout(); navigate('/login', { replace: true }); }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-all duration-150">
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
        <div className="flex justify-between items-center px-1">
          <span>Version 1.0.0</span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-slate-900" title="System Online" />
        </div>
      </div>
    </div>
  );
};
