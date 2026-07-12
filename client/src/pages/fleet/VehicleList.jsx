import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { FiFilter, FiRefreshCw, FiEye, FiPlus, FiX, FiFileText, FiShield, FiFile, FiCheckCircle } from 'react-icons/fi';
import { FaGasPump, FaWrench, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SideDrawer } from '../../components/SideDrawer';
import { ProgressGauge } from '../../components/ProgressGauge';
import { Timeline } from '../../components/Timeline';

export const VehicleList = ({ searchQuery = '' }) => {
  const { vehicles, setCurrentView, setSelectedVehicleReg, createVehicle } = useApp();
  const { role } = useAuth();

  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDrawerReg, setSelectedDrawerReg] = useState(null);

  const selectedVehicle = useMemo(() => vehicles.find(v => v.reg === selectedDrawerReg), [vehicles, selectedDrawerReg]);

  const [newVehicle, setNewVehicle] = useState({
    reg: '',
    name: '',
    type: 'Van',
    capacity: 0,
    cost: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    odometer: 0,
    region: 'Ahmedabad Zone'
  });
  const [createError, setCreateError] = useState('');

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setCreateError('');
    const success = createVehicle(newVehicle);
    if (success) {
      setIsCreateOpen(false);
      setNewVehicle({ reg: '', name: '', type: 'Van', capacity: 0, cost: 0, purchaseDate: new Date().toISOString().split('T')[0], odometer: 0, region: 'Ahmedabad Zone' });
    } else {
      setCreateError('Validation failed. Ensure Reg is unique, and numeric values are positive.');
    }
  };

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch = searchQuery === '' ||
        v.reg.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'All' || v.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [vehicles, searchQuery, typeFilter, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>);

      case 'On Trip':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            On Trip
          </span>);

      case 'In Shop':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            In Shop
          </span>);

      case 'Retired':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Retired
          </span>);

      default:
        return null;
    }
  };

  const handleOpenDrawer = (reg) => {
    setSelectedDrawerReg(reg);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            Fleet Directory
            {role !== 'Fleet Manager' && (
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 uppercase tracking-widest">
                View Only
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            Centralized registry of organization-wide vehicles and their statuses.
          </p>
        </div>
        {role === 'Fleet Manager' && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <FiPlus className="w-4 h-4" />
            Add Vehicle
          </button>
        )}
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
              <h2 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider">Register New Vehicle</h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 dark:text-slate-300 dark:hover:text-slate-200 dark:text-slate-300">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              {createError && <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-200">{createError}</div>}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Registration Number</label>
                  <input type="text" required value={newVehicle.reg} onChange={e => setNewVehicle({ ...newVehicle, reg: e.target.value.toUpperCase() })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:border-orange-500" placeholder="e.g. TX-9999" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Vehicle Name</label>
                  <input type="text" required value={newVehicle.name} onChange={e => setNewVehicle({ ...newVehicle, name: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" placeholder="e.g. Utility Van" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Vehicle Type</label>
                  <select value={newVehicle.type} onChange={e => setNewVehicle({ ...newVehicle, type: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500">
                    <option value="Heavy Duty">Heavy Duty</option>
                    <option value="Light Truck">Light Truck</option>
                    <option value="Van">Van</option>
                    <option value="Sedan">Sedan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Region</label>
                  <select value={newVehicle.region} onChange={e => setNewVehicle({ ...newVehicle, region: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500">
                    <option value="North">Ahmedabad Zone</option>
                    <option value="South">Surat Zone</option>
                    <option value="East">Vadodara Zone</option>
                    <option value="West">Rajkot Zone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Capacity (kg)</label>
                  <input type="number" min="1" required value={newVehicle.capacity} onChange={e => setNewVehicle({ ...newVehicle, capacity: Number(e.target.value) })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Acquisition Cost (₹)</label>
                  <input type="number" min="1" required value={newVehicle.cost} onChange={e => setNewVehicle({ ...newVehicle, cost: Number(e.target.value) })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Initial Odometer</label>
                  <input type="number" min="0" required value={newVehicle.odometer} onChange={e => setNewVehicle({ ...newVehicle, odometer: Number(e.target.value) })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Purchase Date</label>
                  <input type="date" required value={newVehicle.purchaseDate} onChange={e => setNewVehicle({ ...newVehicle, purchaseDate: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-md transition-all active:scale-95">Register Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm mb-auto py-2">
          <FiFilter className="text-orange-500 w-4.5 h-4.5" />
          <span className="uppercase tracking-wider text-xs">Filter Fleet</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
            Vehicle Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 font-medium focus:outline-none">

            <option value="All">All Types</option>
            <option value="Heavy Duty">Heavy Duty</option>
            <option value="Light Truck">Light Truck</option>
            <option value="Van">Van</option>
            <option value="Sedan">Sedan</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 font-medium focus:outline-none">

            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="In Shop">In Shop</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        <button
          onClick={() => { setTypeFilter('All'); setStatusFilter('All'); }}
          className="h-[38px] flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg px-4 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700">

          <FiRefreshCw />
          <span>RESET</span>
        </button>
      </div>

      {/* Vehicle Cards Grid V2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((vehicle, idx) => (
            <motion.div
              key={vehicle.reg}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => handleOpenDrawer(vehicle.reg)}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-orange-300 transition-all cursor-pointer overflow-hidden flex flex-col group"
            >
              {/* Card Header (Image Mock) */}
              <div className="h-32 bg-slate-100 border-b border-slate-200 relative flex items-center justify-center">
                <FaTruck className="w-16 h-16 text-slate-300 group-hover:scale-110 group-hover:text-orange-200 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(vehicle.status)}
                </div>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-lg px-2 py-1 shadow-sm">
                  <span className="font-mono font-bold text-slate-800 text-xs">{vehicle.reg}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-slate-800 text-base leading-tight mb-1">{vehicle.name}</h3>
                  <p className="text-xs font-semibold text-slate-500 mb-4">{vehicle.type} • {vehicle.capacity.toLocaleString()} kg</p>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Health Score</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[92%]" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">92%</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fuel Level</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full w-[65%]" />
                      </div>
                      <span className="text-[10px] font-bold text-orange-600">65%</span>
                    </div>
                  </div>
                  <div className="col-span-2 mt-2 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Current Trip</span>
                      <span className="text-xs font-bold text-slate-700 block mt-0.5">{vehicle.assignedTripId || 'Unassigned'}</span>
                    </div>
                    <button className="text-orange-500 bg-orange-50 hover:bg-orange-100 p-2 rounded-lg transition-colors">
                      <FiEye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
            <FaTruck className="w-12 h-12 text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No Vehicles Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-2">No vehicles match the current filter criteria.</p>
          </div>
        )}
      </div>

      {/* Side Drawer for Vehicle Details */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedVehicle?.name}
        subtitle={selectedVehicle?.reg}
        width="max-w-2xl"
      >
        {selectedVehicle && (
          <div className="space-y-6">

            {/* Top Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center">
                <ProgressGauge value={92} size={70} strokeWidth={6} label="Health" color="text-emerald-500" />
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center">
                <ProgressGauge value={65} size={70} strokeWidth={6} label="Fuel" color="text-orange-500" />
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-800 font-mono tracking-tighter">{selectedVehicle.odometer.toLocaleString()}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">KM Driven</span>
              </div>
            </div>

            {/* General Information */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">Vehicle Specs & Docs</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Type & Capacity</span>
                  <span className="text-xs font-bold text-slate-700 block mt-1">{selectedVehicle.type} • {selectedVehicle.capacity.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Status</span>
                  <div className="mt-1">{getStatusBadge(selectedVehicle.status)}</div>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Registration Expiry</span>
                  <span className="text-xs font-bold text-emerald-600 block mt-1 flex items-center gap-1"><FiCheckCircle /> 12 Mar 2027</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Insurance Policy</span>
                  <span className="text-xs font-bold text-emerald-600 block mt-1 flex items-center gap-1"><FiShield /> Active - ICICI Lombard</span>
                </div>
              </div>
            </div>

            {/* Maintenance Timeline */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2 mb-4 flex items-center gap-2"><FaWrench className="text-orange-500" /> Maintenance History</h3>
              <Timeline events={[
                { title: 'Standard Oil Change', description: 'Replaced oil and filters. General inspection passed.', status: 'completed', time: '14 Jun 2026' },
                { title: 'Brake Pad Replacement', description: 'Front brake pads replaced due to wear.', status: 'completed', time: '02 Apr 2026' },
                { title: 'Next Scheduled Service', description: 'Complete diagnostics and alignment check.', status: 'pending', time: '14 Oct 2026' },
              ]} />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button onClick={() => { setCurrentView('VehicleDetails'); setSelectedVehicleReg(selectedVehicle.reg); }} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors shadow-md">
                Full Records Mode
              </button>
              <button className="w-full bg-orange-50 border border-orange-200 text-orange-600 hover:bg-orange-100 font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors">
                Schedule Service
              </button>
            </div>

          </div>
        )}
      </SideDrawer>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Registration</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Capacity</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Odometer</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Assigned Trip</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length > 0 ?
              filtered.map((vehicle) =>
                <tr key={vehicle.reg} className="hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-slate-800 dark:text-white text-sm">{vehicle.reg}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200 text-sm">{vehicle.name}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">{vehicle.type}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">{vehicle.capacity.toLocaleString()} kg</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">{vehicle.odometer.toLocaleString()} km</td>
                  <td className="px-6 py-4">{getStatusBadge(vehicle.status)}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {vehicle.assignedTripId ?
                      <span className="text-orange-600 underline cursor-pointer" onClick={() => {
                        setCurrentView('TripDetails');
                      }}>
                        {vehicle.assignedTripId}
                      </span> :

                      <span className="text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">None</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleViewDetails(vehicle.reg)}
                      className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:text-white dark:hover:text-white dark:text-white font-bold text-xs px-2.5 py-1.5 rounded-lg transition-all">

                      <FiEye />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ) :

              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium text-sm">
                  No vehicles found matching filters.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};