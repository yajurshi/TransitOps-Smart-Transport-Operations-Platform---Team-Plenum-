import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { FiArrowLeft, FiTool, FiEdit2, FiCheckCircle, FiX } from 'react-icons/fi';

export const MaintenanceDetails = () => {
  const { selectedMaintenanceId, maintenance, setCurrentView, vehicles, editMaintenance, closeMaintenance } = useApp();
  const { role } = useAuth();

  const record = maintenance.find((m) => m.id === selectedMaintenanceId);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCloseOpen, setIsCloseOpen] = useState(false);
  const [editData, setEditData] = useState(record ? { ...record } : null);

  if (!record) {
    return (
      <div className="p-8 text-center">
        <p>Maintenance record not found.</p>
        <button onClick={() => setCurrentView('Maintenance')} className="mt-4 text-orange-500 font-bold">
          Back to Maintenance List
        </button>
      </div>
    );
  }

  const matchingVehicle = vehicles.find((v) => v.reg === record.vehicleReg);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editMaintenance(record.id, editData);
    setIsEditOpen(false);
  };

  const handleCloseMaintenance = () => {
    closeMaintenance(record.id);
    setIsCloseOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center w-full border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('Maintenance')}
            className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:text-white dark:hover:text-white dark:text-white transition-all shadow-sm">
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
                Task ID: {record.id}
              </span>
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{record.status}</span>
            </div>
            <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mt-0.5">{record.issue}</h1>
          </div>
        </div>

        {role === 'Fleet Manager' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setEditData({...record}); setIsEditOpen(true); }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:text-white dark:hover:text-white dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
            >
              <FiEdit2 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => setIsCloseOpen(true)}
              disabled={record.status === 'Completed'}
              className="bg-emerald-50 border border-emerald-200 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCheckCircle className="w-4 h-4" /> Close Task
            </button>
          </div>
        )}
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
              <h2 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider">Edit Maintenance Task</h2>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 dark:text-slate-300 dark:hover:text-slate-200 dark:text-slate-300">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Issue Summary</label>
                  <input type="text" required value={editData.issue} onChange={e => setEditData({...editData, issue: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Description / Symptoms</label>
                  <textarea required value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" rows="2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Repair Notes (Technician)</label>
                  <textarea value={editData.repairNotes} onChange={e => setEditData({...editData, repairNotes: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" rows="2" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Expected Completion</label>
                  <input type="date" required value={editData.expectedCompletion} onChange={e => setEditData({...editData, expectedCompletion: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Status</label>
                  <select value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" disabled={record.status === 'Completed'}>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed" disabled>Completed</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-md transition-all active:scale-95">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCloseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="font-black text-slate-800 dark:text-white text-lg mb-2">Close Task?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mb-6">
              Are you sure you want to mark this maintenance task as completed? The vehicle will become available for dispatch again.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setIsCloseOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleCloseMaintenance} className="px-4 py-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-md transition-all active:scale-95">Yes, Close Task</button>
            </div>
          </div>
        </div>
      )}

          {/* Details Card */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <FiTool className="text-orange-500 w-5 h-5" />
              <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Repair Specifications</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Target Vehicle</span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{record.vehicleName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Registration Number</span>
                <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200 block mt-1">{record.vehicleReg}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Start Date</span>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 block mt-1">{record.startDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Estimated Completion</span>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 block mt-1">{record.expectedCompletion}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Problem Description</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1 leading-relaxed">{record.description}</p>
              </div>

              {record.repairNotes &&
              <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Repair Notes (Technician)</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1 leading-relaxed">{record.repairNotes}</p>
                </div>
              }

              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Vehicle Availability Status</span>
                <div className="mt-2">
                  {matchingVehicle && matchingVehicle.status === 'In Shop' ?
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      In Shop (Temporarily Unavailable for Dispatch)
                    </span> :

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Operational (Available / Active)
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};