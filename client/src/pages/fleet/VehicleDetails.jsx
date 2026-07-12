import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { FiArrowLeft, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { FaGasPump, FaWrench } from 'react-icons/fa';

export const VehicleDetails = () => {
  const { selectedVehicleReg, vehicles, setCurrentView, trips, maintenance, editVehicle, retireVehicle } = useApp();
  const { role } = useAuth();
  const vehicle = vehicles.find((v) => v.reg === selectedVehicleReg);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRetireOpen, setIsRetireOpen] = useState(false);
  const [editData, setEditData] = useState(vehicle ? { ...vehicle } : null);

  if (!vehicle) {
    return (
      <div className="p-8 text-center">
        <p>Vehicle not found.</p>
        <button onClick={() => setCurrentView('Fleet')} className="mt-4 text-orange-500 font-bold">
          Back to Fleet
        </button>
      </div>
    );
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editVehicle(vehicle.reg, editData);
    setIsEditOpen(false);
  };

  const handleRetire = () => {
    retireVehicle(vehicle.reg);
    setIsRetireOpen(false);
  };

  // Get matching trips
  const vehicleTrips = trips.filter((t) => t.vehicleReg === vehicle.reg);

  // Get matching maintenance
  const vehicleMaintenance = maintenance.filter((m) => m.vehicleReg === vehicle.reg);

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center w-full border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('Fleet')}
            className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:text-white dark:hover:text-white dark:text-white transition-all shadow-sm">
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
                {vehicle.type}
              </span>
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{vehicle.reg}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mt-0.5">{vehicle.name}</h1>
          </div>
        </div>

        {role === 'Fleet Manager' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setEditData({...vehicle}); setIsEditOpen(true); }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:text-white dark:hover:text-white dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
            >
              <FiEdit2 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => setIsRetireOpen(true)}
              disabled={vehicle.status === 'On Trip'}
              className="bg-rose-50 border border-rose-200 text-rose-600 hover:text-rose-700 hover:bg-rose-100 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiTrash2 className="w-4 h-4" /> Retire
            </button>
          </div>
        )}
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
              <h2 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider">Edit Vehicle</h2>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 dark:text-slate-300 dark:hover:text-slate-200 dark:text-slate-300">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Registration Number</label>
                  <input type="text" disabled value={vehicle.reg} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-mono cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Vehicle Name</label>
                  <input type="text" required value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Region</label>
                  <select value={editData.region} onChange={e => setEditData({...editData, region: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500">
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Capacity (kg)</label>
                  <input type="number" min="1" required value={editData.capacity} onChange={e => setEditData({...editData, capacity: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Current Odometer</label>
                  <input type="number" min="0" required value={editData.odometer} onChange={e => setEditData({...editData, odometer: Number(e.target.value)})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Status</label>
                  <select value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500">
                    <option value="Available">Available</option>
                    <option value="In Shop">In Shop</option>
                    <option value="On Trip" disabled>On Trip</option>
                    <option value="Retired">Retired</option>
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

      {isRetireOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="font-black text-slate-800 dark:text-white text-lg mb-2">Retire Vehicle?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mb-6">
              Are you sure you want to retire <strong>{vehicle.reg}</strong>? This will permanently mark it as retired and remove it from dispatch availability.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setIsRetireOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleRetire} className="px-4 py-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-md transition-all active:scale-95">Yes, Retire Vehicle</button>
            </div>
          </div>
        </div>
      )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: General Info */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Vehicle Profile</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Registration</span>
                  <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200 block mt-1">{vehicle.reg}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Operational Status</span>
                  <span className="inline-block mt-1">
                    {vehicle.status === 'Available' &&
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Available</span>
                    }
                    {vehicle.status === 'On Trip' &&
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">On Trip</span>
                    }
                    {vehicle.status === 'In Shop' &&
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">In Shop</span>
                    }
                    {vehicle.status === 'Retired' &&
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700">Retired</span>
                    }
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Max Capacity</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{vehicle.capacity.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Odometer Reading</span>
                  <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{vehicle.odometer.toLocaleString()} km</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Base Region</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{vehicle.region} Region</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Assigned Active Trip</span>
                  <span className="text-sm font-bold text-orange-600 block mt-1">{vehicle.assignedTripId || 'None'}</span>
                </div>
              </div>
            </div>

            {/* Middle: Fuel Summary */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <FaGasPump className="text-orange-500 w-4 h-4" />
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Fuel Performance</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Avg Efficiency</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 block mt-1">4.8 km/L</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Total Fuel Cost</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 block mt-1">$4,850.00</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Last Fuel Up</span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 block mt-1">2026-07-10</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Tank Capacity</span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 block mt-1">250 Liters</span>
                </div>
              </div>
            </div>

            {/* Right: Maintenance Summary */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <FaWrench className="text-orange-500 w-4 h-4" />
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Maintenance Summary</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Next Service Due</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 block mt-1">2026-08-15</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Maintenance Status</span>
                  <span className="inline-block mt-1">
                    {vehicle.status === 'In Shop' ?
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-50 text-orange-600 border border-orange-200">Active Issue</span> :

                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Healthy</span>
                    }
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Pending Reports</span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 block mt-1">{vehicleMaintenance.length} records</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Last Service</span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 block mt-1">2026-06-01</span>
                </div>
              </div>
            </div>

          </div>

          {/* Trip History Table */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Recent Trips & Log History</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Trip ID</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Route</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Assigned Driver</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vehicleTrips.length > 0 ?
                vehicleTrips.map((t) =>
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900/50">
                      <td className="px-6 py-4 font-bold text-slate-800 dark:text-white text-sm">{t.id}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300">{t.source} to {t.destination}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300">{t.driverName}</td>
                      <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">{t.date}</td>
                      <td className="px-6 py-4">
                        {t.status === 'Completed' ?
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Completed</span> :
                    t.status === 'Dispatched' ?
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-200">Dispatched</span> :

                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700">{t.status}</span>
                    }
                      </td>
                    </tr>
                ) :

                <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 text-xs font-medium">
                      No trip logs recorded for this vehicle.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
    </div>
  );
};