import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { FiFilter, FiRefreshCw, FiEye, FiPlus, FiX, FiCalendar, FiClock, FiSettings } from 'react-icons/fi';
import { FaWrench } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const MaintenanceList = ({ searchQuery = '' }) => {
  const { maintenance, vehicles, setCurrentView, setSelectedMaintenanceId, createMaintenance } = useApp();
  const { role } = useAuth();
  const [statusFilter, setStatusFilter] = useState('All');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    vehicleReg: '',
    issue: '',
    description: '',
    repairNotes: '',
    expectedCompletion: new Date().toISOString().split('T')[0]
  });
  const [createError, setCreateError] = useState('');

  const availableVehicles = useMemo(() => {
    return vehicles.filter(v => v.status === 'Available' && !maintenance.some(m => m.vehicleReg === v.reg && m.status !== 'Completed'));
  }, [vehicles, maintenance]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setCreateError('');
    if (!newMaintenance.vehicleReg) {
      setCreateError('Please select a valid vehicle.');
      return;
    }
    const success = createMaintenance(newMaintenance);
    if (success) {
      setIsCreateOpen(false);
      setNewMaintenance({ vehicleReg: '', issue: '', description: '', repairNotes: '', expectedCompletion: new Date().toISOString().split('T')[0] });
    } else {
      setCreateError('Could not create maintenance log. Ensure the vehicle is available.');
    }
  };

  const filtered = useMemo(() => {
    return maintenance.filter((m) => {
      const matchesSearch = searchQuery === '' ||
        m.vehicleReg.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.issue.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [maintenance, searchQuery, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Scheduled
          </span>);

      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            In Progress
          </span>);

      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>);

      default:
        return null;
    }
  };

  const handleViewDetails = (id) => {
    setSelectedMaintenanceId(id);
    setCurrentView('MaintenanceDetails');
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            Maintenance Schedule
            {role !== 'Fleet Manager' && (
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 uppercase tracking-widest">
                View Only
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            Centralized registry of organization-wide maintenance tasks and vehicle availability logs.
          </p>
        </div>
        {role === 'Fleet Manager' && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <FiPlus className="w-4 h-4" />
            Add Maintenance
          </button>
        )}
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
              <h2 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider">Log New Maintenance</h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 dark:text-slate-300 dark:hover:text-slate-200 dark:text-slate-300">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              {createError && <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-200">{createError}</div>}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Select Available Vehicle</label>
                  <select required value={newMaintenance.vehicleReg} onChange={e => setNewMaintenance({ ...newMaintenance, vehicleReg: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500">
                    <option value="" disabled>-- Select a Vehicle --</option>
                    {availableVehicles.map(v => (
                      <option key={v.reg} value={v.reg}>{v.reg} - {v.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Issue Summary</label>
                  <input type="text" required value={newMaintenance.issue} onChange={e => setNewMaintenance({ ...newMaintenance, issue: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" placeholder="e.g. Brake Pad Replacement" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Description / Symptoms</label>
                  <textarea required value={newMaintenance.description} onChange={e => setNewMaintenance({ ...newMaintenance, description: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" rows="2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Expected Completion Date</label>
                  <input type="date" required value={newMaintenance.expectedCompletion} onChange={e => setNewMaintenance({ ...newMaintenance, expectedCompletion: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={availableVehicles.length === 0} className="px-4 py-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">Save Maintenance Log</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm mb-auto py-2">
          <FiFilter className="text-orange-500 w-4.5 h-4.5" />
          <span className="uppercase tracking-wider text-xs">Filter Maintenance</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
            Maintenance Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 font-medium focus:outline-none">

            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          onClick={() => { setStatusFilter('All'); }}
          className="h-[38px] flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg px-4 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700">

          <FiRefreshCw />
          <span>RESET</span>
        </button>
      </div>

      {/* Upcoming Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg hover:border-orange-300 transition-all cursor-pointer overflow-hidden flex flex-col group p-5 relative"
              onClick={() => handleViewDetails(m.id)}
            >
              <div className="absolute top-4 right-4">
                {getStatusBadge(m.status)}
              </div>

              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 border border-orange-100 group-hover:bg-orange-500 group-hover:text-white transition-colors text-orange-500">
                <FaWrench className="w-6 h-6" />
              </div>

              <h3 className="text-base font-black text-slate-800 leading-tight truncate pr-16">{m.issue}</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1 truncate">{m.vehicleName} ({m.vehicleReg})</p>

              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-left">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1"><FiCalendar /> Started</span>
                  <span className="text-xs font-bold text-slate-700 block mt-0.5">{m.startDate}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1"><FiClock /> Expected</span>
                  <span className="text-xs font-bold text-slate-700 block mt-0.5">{m.expectedCompletion}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{m.id}</span>
                <button className="text-[10px] font-bold text-orange-500 hover:text-orange-600 uppercase tracking-wider flex items-center gap-1">
                  Details <FiEye className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
            <FiSettings className="w-12 h-12 text-slate-200 mb-4 animate-spin-slow" />
            <h3 className="text-lg font-bold text-slate-800">No Maintenance Tasks</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-2">No service records match the current filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};