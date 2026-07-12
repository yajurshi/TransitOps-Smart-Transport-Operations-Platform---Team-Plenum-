import React, { useState, useMemo } from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';
import { FaGasPump, FaDollarSign } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const initialFuelLogs = [
  { id: 'FL-901', vehicle: 'GJ-01-AB-1234', date: '2026-07-10', liters: 180, cost: 288.00, odometer: 124500 },
  { id: 'FL-902', vehicle: 'GJ-06-MN-8765', date: '2026-07-09', liters: 75, cost: 120.00, odometer: 87100 },
  { id: 'FL-903', vehicle: 'GJ-03-RS-8901', date: '2026-07-08', liters: 45, cost: 72.00, odometer: 95300 },
  { id: 'FL-904', vehicle: 'GJ-18-CD-9081', date: '2026-07-07', liters: 95, cost: 152.00, odometer: 45200 }];


const initialExpenses = [
  { id: 'EX-301', vehicle: 'GJ-01-AB-1234', type: 'Tolls', cost: 45.00, date: '2026-07-11', description: 'I-80 Tollway pass charge.' },
  { id: 'EX-302', vehicle: 'GJ-05-KL-3210', type: 'Maintenance', cost: 1250.00, date: '2026-07-10', description: 'Radiator unit rebuild fees.' },
  { id: 'EX-303', vehicle: 'GJ-12-PQ-4567', type: 'Permit', cost: 150.00, date: '2026-07-08', description: 'State carrier registration permit.' },
  { id: 'EX-304', vehicle: 'GJ-27-EF-5678', type: 'Insurance', cost: 300.00, date: '2026-07-05', description: 'Monthly courier liability insurance.' }];


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
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            Fuel & Expenses Ledger
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 uppercase tracking-widest">
              Read Only
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            Monitor fleet refueling logs, administrative expenses, and vehicle cost totals.
          </p>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Total Refuel Expenditures</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white block mt-1">₹{totalFuelCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mt-1">Refueled {initialFuelLogs.reduce((sum, i) => sum + i.liters, 0)} Liters</span>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg text-orange-500 border border-orange-100">
            <FaGasPump className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">General Fleet Expenses</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white block mt-1">₹{totalOtherExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mt-1">tolls, insurance, maintenance</span>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg text-orange-500 border border-orange-100">
            <FaDollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Total Cost Summary</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white block mt-1">₹{(totalFuelCost + totalOtherExpenses).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider block mt-1">Within Monthly Allocation Limit</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500 border border-emerald-100">
            <FaDollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search/Filters */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5">
        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm mb-auto py-2">
          <FiFilter className="text-orange-500 w-4.5 h-4.5" />
          <span className="uppercase tracking-wider text-xs">Filter Expenses</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
            Expense Category
          </label>
          <select
            value={expenseFilter}
            onChange={(e) => setExpenseFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 font-medium focus:outline-none">

            <option value="All">All Categories</option>
            <option value="Tolls">Tolls</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Insurance">Insurance</option>
            <option value="Permit">Permit</option>
          </select>
        </div>

        <button
          onClick={() => { setExpenseFilter('All'); setSearchQuery(''); }}
          className="h-[38px] flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg px-4 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700">

          <FiRefreshCw />
          <span>RESET</span>
        </button>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-6">Expense Breakdown by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Fuel', value: totalFuelCost },
                    { name: 'Tolls', value: initialExpenses.filter(e => e.type === 'Tolls').reduce((s, e) => s + e.cost, 0) },
                    { name: 'Maintenance', value: initialExpenses.filter(e => e.type === 'Maintenance').reduce((s, e) => s + e.cost, 0) },
                    { name: 'Insurance', value: initialExpenses.filter(e => e.type === 'Insurance').reduce((s, e) => s + e.cost, 0) },
                    { name: 'Permit', value: initialExpenses.filter(e => e.type === 'Permit').reduce((s, e) => s + e.cost, 0) }
                  ].filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {
                    [
                      { name: 'Fuel', value: totalFuelCost },
                      { name: 'Tolls', value: initialExpenses.filter(e => e.type === 'Tolls').reduce((s, e) => s + e.cost, 0) },
                      { name: 'Maintenance', value: initialExpenses.filter(e => e.type === 'Maintenance').reduce((s, e) => s + e.cost, 0) },
                      { name: 'Insurance', value: initialExpenses.filter(e => e.type === 'Insurance').reduce((s, e) => s + e.cost, 0) },
                      { name: 'Permit', value: initialExpenses.filter(e => e.type === 'Permit').reduce((s, e) => s + e.cost, 0) }
                    ].filter(d => d.value > 0).map((entry, index) => {
                      const colors = ['#f97316', '#3b82f6', '#10b981', '#f43f5e', '#8b5cf6'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })
                  }
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-6">Recent Fuel Logs Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={initialFuelLogs.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(value, name) => [name === 'cost' ? `₹${value}` : `${value}L`, name === 'cost' ? 'Cost' : 'Liters']} />
                <Legend />
                <Bar dataKey="liters" name="Liters" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" name="Cost" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Refueling Table */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Refueling Logs</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Refuel ID</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Vehicle</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Refuel Date</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Liters</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFuel.map((f) =>
                <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900/50">
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white text-xs">{f.id}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">{f.vehicle}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400">{f.date}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400">{f.liters} L</td>
                  <td className="px-6 py-4 text-right font-mono text-xs font-bold text-slate-700 dark:text-slate-200">₹{f.cost.toFixed(2)}</td>
                </tr>
                  )}
                </tbody>
              </table>
        </div>

        {/* General Expenses Table */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Operational Expense Logs</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Expense ID</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Vehicle</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map((e) =>
                <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900/50">
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white text-xs">{e.id}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">{e.vehicle}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${e.type === 'Tolls' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                        e.type === 'Maintenance' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                          e.type === 'Permit' ? 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700' :
                            'bg-emerald-50 text-emerald-600 border border-emerald-200'}`
                    }>
                      {e.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{e.date}</td>
                  <td className="px-6 py-4 text-right font-mono text-xs font-bold text-slate-700 dark:text-slate-200">₹{e.cost.toFixed(2)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};