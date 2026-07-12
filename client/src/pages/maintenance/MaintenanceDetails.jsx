import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FiArrowLeft, FiTool } from 'react-icons/fi';

export const MaintenanceDetails = () => {
  const { selectedMaintenanceId, maintenance, setCurrentView, vehicles } = useApp();

  const record = maintenance.find((m) => m.id === selectedMaintenanceId);

  if (!record) {
    return (
      <div className="p-8 text-center">
        <p>Maintenance record not found.</p>
        <button onClick={() => setCurrentView('Maintenance')} className="mt-4 text-orange-500 font-bold">
          Back to Maintenance List
        </button>
      </div>);

  }

  const matchingVehicle = vehicles.find((v) => v.reg === record.vehicleReg);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar activeTab="Maintenance" />
      <div className="flex-1 pl-64 flex flex-col min-h-screen overflow-y-auto">
        <Navbar
          userName="Alex Mercer"
          role="Fleet Manager"
          searchQuery=""
          onSearchChange={() => {}} />
        

        <main className="flex-1 p-8 pt-24 space-y-6 max-w-3xl w-full mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
            <button
              onClick={() => setCurrentView('Maintenance')}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-800 transition-all shadow-sm">
              
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
                  Task ID: {record.id}
                </span>
                <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">{record.status}</span>
              </div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight mt-0.5">{record.issue}</h1>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <FiTool className="text-orange-500 w-5 h-5" />
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Repair Specifications</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Vehicle</span>
                <span className="text-sm font-semibold text-slate-700 block mt-1">{record.vehicleName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Number</span>
                <span className="font-mono text-sm font-bold text-slate-700 block mt-1">{record.vehicleReg}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Start Date</span>
                <span className="text-sm font-semibold text-slate-600 block mt-1">{record.startDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Completion</span>
                <span className="text-sm font-semibold text-slate-600 block mt-1">{record.expectedCompletion}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Problem Description</span>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{record.description}</p>
              </div>

              {record.repairNotes &&
              <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Repair Notes (Technician)</span>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{record.repairNotes}</p>
                </div>
              }

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Vehicle Availability Status</span>
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
        </main>
      </div>
    </div>);

};