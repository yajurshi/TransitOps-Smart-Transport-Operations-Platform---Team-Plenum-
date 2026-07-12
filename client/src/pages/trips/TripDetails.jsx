import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { FiArrowLeft, FiNavigation, FiCheckSquare, FiXCircle } from 'react-icons/fi';

export const TripDetails = () => {
  const { selectedTripId, trips, setCurrentView, dispatchTrip, completeTrip, cancelTrip, vehicles, drivers } = useApp();
  const { role } = useAuth();

  const trip = trips.find((t) => t.id === selectedTripId);

  if (!trip) {
    return (
      <div className="p-8 text-center">
        <p>Trip not found.</p>
        <button onClick={() => setCurrentView('Trips')} className="mt-4 text-orange-500 font-bold">
          Back to Trips
        </button>
      </div>);
  }

  const assignedVehicle = vehicles.find((v) => v.reg === trip.vehicleReg);
  const assignedDriver = drivers.find((d) => d.name === trip.driverName);

  // Timeline Steps
  const timelineSteps = [
  { label: 'Draft Created', status: 'completed' },
  { label: 'Dispatched / In Transit', status: trip.status !== 'Draft' ? 'completed' : 'pending' },
  { label: trip.status === 'Cancelled' ? 'Trip Cancelled' : 'Completed', status: trip.status === 'Completed' || trip.status === 'Cancelled' ? 'completed' : 'pending', isSpecial: trip.status === 'Cancelled' }];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('Trips')}
            className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:text-white transition-all shadow-sm">
            
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-white text-sm">{trip.id}</span>
              {trip.status === 'Completed' &&
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Completed</span>
              }
              {trip.status === 'Dispatched' &&
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-200">Dispatched</span>
              }
              {trip.status === 'Draft' &&
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700">Draft</span>
              }
              {trip.status === 'Cancelled' &&
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-600 border border-rose-200">Cancelled</span>
              }
            </div>
            <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mt-0.5">{trip.source} to {trip.destination}</h1>
          </div>
        </div>

            {/* Quick dispatch / completion actions */}
            {role === 'Dispatcher' && (
              <div className="flex gap-2">
                {trip.status === 'Draft' &&
                <>
                    <button
                    onClick={() => dispatchTrip(trip.id)}
                    className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all shadow-md shadow-orange-500/20">
                    
                      <FiNavigation className="w-3.5 h-3.5" />
                      <span>Dispatch</span>
                    </button>
                    <button
                    onClick={() => cancelTrip(trip.id)}
                    className="flex items-center gap-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 active:scale-95 text-rose-600 font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all border border-slate-200 dark:border-slate-700 shadow-sm">
                    
                      <FiXCircle className="w-3.5 h-3.5" />
                      <span>Cancel Trip</span>
                    </button>
                  </>
                }

                {trip.status === 'Dispatched' &&
                <>
                    <button
                    onClick={() => completeTrip(trip.id)}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all shadow-md shadow-emerald-600/20">
                    
                      <FiCheckSquare className="w-3.5 h-3.5" />
                      <span>Complete Trip</span>
                    </button>
                    <button
                    onClick={() => cancelTrip(trip.id)}
                    className="flex items-center gap-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 active:scale-95 text-rose-600 font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all border border-slate-200 dark:border-slate-700 shadow-sm">
                    
                      <FiXCircle className="w-3.5 h-3.5" />
                      <span>Cancel Trip</span>
                    </button>
                  </>
                }
              </div>
            )}
      </div>

          {/* Timeline Visualizer */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-widest mb-4">Trip Timeline & Progress</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
              {timelineSteps.map((step, idx) =>
              <React.Fragment key={idx}>
                  <div className="flex items-center gap-3 z-10 bg-white dark:bg-slate-800 px-2">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                  step.status === 'completed' ?
                  step.isSpecial ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-orange-50 border-orange-500 text-orange-600' :
                  'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'}`
                  }>
                      {idx + 1}
                    </div>
                    <div>
                      <span className={`block text-xs font-bold ${step.status === 'completed' ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>{step.label}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{step.status === 'completed' ? 'Timestamp Recorded' : 'Awaiting status'}</span>
                    </div>
                  </div>
                  {idx < timelineSteps.length - 1 &&
                <div className={`hidden md:block h-0.5 flex-1 ${
                timelineSteps[idx + 1].status === 'completed' ? 'bg-orange-500' : 'bg-slate-200'}`
                } />
                }
                </React.Fragment>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: General Info */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Manifest Specifications</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Source</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{trip.source}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Destination</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{trip.destination}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Cargo weight</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{trip.cargoWeight.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Distance</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{trip.distance.toLocaleString()} km</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">ETA</span>
                  <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200 block mt-1">{trip.eta}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Trip Region</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{trip.region} Region</span>
                </div>
              </div>

              {trip.notes &&
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Notes</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-1 leading-normal">{trip.notes}</p>
                </div>
              }
            </div>

            {/* Middle: Assigned Vehicle Details */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Allocated Vehicle</h3>
                {assignedVehicle &&
                <span className="text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {assignedVehicle.type}
                  </span>
                }
              </div>
              
              {assignedVehicle ?
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Name</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{assignedVehicle.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Registration</span>
                    <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200 block mt-1">{assignedVehicle.reg}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Payload Capacity</span>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 block mt-1">{assignedVehicle.capacity.toLocaleString()} kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Current Odometer</span>
                    <span className="font-mono text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 block mt-1">{assignedVehicle.odometer.toLocaleString()} km</span>
                  </div>
                </div> :

              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">No vehicle information found.</p>
              }
            </div>

            {/* Right: Assigned Driver Details */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Assigned Operator</h3>
                {assignedDriver &&
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Score: {assignedDriver.safetyScore}/100
                  </span>
                }
              </div>
              
              {assignedDriver ?
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Operator Name</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">{assignedDriver.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">License Number</span>
                    <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200 block mt-1">{assignedDriver.licenseNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">License Class</span>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 block mt-1">{assignedDriver.licenseCategory}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Operator Status</span>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 block mt-1">{assignedDriver.status}</span>
                  </div>
                </div> :

              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">No driver information found.</p>
              }
            </div>

      </div>
    </div>
  );
};