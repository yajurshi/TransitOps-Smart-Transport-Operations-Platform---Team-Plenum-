import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FiFilter, FiRefreshCw, FiEye, FiPlus, FiNavigation, FiCheckSquare, FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const TripList = () => {
  const { trips, setCurrentView, setSelectedTripId, dispatchTrip, completeTrip, cancelTrip } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(() => {
    return trips.filter((t) => {
      const matchesSearch = searchQuery === '' ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vehicleName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [trips, searchQuery, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Draft
          </span>);

      case 'Dispatched':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Dispatched
          </span>);

      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>);

      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Cancelled
          </span>);

      default:
        return null;
    }
  };

  const handleViewDetails = (id) => {
    setSelectedTripId(id);
    setCurrentView('TripDetails');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar activeTab="Trips" />
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
                Trip Logistics Dispatch
                <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
                  Operations
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Dispatch and manage all freight routes, assign vehicles, drivers and monitor progress.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('CreateTrip')}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all shadow-md shadow-orange-500/20">
              
              <FiPlus className="w-4 h-4" />
              <span>Create Trip</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-auto py-2">
              <FiFilter className="text-orange-500 w-4.5 h-4.5" />
              <span className="uppercase tracking-wider text-xs">Filter Trips</span>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Trip Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 font-medium focus:outline-none">
                
                <option value="All">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={() => {setStatusFilter('All');setSearchQuery('');}}
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
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trip ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Route</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Driver</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cargo Weight</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Distance</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ETA</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ?
                filtered.map((trip) =>
                <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800 text-sm">{trip.id}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-600">{trip.source} to {trip.destination}</td>
                      <td className="px-6 py-4 font-semibold text-slate-700 text-sm">
                        <div>
                          <span>{trip.vehicleName}</span>
                          <span className="block text-[9px] font-mono text-slate-400 tracking-wider uppercase mt-0.5">{trip.vehicleReg}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-600">{trip.driverName}</td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">{trip.cargoWeight.toLocaleString()} kg</td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">{trip.distance.toLocaleString()} km</td>
                      <td className="px-6 py-4">{getStatusBadge(trip.status)}</td>
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-600">{trip.eta}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                        onClick={() => handleViewDetails(trip.id)}
                        className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 font-bold text-[10px] px-2 py-1 rounded transition-all"
                        title="View Details">
                        
                            <FiEye />
                            <span>View</span>
                          </button>
                          
                          {trip.status === 'Draft' &&
                      <>
                              <button
                          onClick={() => dispatchTrip(trip.id)}
                          className="inline-flex items-center gap-1 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 font-bold text-[10px] px-2 py-1 rounded transition-all"
                          title="Dispatch Trip">
                          
                                <FiNavigation />
                                <span>Dispatch</span>
                              </button>
                              <button
                          onClick={() => cancelTrip(trip.id)}
                          className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-[10px] px-2 py-1 rounded transition-all"
                          title="Cancel Trip">
                          
                                <FiXCircle />
                                <span>Cancel</span>
                              </button>
                            </>
                      }

                          {trip.status === 'Dispatched' &&
                      <>
                              <button
                          onClick={() => completeTrip(trip.id)}
                          className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-[10px] px-2 py-1 rounded transition-all"
                          title="Complete Trip">
                          
                                <FiCheckSquare />
                                <span>Complete</span>
                              </button>
                              <button
                          onClick={() => cancelTrip(trip.id)}
                          className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-[10px] px-2 py-1 rounded transition-all"
                          title="Cancel Trip">
                          
                                <FiXCircle />
                                <span>Cancel</span>
                              </button>
                            </>
                      }
                        </div>
                      </td>
                    </tr>
                ) :

                <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-slate-400 font-medium text-sm">
                      No trips found matching filters.
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