import React, { createContext, useContext, useState, useCallback } from 'react';

export const NotificationContext = createContext(null);

const ROLE_SEED_NOTIFICATIONS = {
  'Fleet Manager': [
    { title: 'Vehicle GJ-01-AB-1234 Entered Maintenance', description: 'Coolant leak detected. Vehicle sent to shop for radiator replacement.', category: 'Maintenance', read: false },
    { title: 'Fleet Utilization Below Target', description: 'Current utilization is at 62%. Target is 85%. Consider reassigning available vehicles.', category: 'Fleet', read: false },
    { title: 'New Vehicle Registered', description: 'Mahindra Bolero Pickup GJ-11-FG-9900 has been added to the fleet registry.', category: 'Fleet', read: true },
    { title: 'Maintenance Completed for GJ-05-KL-3210', description: 'Radiator and coolant pump repair successfully closed.', category: 'Maintenance', read: true },
    { title: 'Vehicle Registration Expires Soon', description: 'GJ-09-ZA-3344 registration expires in 14 days. Please renew.', category: 'Alert', read: false },
  ],
  'Dispatcher': [
    { title: 'Trip TR-1001 Dispatched', description: 'Tata Ace Gold GJ-01-AB-1234 dispatched from Gandhinagar to Bhavnagar. Driver: Rohan Desai.', category: 'Trip', read: false },
    { title: 'Trip TR-1002 Completed', description: 'Tata Intra V30 GJ-18-CD-9081 completed Ahmedabad → Surat ahead of schedule.', category: 'Trip', read: false },
    { title: 'Driver Jay Patel Unavailable', description: 'Jay Patel is currently suspended and cannot be assigned to trips.', category: 'Alert', read: false },
    { title: 'Cargo Exceeds Vehicle Capacity', description: 'Trip TR-1004: Cargo (14,000 kg) exceeds GJ-05-KL-3210 capacity. Review before dispatch.', category: 'Alert', read: true },
    { title: 'Trip TR-1008 Awaiting Dispatch', description: 'Mehsana → Palanpur trip is in Draft status. Approve or dispatch from the Trips panel.', category: 'Trip', read: true },
  ],
  'Safety Officer': [
    { title: 'Driver License Expires Soon', description: 'Chirag Mehta\'s license expired on 2026-03-01. Immediate review required.', category: 'Compliance', read: false },
    { title: 'Driver Suspended', description: 'Jay Patel has been suspended due to safety score below threshold (65).', category: 'Compliance', read: false },
    { title: 'Safety Score Decreased', description: 'Vishal Shah\'s safety score dropped to 78. Initiate compliance review.', category: 'Safety', read: false },
    { title: 'Compliance Verified', description: 'Nisha Desai passed license and medical certificate verification.', category: 'Compliance', read: true },
    { title: 'New Safety Violation Reported', description: 'Speeding violation logged for trip TR-1007. Review driver safety protocol.', category: 'Safety', read: true },
  ],
  'Financial Analyst': [
    { title: 'Fuel Log Added', description: 'Vehicle GJ-01-AB-1234: 180 L fueled at ₹288.00. Logged on 2026-07-10.', category: 'Fuel', read: false },
    { title: 'High Maintenance Expense Detected', description: 'GJ-05-KL-3210 maintenance costs exceeded ₹1,200 this month. Budget impact analysis recommended.', category: 'Expense', read: false },
    { title: 'Operational Cost Updated', description: 'Monthly fuel expenditures updated. Total: ₹632.00 across 4 vehicles.', category: 'Finance', read: false },
    { title: 'ROI Report Generated', description: 'Vehicle ROI report for Q2 2026 has been generated and is ready for download.', category: 'Report', read: true },
    { title: 'CSV Exported', description: 'Fuel consumption data exported to CSV successfully.', category: 'Export', read: true },
  ],
};

const CATEGORY_COLORS = {
  Maintenance: 'bg-orange-50 text-orange-700 border-orange-200',
  Fleet:       'bg-blue-50 text-blue-700 border-blue-200',
  Alert:       'bg-rose-50 text-rose-700 border-rose-200',
  Trip:        'bg-indigo-50 text-indigo-700 border-indigo-200',
  Compliance:  'bg-purple-50 text-purple-700 border-purple-200',
  Safety:      'bg-amber-50 text-amber-700 border-amber-200',
  Fuel:        'bg-emerald-50 text-emerald-700 border-emerald-200',
  Expense:     'bg-rose-50 text-rose-700 border-rose-200',
  Finance:     'bg-teal-50 text-teal-700 border-teal-200',
  Report:      'bg-slate-50 text-slate-700 border-slate-200',
  Export:      'bg-lime-50 text-lime-700 border-lime-200',
};

export const getCategoryClass = (category) =>
  CATEGORY_COLORS[category] || 'bg-slate-50 text-slate-600 border-slate-200';

let _nextId = 100;
const makeId = () => `notif-${_nextId++}`;

const seedNotifications = (role) => {
  const seeds = ROLE_SEED_NOTIFICATIONS[role] || [];
  return seeds.map((n, i) => ({
    ...n,
    id: `seed-${role.replace(' ', '-')}-${i}`,
    timestamp: new Date(Date.now() - (seeds.length - i) * 3 * 60 * 1000),
  }));
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [roleSeeded, setRoleSeeded] = useState(null);

  const seedForRole = useCallback((role) => {
    if (role && role !== roleSeeded) {
      setNotifications(seedNotifications(role));
      setRoleSeeded(role);
    }
  }, [roleSeeded]);

  const addNotification = useCallback(({ title, description, category, role }) => {
    const newNotif = {
      id: makeId(),
      title,
      description,
      category: category || 'Alert',
      timestamp: new Date(),
      read: false,
      role: role || null,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const markRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markRead,
        markAllRead,
        clearNotification,
        seedForRole,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used inside NotificationProvider');
  return ctx;
};
