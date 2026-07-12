import React from 'react';
import { useApp } from '../../context/AppContext';
import { FiArrowLeft, FiShield, FiPhone, FiMail } from 'react-icons/fi';

export const DriverDetails = () => {
  const { selectedDriverName, drivers, setCurrentView, trips } = useApp();

  const driver = drivers.find((d) => d.name === selectedDriverName);

  if (!driver) {
    return (
      <div className="p-8 text-center">
        <p>Driver not found.</p>
        <button onClick={() => setCurrentView('Drivers')} className="mt-4 text-orange-500 font-bold">
          Back to Drivers
        </button>
      </div>);

  }

  // Get matching trips
  const driverTrips = trips.filter((t) => t.driverName === driver.name);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentView('Drivers')}
          className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-800 transition-all shadow-sm">
          
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
              License Class: {driver.licenseCategory}
            </span>
            <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">{driver.licenseNumber}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">{driver.name}</h1>
        </div>
      </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Personal & License Info */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Driver Credentials</h3>
              </div>
              
              <div className="space-y-3.5">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Full Name</span>
                  <span className="text-sm font-semibold text-slate-700 block mt-1">{driver.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">License Status</span>
                  <span className="inline-block mt-1">
                    {driver.status === 'Expired License' ?
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">License Expired</span> :

                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Active / Valid</span>
                    }
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Expiry Date</span>
                  <span className="text-sm font-semibold text-slate-600 block mt-1">{driver.expiryDate}</span>
                </div>
                <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1">
                    <FiPhone className="text-orange-500" />
                    <span>+1 555-019-382</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiMail className="text-orange-500" />
                    <span>driver@transitops.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Performance Scorecard */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <FiShield className="text-orange-500 w-4 h-4" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Safety scorecard</h3>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-slate-50 border-4 border-orange-500 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-xl font-black text-slate-800 leading-none">{driver.safetyScore}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Score</span>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Performance Tier</span>
                    <span className="text-orange-600">Tier A</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold leading-normal">
                    This safety rating is calculated based on telemetry alerts (speeding, harsh braking, and idle times).
                  </p>
                </div>
              </div>
            </div>

            {/* Active Duty Status */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Active Status</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Status</span>
                  <span className="inline-block mt-1">
                    {driver.status === 'Available' &&
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Available</span>
                    }
                    {driver.status === 'On Trip' &&
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">On Trip</span>
                    }
                    {driver.status === 'Suspended' &&
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Suspended</span>
                    }
                    {driver.status === 'Expired License' &&
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Expired License</span>
                    }
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Assigned Active Trip</span>
                  <span className="text-sm font-bold text-orange-600 block mt-1">{driver.assignedTripId || 'None'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Trip History Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Driver Trip History</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trip ID</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Route</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle Name</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cargo Weight</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trip Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {driverTrips.length > 0 ?
                driverTrips.map((t) =>
                <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-800 text-sm">{t.id}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-600">{t.source} to {t.destination}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-600">{t.vehicleName} ({t.vehicleReg})</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{t.cargoWeight.toLocaleString()} kg</td>
                      <td className="px-6 py-4">
                        {t.status === 'Completed' ?
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Completed</span> :
                    t.status === 'Dispatched' ?
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-200">Dispatched</span> :

                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-50 text-slate-500 border border-slate-200">{t.status}</span>
                    }
                      </td>
                    </tr>
                ) :

                <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-xs font-medium">
                      No trip logs recorded for this driver.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
    </div>
  );
};