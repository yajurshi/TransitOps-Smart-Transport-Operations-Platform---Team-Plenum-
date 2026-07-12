import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FiSearch, FiBell, FiCalendar, FiClock, FiX, FiCheck, FiCheckCircle,
  FiUser, FiLock, FiSun, FiMoon, FiMonitor, FiHelpCircle, FiLogOut,
  FiChevronDown, FiFileText, FiDownload, FiDollarSign, FiBarChart2,
  FiTrendingUp, FiPlus, FiShield, FiSettings,
} from 'react-icons/fi';
import { FaTruck, FaRoute } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useAuth } from '../hooks/useAuth';
import { useNotifications, getCategoryClass } from '../context/NotificationContext';
import { TransitOpsLogoIcon } from './TransitOpsLogo';

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatRelativeTime = (timestamp) => {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

// ─── Notification Panel ─────────────────────────────────────────────────────

const NotificationPanel = ({ onClose }) => {
  const { notifications, unreadCount, markRead, markAllRead, clearNotification } = useNotifications();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full right-0 mt-2 w-96 bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-900/10 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/70">
        <div className="flex items-center gap-2">
          <FiBell className="text-orange-500 w-4 h-4" />
          <span className="font-bold text-slate-800 text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition flex items-center gap-1"
            >
              <FiCheckCircle className="w-3.5 h-3.5" /> Mark all read
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-14 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
              <TransitOpsLogoIcon size={36} title="No notifications" />
            </div>
            <p className="text-sm font-semibold text-slate-500">No new notifications</p>
            <p className="text-xs text-slate-400">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={`relative px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors group ${!notif.read ? 'bg-orange-50/40' : ''
                }`}
            >
              <div className="flex items-start gap-3">
                {/* Unread dot */}
                <div className="mt-1 w-2 h-2 flex-shrink-0">
                  {!notif.read && (
                    <span className="block w-2 h-2 rounded-full bg-orange-500 ring-2 ring-orange-100" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm leading-snug ${!notif.read ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>
                      {notif.title}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); clearNotification(notif.id); }}
                      className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all flex-shrink-0 mt-0.5"
                    >
                      <FiX className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-normal line-clamp-2">{notif.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${getCategoryClass(notif.category)}`}>
                      {notif.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{formatRelativeTime(notif.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

// ─── Appearance Modal ────────────────────────────────────────────────────────

const AppearanceModal = ({ onClose, addNotification, role }) => {
  const [selected, setSelected] = useState(
    () => localStorage.getItem('transitops-theme') || 'light'
  );

  const options = [
    { key: 'light', label: 'Light Mode', icon: <FiSun className="w-5 h-5 text-amber-500" /> },
    { key: 'dark', label: 'Dark Mode', icon: <FiMoon className="w-5 h-5 text-indigo-400" /> },
    { key: 'system', label: 'System Default', icon: <FiMonitor className="w-5 h-5 text-slate-400" /> },
  ];

  const handleSave = () => {
    localStorage.setItem('transitops-theme', selected);
    document.documentElement.setAttribute('data-theme', selected);
    addNotification({ title: 'Theme Changed', description: `Appearance set to ${options.find(o => o.key === selected)?.label}.`, category: 'Alert', role });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-80 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-black text-slate-800">Appearance</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition"><FiX /></button>
        </div>
        <div className="p-5 space-y-3">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelected(opt.key)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all font-semibold text-sm text-left ${selected === opt.key
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              {opt.icon}
              {opt.label}
              {selected === opt.key && <FiCheck className="ml-auto text-orange-500 w-4 h-4" />}
            </button>
          ))}
        </div>
        <div className="px-5 pb-5">
          <button
            onClick={handleSave}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl transition shadow-sm text-sm"
          >
            Save Preference
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Profile Dropdown ────────────────────────────────────────────────────────

const ProfileDropdown = ({ userName, role, onClose, onOpenAppearance }) => {
  const { logout, user } = useAuth();
  const { setCurrentView } = useApp();

  const initials = userName?.split(' ').map((n) => n[0]).join('') || 'U';

  const handleNav = (view) => { setCurrentView(view); onClose(); };

  const items = [
    { icon: <FiSettings className="w-4 h-4" />, label: 'Settings', action: () => handleNav('Settings') },
    { icon: <FiSun className="w-4 h-4" />, label: 'Appearance', action: () => { onClose(); onOpenAppearance(); } },
    { icon: <FiHelpCircle className="w-4 h-4" />, label: 'Help & Support', action: () => handleNav('Settings') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-900/10 z-50 overflow-hidden"
    >
      <div className="px-4 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-sm ring-2 ring-orange-100">
          {initials}
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm leading-tight">{userName}</p>
          <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-orange-200/50">
            {role}
          </span>
        </div>
      </div>
      <div className="py-1">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors font-medium"
          >
            <span className="text-slate-400">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div className="border-t border-slate-100 py-1">
        <button
          onClick={() => { logout(); window.location.href = '/login'; }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-bold"
        >
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </motion.div>
  );
};

// ─── Role Action Button ──────────────────────────────────────────────────────

const RoleActionButton = ({ role, addNotification }) => {
  const { setCurrentView } = useApp();
  const [showAnalystMenu, setShowAnalystMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowAnalystMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (role === 'Fleet Manager') {
    return (
      <button
        onClick={() => setCurrentView('Fleet')}
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
      >
        <FaTruck className="w-3.5 h-3.5" />
        Register Vehicle
      </button>
    );
  }

  if (role === 'Dispatcher') {
    return (
      <button
        onClick={() => setCurrentView('CreateTrip')}
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
      >
        <FaRoute className="w-3.5 h-3.5" />
        Create Trip
      </button>
    );
  }

  if (role === 'Safety Officer') {
    return (
      <button
        onClick={() => setCurrentView('Drivers')}
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
      >
        <FiShield className="w-3.5 h-3.5" />
        Compliance Center
      </button>
    );
  }

  if (role === 'Financial Analyst') {
    const analystActions = [
      { label: 'Generate Report', icon: <FiFileText className="w-3.5 h-3.5" />, action: () => { setCurrentView('Reports'); addNotification({ title: 'Report Generated', description: 'A new financial report has been generated.', category: 'Report', role }); } },
      { label: 'Export CSV', icon: <FiDownload className="w-3.5 h-3.5" />, action: () => { addNotification({ title: 'CSV Exported', description: 'Fleet expense data exported to CSV.', category: 'Export', role }); } },
      { label: 'Export PDF', icon: <FiDownload className="w-3.5 h-3.5" />, action: () => { addNotification({ title: 'PDF Generated', description: 'Financial report PDF has been generated.', category: 'Export', role }); } },
      { label: 'Revenue Summary', icon: <FiTrendingUp className="w-3.5 h-3.5" />, action: () => { setCurrentView('Reports'); } },
      { label: 'Cost Summary', icon: <FiDollarSign className="w-3.5 h-3.5" />, action: () => { setCurrentView('Analytics'); } },
      { label: 'Fuel Report', icon: <FiBarChart2 className="w-3.5 h-3.5" />, action: () => { setCurrentView('FuelExpenses'); } },
      { label: 'ROI Report', icon: <FiBarChart2 className="w-3.5 h-3.5" />, action: () => { setCurrentView('Analytics'); } },
    ];

    return (
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setShowAnalystMenu((p) => !p)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
        >
          <FiFileText className="w-3.5 h-3.5" />
          Generate Report
          <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${showAnalystMenu ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {showAnalystMenu && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-900/10 z-50 overflow-hidden py-1"
            >
              {analystActions.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { item.action(); setShowAnalystMenu(false); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-600 hover:bg-orange-50 hover:text-orange-700 transition-colors font-semibold text-left"
                >
                  <span className="text-slate-400">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Fallback
  return null;
};

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export const Navbar = ({
  userName,
  role,
  onSearchChange,
  searchQuery,
  showSearch = true,
  searchPlaceholder = 'Search trips, vehicles or drivers...',
}) => {
  const { setCurrentView } = useApp();
  const { addNotification, unreadCount, notifications, seedForRole } = useNotifications();

  const [now, setNow] = useState(new Date());
  const [bellShaking, setBellShaking] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const prevUnreadRef = useRef(unreadCount);

  // Seed notifications when role is known
  useEffect(() => { if (role) seedForRole(role); }, [role, seedForRole]);

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Bell shake on new notification
  useEffect(() => {
    if (unreadCount > prevUnreadRef.current) {
      setBellShaking(true);
      const t = setTimeout(() => setBellShaking(false), 600);
      prevUnreadRef.current = unreadCount;
      return () => clearTimeout(t);
    }
    prevUnreadRef.current = unreadCount;
  }, [unreadCount]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifPanel(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const initials = userName?.split(' ').map((n) => n[0]).join('') || 'U';

  return (
    <>
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-20 shadow-sm">
      {/* Search Bar */}
      {showSearch ? (
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">
            <FiSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-150"
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Date, Time & Profile Tools */}
      <div className="flex items-center gap-6">
        {/* Date & Time Widget */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 border-r border-slate-200 dark:border-slate-700 pr-3">
            <FiCalendar className="text-orange-500" />
            <span>{dateStr}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiClock className="text-orange-500" />
            <span className="font-mono">{timeStr}</span>
          </div>
        </div>

        {/* Notifications Button */}
        <button className="relative p-2 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 dark:text-slate-300 dark:hover:text-slate-200 dark:text-slate-300 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
        </button>

      </div>
    </header>

      {/* Appearance Modal */ }
  <AnimatePresence>
    {showAppearance && (
      <AppearanceModal
        onClose={() => setShowAppearance(false)}
        addNotification={addNotification}
        role={role}
      />
    )}
  </AnimatePresence>
    </>
  );
};
