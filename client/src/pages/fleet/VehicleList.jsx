import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FiFilter, FiRefreshCw, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const VehicleList = () => {
  const { vehicles, setCurrentView, setSelectedVehicleReg } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Retired
          </span>);

      default:
        return null;
    }
  };

  const handleViewDetails = (reg) => {
    setSelectedVehicleReg(reg);
    setCurrentView('VehicleDetails');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar activeTab="Fleet" />
      <div className="flex-1 pl-64 flex flex-col min-h-screen overflow-y-auto">
        <Navbar
          userName="Alex Mercer"
          role="Fleet Manager"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery} />
        
        
        <main className="flex-1 p-8 pt-24 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                Fleet Directory
                <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-200 uppercase tracking-widest">
                  View Only
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Centralized registry of organization-wide vehicles and their statuses.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-auto py-2">
              <FiFilter className="text-orange-500 w-4.5 h-4.5" />
              <span className="uppercase tracking-wider text-xs">Filter Fleet</span>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Vehicle Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 font-medium focus:outline-none">
                
                <option value="All">All Types</option>
                <option value="Heavy Duty">Heavy Duty</option>
                <option value="Light Truck">Light Truck</option>
                <option value="Van">Van</option>
                <option value="Sedan">Sedan</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 font-medium focus:outline-none">
                
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="On Trip">On Trip</option>
                <option value="In Shop">In Shop</option>
                <option value="Retired">Retired</option>
              </select>
            </div>

            <button
              onClick={() => {setTypeFilter('All');setStatusFilter('All');setSearchQuery('');}}
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
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registration</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacity</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Odometer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned Trip</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ?
                filtered.map((vehicle) =>
                <tr key={vehicle.reg} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-800 text-sm">{vehicle.reg}</td>
                      <td className="px-6 py-4 font-semibold text-slate-700 text-sm">{vehicle.name}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{vehicle.type}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{vehicle.capacity.toLocaleString()} kg</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{vehicle.odometer.toLocaleString()} km</td>
                      <td className="px-6 py-4">{getStatusBadge(vehicle.status)}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                        {vehicle.assignedTripId ?
                    <span className="text-orange-600 underline cursor-pointer" onClick={() => {
                      setCurrentView('TripDetails');
                    }}>
                            {vehicle.assignedTripId}
                          </span> :

                    <span className="text-slate-400">None</span>
                    }
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                      onClick={() => handleViewDetails(vehicle.reg)}
                      className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 font-bold text-xs px-2.5 py-1.5 rounded-lg transition-all">
                      
                          <FiEye />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                ) :

                <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-400 font-medium text-sm">
                      No vehicles found matching filters.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </motion.div>
        </main>
      </div>
    </div>);

};