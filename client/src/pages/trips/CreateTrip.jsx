import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const CreateTrip = () => {
  const { vehicles, drivers, createTrip, setCurrentView } = useApp();

  // Form states
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleReg, setVehicleReg] = useState('');
  const [driverName, setDriverName] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  // Filter dropdowns according to strict business rules
  // Vehicle dropdown must only show Available vehicles. Hide Retired, In Shop, On Trip.
  const availableVehicles = useMemo(() => {
    return vehicles.filter((v) => v.status === 'Available');
  }, [vehicles]);

  // Driver dropdown must only show Available drivers. Hide Suspended, Expired License, On Trip.
  const availableDrivers = useMemo(() => {
    return drivers.filter((d) => d.status === 'Available');
  }, [drivers]);

  // Find capacity of selected vehicle
  const selectedVehicleCapacity = useMemo(() => {
    const v = vehicles.find((item) => item.reg === vehicleReg);
    return v ? v.capacity : null;
  }, [vehicleReg, vehicles]);

  const handleSave = (dispatchImmediately) => {
    setErrorMsg(null);

    // Validation
    if (!source.trim() || !destination.trim() || !vehicleReg || !driverName || cargoWeight === '' || distance === '') {
      setErrorMsg('All fields marked with * are required.');
      return;
    }

    if (cargoWeight <= 0 || distance <= 0) {
      setErrorMsg('Cargo Weight and Distance must be positive numbers.');
      return;
    }

    const selectedVehicle = vehicles.find((v) => v.reg === vehicleReg);
    if (cargoWeight > selectedVehicle.capacity) {
      setErrorMsg(`Cargo Weight (${cargoWeight.toLocaleString()} kg) exceeds selected vehicle's capacity (${selectedVehicle.capacity.toLocaleString()} kg).`);
      return;
    }

    // Determine region based on vehicle region
    const region = selectedVehicle.region;

    // Call Context Function
    createTrip({
      source,
      destination,
      vehicleReg,
      vehicleName: selectedVehicle.name,
      driverName,
      cargoWeight: Number(cargoWeight),
      distance: Number(distance),
      region,
      notes
    }, dispatchImmediately);

    // Return to list
    setCurrentView('Trips');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar activeTab="Trips" />
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
              onClick={() => setCurrentView('Trips')}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-800 transition-all shadow-sm">
              
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Create Trip Dispatch</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Register a new route, allocate cargo weight, and assign available vehicles and drivers.
              </p>
            </div>
          </div>

          {/* Validation Alert */}
          {errorMsg &&
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-center gap-3 text-xs font-semibold">
            
              <FiAlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          }

          {/* Form */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Source */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Source Location *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chicago Depot"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
                
              </div>

              {/* Destination */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Destination *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Detroit Fulfillment"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
                
              </div>

              {/* Vehicle Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Assign Vehicle (Available Only) *
                </label>
                <select
                  value={vehicleReg}
                  onChange={(e) => setVehicleReg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer">
                  
                  <option value="">Select a vehicle...</option>
                  {availableVehicles.map((v) =>
                  <option key={v.reg} value={v.reg}>
                      {v.name} ({v.reg}) - Cap: {v.capacity.toLocaleString()} kg
                    </option>
                  )}
                </select>
                {selectedVehicleCapacity &&
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                    Selected Vehicle Capacity: {selectedVehicleCapacity.toLocaleString()} kg
                  </span>
                }
              </div>

              {/* Driver Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Assign Driver (Available Only) *
                </label>
                <select
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer">
                  
                  <option value="">Select a driver...</option>
                  {availableDrivers.map((d) =>
                  <option key={d.name} value={d.name}>
                      {d.name} (Safety Score: {d.safetyScore}/100)
                    </option>
                  )}
                </select>
              </div>

              {/* Cargo Weight */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Cargo Weight (kg) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={cargoWeight}
                  onChange={(e) => setCargoWeight(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
                
              </div>

              {/* Planned Distance */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Planned Distance (km) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 450"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
                
              </div>

            </div>

            {/* Notes */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Dispatch Notes & Instructions
              </label>
              <textarea
                placeholder="Enter specialized cargo instructions or route exceptions here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
              
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentView('Trips')}
                className="bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg border border-slate-200 transition-all active:scale-95">
                
                Cancel
              </button>
              <button
                onClick={() => handleSave(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all active:scale-95">
                
                Save Draft
              </button>
              <button
                onClick={() => handleSave(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all shadow-md shadow-orange-500/20 active:scale-95">
                
                Dispatch Trip
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>);

};