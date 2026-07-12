import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FiArrowLeft } from 'react-icons/fi';
import { FaGasPump, FaWrench } from 'react-icons/fa';

export const VehicleDetails = () => {
  const { selectedVehicleReg, vehicles, setCurrentView, trips, maintenance } = useApp();

  const vehicle = vehicles.find((v) => v.reg === selectedVehicleReg);

  if (!vehicle) {
    return (
      <div className="p-8 text-center">
        <p>Vehicle not found.</p>
        <button onClick={() => setCurrentView('Fleet')} className="mt-4 text-orange-500 font-bold">
          Back to Fleet
        </button>
      </div>);

  }

  // Get matching trips
  const vehicleTrips = trips.filter((t) => t.vehicleReg === vehicle.reg);

  // Get matching maintenance
  const vehicleMaintenance = maintenance.filter((m) => m.vehicleReg === vehicle.reg);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar activeTab="Fleet" />
      <div className="flex-1 pl-64 flex flex-col min-h-screen overflow-y-auto">
        <Navbar
          userName="Alex Mercer"
          role="Fleet Manager"
          searchQuery=""
          onSearchChange={() => {}} />
        

        <main className="flex-1 p-8 pt-24 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('Fleet')}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-800 transition-all shadow-sm">
              
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
                  {vehicle.type}
                </span>
                <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">{vehicle.reg}</span>
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">{vehicle.name}</h1>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: General Info */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Vehicle Profile</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration</span>
                  <span className="font-mono text-sm font-bold text-slate-700 block mt-1">{vehicle.reg}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Operational Status</span>
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
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200">Retired</span>
                    }
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Max Capacity</span>
                  <span className="text-sm font-semibold text-slate-700 block mt-1">{vehicle.capacity.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Odometer Reading</span>
                  <span className="font-mono text-sm font-semibold text-slate-700 block mt-1">{vehicle.odometer.toLocaleString()} km</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Base Region</span>
                  <span className="text-sm font-semibold text-slate-700 block mt-1">{vehicle.region} Region</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Assigned Active Trip</span>
                  <span className="text-sm font-bold text-orange-600 block mt-1">{vehicle.assignedTripId || 'None'}</span>
                </div>
              </div>
            </div>

            {/* Middle: Fuel Summary */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <FaGasPump className="text-orange-500 w-4 h-4" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Fuel Performance</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Avg Efficiency</span>
                  <span className="text-sm font-bold text-slate-700 block mt-1">4.8 km/L</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Fuel Cost</span>
                  <span className="text-sm font-bold text-slate-700 block mt-1">$4,850.00</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Last Fuel Up</span>
                  <span className="text-sm font-semibold text-slate-500 block mt-1">2026-07-10</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tank Capacity</span>
                  <span className="text-sm font-semibold text-slate-500 block mt-1">250 Liters</span>
                </div>
              </div>
            </div>

            {/* Right: Maintenance Summary */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <FaWrench className="text-orange-500 w-4 h-4" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Maintenance Summary</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Next Service Due</span>
                  <span className="text-sm font-bold text-slate-700 block mt-1">2026-08-15</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Maintenance Status</span>
                  <span className="inline-block mt-1">
                    {vehicle.status === 'In Shop' ?
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-50 text-orange-600 border border-orange-200">Active Issue</span> :

                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Healthy</span>
                    }
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Reports</span>
                  <span className="text-sm font-semibold text-slate-500 block mt-1">{vehicleMaintenance.length} records</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Last Service</span>
                  <span className="text-sm font-semibold text-slate-500 block mt-1">2026-06-01</span>
                </div>
              </div>
            </div>

          </div>

          {/* Trip History Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Recent Trips & Log History</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trip ID</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Route</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned Driver</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vehicleTrips.length > 0 ?
                vehicleTrips.map((t) =>
                <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-800 text-sm">{t.id}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-600">{t.source} to {t.destination}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-600">{t.driverName}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{t.date}</td>
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
                      No trip logs recorded for this vehicle.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>);

};