import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { FiFilter, FiRefreshCw, FiEye, FiPlus, FiX } from 'react-icons/fi';
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
                  <select required value={newMaintenance.vehicleReg} onChange={e => setNewMaintenance({...newMaintenance, vehicleReg: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500">
                    <option value="" disabled>-- Select a Vehicle --</option>
                    {availableVehicles.map(v => (
                      <option key={v.reg} value={v.reg}>{v.reg} - {v.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Issue Summary</label>
                  <input type="text" required value={newMaintenance.issue} onChange={e => setNewMaintenance({...newMaintenance, issue: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" placeholder="e.g. Brake Pad Replacement" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Description / Symptoms</label>
                  <textarea required value={newMaintenance.description} onChange={e => setNewMaintenance({...newMaintenance, description: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" rows="2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Expected Completion Date</label>
                  <input type="date" required value={newMaintenance.expectedCompletion} onChange={e => setNewMaintenance({...newMaintenance, expectedCompletion: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" />
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
          onClick={() => {setStatusFilter('All');}}
          className="h-[38px] flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg px-4 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700">
          
          <FiRefreshCw />
          <span>RESET</span>
        </button>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Maintenance ID</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Vehicle Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Registration</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Issue</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Start Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Expected Completion</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length > 0 ?
            filtered.map((m) =>
            <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white text-sm">{m.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200 text-sm">{m.vehicleName}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">{m.vehicleReg}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300">{m.issue}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">{m.startDate}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">{m.expectedCompletion}</td>
                  <td className="px-6 py-4">{getStatusBadge(m.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                  onClick={() => handleViewDetails(m.id)}
                  className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:text-white dark:hover:text-white dark:text-white font-bold text-xs px-2.5 py-1.5 rounded-lg transition-all">
                  
                      <FiEye />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
            ) :

            <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium text-sm">
                  No maintenance tasks scheduled.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};