import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FiFilter, FiRefreshCw, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const MaintenanceList = ({ searchQuery = '' }) => {
  const { maintenance, setCurrentView, setSelectedMaintenanceId } = useApp();
  const [statusFilter, setStatusFilter] = useState('All');

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
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Maintenance Schedule
            <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-200 uppercase tracking-widest">
              View Only
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Centralized registry of organization-wide maintenance tasks and vehicle availability logs.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-auto py-2">
          <FiFilter className="text-orange-500 w-4.5 h-4.5" />
          <span className="uppercase tracking-wider text-xs">Filter Maintenance</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Maintenance Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 font-medium focus:outline-none">
            
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
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
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Maintenance ID</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registration</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issue</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Start Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expected Completion</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length > 0 ?
            filtered.map((m) =>
            <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 text-sm">{m.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700 text-sm">{m.vehicleName}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{m.vehicleReg}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-600">{m.issue}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{m.startDate}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{m.expectedCompletion}</td>
                  <td className="px-6 py-4">{getStatusBadge(m.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                  onClick={() => handleViewDetails(m.id)}
                  className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 font-bold text-xs px-2.5 py-1.5 rounded-lg transition-all">
                  
                      <FiEye />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
            ) :

            <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-slate-400 font-medium text-sm">
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