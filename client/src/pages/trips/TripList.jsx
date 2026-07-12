import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { FiFilter, FiRefreshCw, FiEye, FiPlus, FiNavigation, FiCheckSquare, FiXCircle, FiMapPin, FiTruck, FiUser, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { KanbanBoard } from '../../components/KanbanBoard';

export const TripList = ({ searchQuery = '' }) => {
  const { trips, setCurrentView, setSelectedTripId, dispatchTrip, completeTrip, cancelTrip } = useApp();
  const { role } = useAuth();
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700">
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
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            Trip Logistics Dispatch
            <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2.5 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
              Operations
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            Dispatch and manage all freight routes, assign vehicles, drivers and monitor progress.
          </p>
        </div>

        {role === 'Dispatcher' && (
          <button
            onClick={() => setCurrentView('CreateTrip')}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all shadow-md shadow-orange-500/20">

            <FiPlus className="w-4 h-4" />
            <span>Create Trip</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm mb-auto py-2">
          <FiFilter className="text-orange-500 w-4.5 h-4.5" />
          <span className="uppercase tracking-wider text-xs">Filter Trips</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
            Trip Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 font-medium focus:outline-none">

            <option value="All">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          onClick={() => { setStatusFilter('All'); }}
          className="h-[38px] flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg px-4 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700">

          <FiRefreshCw />
          <span>RESET</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="h-[650px] bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-hidden">
        <KanbanBoard
          columns={[
            { id: 'Draft', title: 'Draft / Planned', color: 'bg-slate-400', items: filtered.filter(t => t.status === 'Draft') },
            { id: 'Dispatched', title: 'Dispatched', color: 'bg-blue-500', items: filtered.filter(t => t.status === 'Dispatched') },
            { id: 'Completed', title: 'Completed', color: 'bg-emerald-500', items: filtered.filter(t => t.status === 'Completed') },
            { id: 'Cancelled', title: 'Cancelled', color: 'bg-rose-500', items: filtered.filter(t => t.status === 'Cancelled') }
          ]}
          renderCard={(trip) => (
            <div className="bg-white border border-slate-200 hover:border-orange-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{trip.id}</span>
                {getStatusBadge(trip.status)}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiMapPin className="text-orange-500 w-3 h-3" />
                  <span className="text-xs font-bold text-slate-700 truncate">{trip.source}</span>
                </div>
                <div className="flex items-center gap-2 ml-1 border-l-2 border-dashed border-slate-200 pl-3 py-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{trip.distance} KM</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <FiMapPin className="text-emerald-500 w-3 h-3" />
                  <span className="text-xs font-bold text-slate-700 truncate">{trip.destination}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-3 border-t border-slate-100 mt-1">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <FiTruck className="text-slate-400 w-3.5 h-3.5" />
                  <span className="truncate">{trip.vehicleName} ({trip.vehicleReg})</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <FiUser className="text-slate-400 w-3.5 h-3.5" />
                  <span className="truncate">{trip.driverName}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <FiClock className="w-3 h-3" /> ETA: {trip.eta}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleViewDetails(trip.id)} className="p-1.5 bg-slate-100 text-slate-600 hover:text-orange-600 rounded-lg transition-colors"><FiEye className="w-3.5 h-3.5" /></button>

                  {role === 'Dispatcher' && trip.status === 'Draft' && (
                    <button onClick={() => dispatchTrip(trip.id)} className="p-1.5 bg-orange-100 text-orange-600 hover:bg-orange-200 rounded-lg transition-colors"><FiNavigation className="w-3.5 h-3.5" /></button>
                  )}

                  {role === 'Dispatcher' && trip.status === 'Dispatched' && (
                    <button onClick={() => completeTrip(trip.id)} className="p-1.5 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 rounded-lg transition-colors"><FiCheckSquare className="w-3.5 h-3.5" /></button>
                  )}

                  {role === 'Dispatcher' && (trip.status === 'Draft' || trip.status === 'Dispatched') && (
                    <button onClick={() => cancelTrip(trip.id)} className="p-1.5 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg transition-colors"><FiXCircle className="w-3.5 h-3.5" /></button>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};