import React, { useState, useMemo } from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';
import { FaGasPump, FaDollarSign } from 'react-icons/fa';

const initialFuelLogs = [
{ id: 'FL-901', vehicle: 'TX-9081', date: '2026-07-10', liters: 180, cost: 288.00, odometer: 124500 },
{ id: 'FL-902', vehicle: 'WA-5561', date: '2026-07-09', liters: 75, cost: 120.00, odometer: 87100 },
{ id: 'FL-903', vehicle: 'PA-1102', date: '2026-07-08', liters: 45, cost: 72.00, odometer: 95300 },
{ id: 'FL-904', vehicle: 'TX-4322', date: '2026-07-07', liters: 95, cost: 152.00, odometer: 45200 }];


const initialExpenses = [
{ id: 'EX-301', vehicle: 'TX-9081', type: 'Tolls', cost: 45.00, date: '2026-07-11', description: 'I-80 Tollway pass charge.' },
{ id: 'EX-302', vehicle: 'CA-8899', type: 'Maintenance', cost: 1250.00, date: '2026-07-10', description: 'Radiator unit rebuild fees.' },
{ id: 'EX-303', vehicle: 'FL-2099', type: 'Permit', cost: 150.00, date: '2026-07-08', description: 'State carrier registration permit.' },
{ id: 'EX-304', vehicle: 'NY-7811', type: 'Insurance', cost: 300.00, date: '2026-07-05', description: 'Monthly courier liability insurance.' }];


export const FuelExpenses = ({ searchQuery = '' }) => {
  const [expenseFilter, setExpenseFilter] = useState('All');

  // Filter calculations
  const filteredFuel = useMemo(() => {
    return initialFuelLogs.filter((f) => f.vehicle.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const filteredExpenses = useMemo(() => {
    return initialExpenses.filter((e) => {
      const matchesSearch = e.vehicle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = expenseFilter === 'All' || e.type === expenseFilter;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, expenseFilter]);

  // Calculations for summary cards
  const totalFuelCost = useMemo(() => initialFuelLogs.reduce((sum, item) => sum + item.cost, 0), []);
  const totalOtherExpenses = useMemo(() => initialExpenses.reduce((sum, item) => sum + item.cost, 0), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Fuel & Expenses Ledger
            <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-200 uppercase tracking-widest">
              Read Only
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitor fleet refueling logs, administrative expenses, and vehicle cost totals.
          </p>
        </div>
      </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Refuel Expenditures</span>
                <span className="text-2xl font-black text-slate-800 block mt-1">${totalFuelCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Refueled {initialFuelLogs.reduce((sum, i) => sum + i.liters, 0)} Liters</span>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-orange-500 border border-orange-100">
                <FaGasPump className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">General Fleet Expenses</span>
                <span className="text-2xl font-black text-slate-800 block mt-1">${totalOtherExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">tolls, insurance, maintenance</span>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-orange-500 border border-orange-100">
                <FaDollarSign className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Cost Summary</span>
                <span className="text-2xl font-black text-slate-800 block mt-1">${(totalFuelCost + totalOtherExpenses).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider block mt-1">Within Monthly Allocation Limit</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500 border border-emerald-100">
                <FaDollarSign className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search/Filters */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-auto py-2">
              <FiFilter className="text-orange-500 w-4.5 h-4.5" />
              <span className="uppercase tracking-wider text-xs">Filter Expenses</span>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Expense Category
              </label>
              <select
                value={expenseFilter}
                onChange={(e) => setExpenseFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 font-medium focus:outline-none">
                
                <option value="All">All Categories</option>
                <option value="Tolls">Tolls</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Insurance">Insurance</option>
                <option value="Permit">Permit</option>
              </select>
            </div>

            <button
              onClick={() => {setExpenseFilter('All');setSearchQuery('');}}
              className="h-[38px] flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg px-4 text-xs font-bold transition-all border border-slate-200">
              
              <FiRefreshCw />
              <span>RESET</span>
            </button>
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Refueling Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Refueling Logs</h3>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refuel ID</th>
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle</th>
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refuel Date</th>
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Liters</th>
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFuel.map((f) =>
                  <tr key={f.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-800 text-xs">{f.id}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{f.vehicle}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{f.date}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{f.liters} L</td>
                      <td className="px-6 py-4 text-right font-mono text-xs font-bold text-slate-700">${f.cost.toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* General Expenses Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Operational Expense Logs</h3>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expense ID</th>
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle</th>
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredExpenses.map((e) =>
                  <tr key={e.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-800 text-xs">{e.id}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{e.vehicle}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      e.type === 'Tolls' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                      e.type === 'Maintenance' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                      e.type === 'Permit' ? 'bg-slate-50 text-slate-600 border border-slate-200' :
                      'bg-emerald-50 text-emerald-600 border border-emerald-200'}`
                      }>
                          {e.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{e.date}</td>
                      <td className="px-6 py-4 text-right font-mono text-xs font-bold text-slate-700">${e.cost.toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
    </div>
  );
};