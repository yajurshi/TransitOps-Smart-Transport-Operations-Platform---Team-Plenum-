import React from 'react';
import { FiGrid, FiUsers, FiBarChart2, FiSettings, FiTool, FiLogOut } from 'react-icons/fi';
import { FaTruck, FaRoute, FaGasPump } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useAuth } from '../hooks/useAuth';
import { hasAccess } from '../utils/rbac';

export const Sidebar = ({ activeTab = 'Dashboard', role: propRole }) => {
  const { setCurrentView, setSelectedVehicleReg, setSelectedDriverName, setSelectedTripId, setSelectedMaintenanceId } = useApp();
  const { logout, role: authRole } = useAuth();

  const role = propRole || authRole;

  // Define all possible modules with their viewKeys and icons
  const allModules = [
    { name: 'Dashboard', icon: <FiGrid className="w-5 h-5" />, viewKey: 'DashboardOverview' },
    { name: 'Fleet', icon: <FaTruck className="w-5 h-5" />, viewKey: 'Fleet' },
    { name: 'Drivers', icon: <FiUsers className="w-5 h-5" />, viewKey: 'Drivers' },
    { name: 'Trips', icon: <FaRoute className="w-5 h-5" />, viewKey: 'Trips' },
    { name: 'Maintenance', icon: <FiTool className="w-5 h-5" />, viewKey: 'Maintenance' },
    { name: 'Fuel & Expenses', icon: <FaGasPump className="w-5 h-5" />, viewKey: 'Fuel' },
    { name: 'Analytics', icon: <FiBarChart2 className="w-5 h-5" />, viewKey: 'Analytics' },
    { name: 'Profile', icon: <FiUsers className="w-5 h-5" />, viewKey: 'Profile' },
    { name: 'Settings', icon: <FiSettings className="w-5 h-5" />, viewKey: 'Settings' }
  ];

  // Filter menu items based on RBAC matrix
  const menuItems = allModules.filter(module => hasAccess(role, module.viewKey));

  const handleNavigate = (item) => {
    // Some tabs like Fuel & Expenses map to FuelExpenses in the router
    const viewMap = {
      'Dashboard': 'Dashboard',
      'Fleet': 'Fleet',
      'Drivers': 'Drivers',
      'Trips': 'Trips',
      'Maintenance': 'Maintenance',
      'Fuel & Expenses': 'FuelExpenses',
      'Analytics': 'Analytics',
      'Profile': 'Profile',
      'Settings': 'Settings'
    };

    const view = viewMap[item.name];
    if (view) {
      setSelectedVehicleReg(null);
      setSelectedDriverName(null);
      setSelectedTripId(null);
      setSelectedMaintenanceId(null);
      setCurrentView(view);
    }
  };

  const handleLogout = () => {
    logout();
    // Re-route to login handled by context or router
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-white text-slate-700 h-screen fixed left-0 top-0 flex flex-col border-r border-slate-200 z-30 shadow-sm">
      {/* Premium Logo Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/20">
            T
          </div>
          <div>
            <span className="font-bold text-slate-800 text-lg tracking-wide">TransitOps</span>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Operations Platform</p>
          </div>
        </div>
      </div>

      {/* Menu Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Menu</span>
        <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{role}</span>
      </div>

      {/* Navigation Links with Framer Motion active animations */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = item.name === activeTab;
          return (
            <button
              key={item.name}
              onClick={() => handleNavigate(item)}
              className={`w-full relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                isActive ? 'text-orange-600' : 'hover:bg-slate-50 hover:text-slate-900 text-slate-500'
              }`}
            >
              {/* Active Background Animation */}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-orange-50 border-r-4 border-orange-500 rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`transition-transform duration-200 ${isActive ? 'scale-110 text-orange-500' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info & Logout */}
      <div className="p-4 border-t border-slate-100 text-[11px] text-slate-400 flex flex-col gap-2 bg-slate-50/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all duration-150"
        >
          <FiLogOut className="w-4 h-4 text-orange-500" />
          <span>LOG OUT</span>
        </button>
        <div className="flex justify-between items-center px-1 pt-1 border-t border-slate-200/50">
          <span className="font-medium">Version 2.0.0</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-emerald-600 uppercase tracking-wider text-[9px]">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};
