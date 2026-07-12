import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { FiFilter, FiRefreshCw, FiEye, FiEdit2, FiSlash, FiCheckCircle, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SideDrawer } from '../../components/SideDrawer';
import { ProgressGauge } from '../../components/ProgressGauge';
import { Timeline } from '../../components/Timeline';

export const DriverList = ({ searchQuery = '' }) => {
  const { drivers, setCurrentView, setSelectedDriverName, createDriver, suspendDriver, reactivateDriver } = useApp();
  const { role } = useAuth();
  const activeRole = role || 'Fleet Manager';
  const isSafetyOfficer = activeRole === 'Safety Officer';
  const [statusFilter, setStatusFilter] = useState('All');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDriver, setNewDriver] = useState({ name: '', licenseNumber: '' });

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDrawerName, setSelectedDrawerName] = useState(null);
  const selectedDriver = useMemo(() => drivers.find(d => d.name === selectedDrawerName), [drivers, selectedDrawerName]);

  const filtered = useMemo(() => {
    return drivers.filter((d) => {
      const matchesSearch = searchQuery === '' ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [drivers, searchQuery, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>);

      case 'On Trip':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            On Trip
          </span>);

      case 'Suspended':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Suspended
          </span>);

      case 'Expired License':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Expired License
          </span>);

      default:
        return null;
    }
  };

  const handleOpenDrawer = (name) => {
    setSelectedDrawerName(name);
    setIsDrawerOpen(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newDriver.name) return;
    createDriver({
      name: newDriver.name,
      licenseNumber: newDriver.licenseNumber || 'DL-PENDING',
      licenseCategory: 'Standard Class',
      expiryDate: '2028-01-01',
    });
    setShowCreateModal(false);
    setNewDriver({ name: '', licenseNumber: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            Driver Registry
            {!isSafetyOfficer ? (
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 uppercase tracking-widest">
                View Only
              </span>
            ) : (
              <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-widest">
                Full Access
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            Centralized registry of organization-wide drivers and safety scorecards.
          </p>
        </div>
        {isSafetyOfficer && (
          <button onClick={() => setShowCreateModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-lg text-sm shadow-sm transition-all whitespace-nowrap">
            + Create Driver
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm mb-auto py-2">
          <FiFilter className="text-orange-500 w-4.5 h-4.5" />
          <span className="uppercase tracking-wider text-xs">Filter Drivers</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 font-medium focus:outline-none">

            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="Suspended">Suspended</option>
            <option value="Expired License">Expired License</option>
          </select>
        </div>

        <button
          onClick={() => { setStatusFilter('All'); }}
          className="h-[38px] flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg px-4 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700">

          <FiRefreshCw />
          <span>RESET</span>
        </button>
      </div>

      {/* Driver Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((driver, idx) => (
            <motion.div
              key={driver.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => handleOpenDrawer(driver.name)}
              className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg hover:border-orange-300 transition-all cursor-pointer overflow-hidden flex flex-col group relative p-6"
            >
              <div className="absolute top-4 right-4">
                {getStatusBadge(driver.status)}
              </div>

              {/* Avatar & Basic Info */}
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-20 h-20 bg-slate-100 rounded-full border-4 border-white shadow-md flex items-center justify-center mb-3">
                  <FiUser className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-black text-slate-800 leading-tight">{driver.name}</h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{driver.licenseCategory} • {driver.licenseNumber}</p>
              </div>

              {/* Safety Score Gauge */}
              <div className="flex justify-center mt-6">
                <ProgressGauge
                  value={driver.safetyScore}
                  size={100}
                  strokeWidth={8}
                  label="Safety"
                  color={driver.safetyScore >= 90 ? 'text-emerald-500' : driver.safetyScore >= 80 ? 'text-amber-500' : 'text-rose-500'}
                />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Trips</span>
                  <span className="text-sm font-black text-slate-700 block">{Math.floor(Math.random() * 100) + 10}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Incidents</span>
                  <span className="text-sm font-black text-slate-700 block">{Math.floor(Math.random() * 3)}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
            <FiUser className="w-12 h-12 text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No Drivers Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-2">No drivers match the current filter criteria.</p>
          </div>
        )}
      </div>

      {/* Side Drawer for Driver Profile */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedDriver?.name}
        subtitle={selectedDriver?.licenseNumber}
        width="max-w-md"
      >
        {selectedDriver && (
          <div className="space-y-6">

            {/* Top Quick Stats */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center">
              <ProgressGauge
                value={selectedDriver.safetyScore}
                size={120}
                strokeWidth={10}
                label="Safety Score"
                color={selectedDriver.safetyScore >= 90 ? 'text-emerald-500' : selectedDriver.safetyScore >= 80 ? 'text-amber-500' : 'text-rose-500'}
              />
              <p className="text-xs text-slate-500 font-medium text-center mt-4">
                {selectedDriver.safetyScore >= 90 ? 'Excellent performance history.' : selectedDriver.safetyScore >= 80 ? 'Good performance. Needs minor improvement.' : 'Critical safety review required.'}
              </p>
            </div>

            {/* General Information */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">Compliance Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Operational Status</span>
                  <div className="mt-1">{getStatusBadge(selectedDriver.status)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">License Category</span>
                  <span className="text-xs font-bold text-slate-700 block mt-1">{selectedDriver.licenseCategory}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">License Expiry</span>
                  <span className="text-xs font-bold text-emerald-600 block mt-1 flex items-center gap-1"><FiCheckCircle /> {selectedDriver.expiryDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Medical Certificate</span>
                  <span className="text-xs font-bold text-emerald-600 block mt-1 flex items-center gap-1"><FiCheckCircle /> Valid</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              <button onClick={() => { setCurrentView('DriverDetails'); setSelectedDriverName(selectedDriver.name); }} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors shadow-md">
                Full Records Mode
              </button>
              {isSafetyOfficer && (
                <button className="w-full bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors">
                  Flag for Safety Review
                </button>
              )}
            </div>

          </div>
        )}
      </SideDrawer>

      {/* Create Driver Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
              <h3 className="font-black text-slate-800 dark:text-white">Add New Driver</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 dark:text-slate-300 transition">
                <FiSlash className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1.5">Driver Full Name</label>
                <input
                  type="text"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full text-sm font-semibold text-slate-700 dark:text-slate-200 p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1.5">License Number</label>
                <input
                  type="text"
                  value={newDriver.licenseNumber}
                  onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                  placeholder="e.g. DL-123456"
                  className="w-full text-sm font-semibold text-slate-700 dark:text-slate-200 p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold py-2.5 px-4 rounded-lg transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition">
                  Create Driver
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};