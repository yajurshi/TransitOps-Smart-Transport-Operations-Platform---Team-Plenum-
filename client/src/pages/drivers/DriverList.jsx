import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { FiFilter, FiRefreshCw, FiEye, FiEdit2, FiSlash, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const DriverList = ({ searchQuery = '' }) => {
  const { drivers, setCurrentView, setSelectedDriverName, createDriver, suspendDriver, reactivateDriver } = useApp();
  const { role } = useAuth();
  const activeRole = role || 'Fleet Manager';
  const isSafetyOfficer = activeRole === 'Safety Officer';
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Custom Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDriver, setNewDriver] = useState({ name: '', licenseNumber: '' });

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

  const handleViewDetails = (name) => {
    setSelectedDriverName(name);
    setCurrentView('DriverDetails');
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
      <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Driver Registry
            {!isSafetyOfficer ? (
              <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-200 uppercase tracking-widest">
                View Only
              </span>
            ) : (
              <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-widest">
                Full Access
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
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
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-auto py-2">
          <FiFilter className="text-orange-500 w-4.5 h-4.5" />
          <span className="uppercase tracking-wider text-xs">Filter Drivers</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 font-medium focus:outline-none">
            
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="Suspended">Suspended</option>
            <option value="Expired License">Expired License</option>
          </select>
        </div>

        <button
          onClick={() => {setStatusFilter('All');}}
          className="h-[38px] flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg px-4 text-xs font-bold transition-all border border-slate-200">
          
          <FiRefreshCw />
          <span>RESET</span>
        </button>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Driver Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">License Number</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">License Category</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expiry Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safety Score</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length > 0 ?
            filtered.map((driver) =>
            <tr key={driver.name} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700 text-sm">{driver.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{driver.licenseNumber}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500">{driver.licenseCategory}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500">{driver.expiryDate}</td>
                  <td className="px-6 py-4 text-xs">
                    <span className={`font-bold px-2 py-0.5 rounded ${
                driver.safetyScore >= 90 ? 'bg-emerald-50 text-emerald-700' :
                driver.safetyScore >= 80 ? 'bg-amber-50 text-amber-700' :
                'bg-rose-50 text-rose-700'}`
                }>
                      {driver.safetyScore}/100
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(driver.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(driver.name)}
                        className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 font-bold text-xs px-2.5 py-1.5 rounded-lg transition-all">
                        <FiEye />
                        <span>View</span>
                      </button>
                      {isSafetyOfficer && (
                        <>
                          <button onClick={() => handleViewDetails(driver.name)} className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-blue-600 hover:text-blue-800 font-bold text-xs px-2.5 py-1.5 rounded-lg transition-all">
                            <FiEdit2 /> Edit
                          </button>
                          <button onClick={() => suspendDriver(driver.name)} className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-rose-600 hover:text-rose-800 font-bold text-xs px-2.5 py-1.5 rounded-lg transition-all">
                            <FiSlash /> Suspend
                          </button>
                          <button onClick={() => reactivateDriver(driver.name)} className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-emerald-600 hover:text-emerald-800 font-bold text-xs px-2.5 py-1.5 rounded-lg transition-all">
                            <FiCheckCircle /> Reactivate
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
            ) :

            <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-medium text-sm">
                  No drivers found matching filters.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </motion.div>

      {/* Create Driver Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-black text-slate-800">Add New Driver</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 transition">
                <FiSlash className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Driver Full Name</label>
                <input 
                  type="text" 
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full text-sm font-semibold text-slate-700 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">License Number</label>
                <input 
                  type="text" 
                  value={newDriver.licenseNumber}
                  onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                  placeholder="e.g. DL-123456"
                  className="w-full text-sm font-semibold text-slate-700 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-2.5 px-4 rounded-lg transition">
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