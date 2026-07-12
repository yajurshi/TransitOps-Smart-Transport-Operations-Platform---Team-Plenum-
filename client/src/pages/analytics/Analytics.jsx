import React, { useState } from 'react';
import { FiDownload, FiTrendingUp, FiTrendingDown, FiZap, FiActivity, FiBarChart2 } from 'react-icons/fi';
import { FaGasPump, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar,
  Legend, LineChart, Line
} from 'recharts';

// ─── Mock Data ─────────────────────────────────────────────────────────────
const weeklyUtilization = [
  { week: 'W1', utilization: 65, target: 80 },
  { week: 'W2', utilization: 78, target: 80 },
  { week: 'W3', utilization: 72, target: 80 },
  { week: 'W4', utilization: 85, target: 80 },
  { week: 'W5', utilization: 83, target: 80 },
  { week: 'W6', utilization: 90, target: 80 },
  { week: 'W7', utilization: 87, target: 80 },
  { week: 'W8', utilization: 93, target: 80 },
];

const fuelData = [
  { vehicle: 'Heavy Duty', efficiency: 3.8, cost: 38000 },
  { vehicle: 'Light Truck', efficiency: 5.2, cost: 22000 },
  { vehicle: 'Tata Intra V30', efficiency: 6.8, cost: 18000 },
  { vehicle: 'Ashok Dost+', efficiency: 12.4, cost: 9500 },
  { vehicle: 'Eicher Pro', efficiency: 4.5, cost: 31000 },
];

const costBreakdown = [
  { name: 'Fuel', value: 38500, color: '#f97316' },
  { name: 'Maintenance', value: 15200, color: '#3b82f6' },
  { name: 'Permits', value: 7800, color: '#10b981' },
  { name: 'Tolls', value: 4200, color: '#8b5cf6' },
  { name: 'Insurance', value: 9300, color: '#f43f5e' },
];

const tripTrendData = [
  { month: 'Feb', completed: 42, cancelled: 3, dispatched: 5 },
  { month: 'Mar', completed: 58, cancelled: 2, dispatched: 7 },
  { month: 'Apr', completed: 53, cancelled: 4, dispatched: 6 },
  { month: 'May', completed: 67, cancelled: 1, dispatched: 8 },
  { month: 'Jun', completed: 71, cancelled: 2, dispatched: 9 },
  { month: 'Jul', completed: 64, cancelled: 3, dispatched: 11 },
];

const radialData = [{ name: 'Trip Success', value: 96.8, fill: '#f97316' }];

// ─── Custom Tooltip ─────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, prefix = '', suffix = '' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-3 text-xs">
        <p className="font-bold text-slate-700 mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-500 font-medium">{p.name}:</span>
            <span className="font-black text-slate-800">{prefix}{p.value}{suffix}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ─── KPI Card ───────────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, icon: Icon, trend, trendUp, color = 'orange' }) => {
  const colors = {
    orange: { bg: 'bg-orange-50', text: 'text-orange-500', border: 'border-orange-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-500', border: 'border-blue-100' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-500', border: 'border-emerald-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-500', border: 'border-purple-100' },
  };
  const c = colors[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${c.bg} ${c.border} border`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trendUp ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <span className="text-2xl font-black text-slate-800 block">{value}</span>
        <span className="text-xs font-bold text-slate-500 block mt-0.5">{label}</span>
        {sub && <span className="text-[10px] font-medium text-slate-400 block mt-1">{sub}</span>}
      </div>
    </motion.div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
export const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Metric,Value,Status\n" +
      "Fleet Utilization,83%,Optimal\n" +
      "Fuel Efficiency,4.8 km/L,Within Limits\n" +
      "Trip Completion Rate,96.8%,Excellent\n" +
      "Active Repairs,2 vehicles,Normal";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transitops_operational_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalCost = costBreakdown.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            Operational Analytics
            <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2.5 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
              Intelligence
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time fleet performance metrics, cost insights, and route efficiency trends.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all border border-slate-200 shadow-sm"
        >
          <FiDownload className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Fleet Utilization" value="83%" sub="Weekly avg across all vehicles" icon={FaTruck} trend="+5% vs last week" trendUp color="orange" />
        <KpiCard label="Fuel Efficiency" value="4.8 km/L" sub="Fleet-wide average" icon={FaGasPump} trend="-2% vs target" trendUp={false} color="blue" />
        <KpiCard label="Trip Success Rate" value="96.8%" sub="On-time deliveries" icon={FiActivity} trend="+1.2% vs last month" trendUp color="emerald" />
        <KpiCard label="Total Op. Cost" value={`₹${(totalCost / 1000).toFixed(0)}K`} sub="This month across all categories" icon={FiBarChart2} trend="+8% vs last month" trendUp={false} color="purple" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Utilization Trend - Area Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Fleet Utilization Trend</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Weekly % vs target (80%)</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Avg 83%</span>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyUtilization} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="utilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} />
                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
                <Tooltip content={<CustomTooltip suffix="%" />} />
                <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={1.5} fill="none" strokeDasharray="5 3" name="Target" />
                <Area type="monotone" dataKey="utilization" stroke="#f97316" strokeWidth={2.5} fill="url(#utilGrad)" name="Utilization" dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fuel Efficiency - Bar Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Fuel Efficiency by Vehicle</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">km/L performance comparison</p>
            </div>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">Target: 5.0 km/L</span>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="vehicle" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} unit=" km/L" />
                <Tooltip content={<CustomTooltip suffix=" km/L" />} />
                <Bar dataKey="efficiency" name="Efficiency" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {fuelData.map((entry, index) => (
                    <Cell key={index} fill={entry.efficiency >= 5.0 ? '#10b981' : '#f97316'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] font-bold">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Above Target</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500 inline-block" /> Below Target</span>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cost Breakdown - Donut */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Cost Breakdown</h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Total: ₹{totalCost.toLocaleString()}</p>
          </div>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={costBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {costBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {costBreakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-slate-700">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trip Trend - Stacked Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Trip Volume Trends</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Monthly completed, dispatched & cancelled</p>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tripTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
                <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="dispatched" name="Dispatched" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="cancelled" name="Cancelled" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Trip Success Radial + Operational Cost Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trip Success Radial */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Trip Execution Rate</h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">On-time delivery performance</p>
          </div>
          <div className="flex items-center gap-8 flex-1">
            {/* SVG Circle */}
            <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="72" cy="72" r="60" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                <motion.circle
                  cx="72" cy="72" r="60"
                  stroke="#f97316" strokeWidth="10" fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray="377"
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 377 * (1 - 0.968) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-800">96.8%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Success</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: 'Completed On-Time', val: 96.8, color: 'bg-emerald-500' },
                { label: 'Delayed (Acceptable)', val: 2.1, color: 'bg-amber-500' },
                { label: 'Cancelled / Failed', val: 1.1, color: 'bg-rose-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>{item.label}</span>
                    <span className="font-mono">{item.val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${item.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-100">
                Target: ≥95% • Performance Tier: <span className="text-orange-600 font-bold">Optimal Class</span>
              </p>
            </div>
          </div>
        </div>

        {/* Operational Cost Progress Bars */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Cost Allocation</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">vs. monthly budget ceiling</p>
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
              Budget: ₹85,000
            </span>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Fuel Operations', spent: 38500, budget: 40000, color: 'bg-orange-500' },
              { label: 'Maintenance & Repairs', spent: 15200, budget: 20000, color: 'bg-blue-500' },
              { label: 'Permits & Carrier Fees', spent: 7800, budget: 8000, color: 'bg-amber-500' },
              { label: 'Tolls & Admin', spent: 4200, budget: 6000, color: 'bg-slate-400' },
              { label: 'Insurance', spent: 9300, budget: 10000, color: 'bg-purple-500' },
            ].map((item, i) => {
              const pct = Math.round((item.spent / item.budget) * 100);
              const isOver = pct > 90;
              return (
                <div key={i}>
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-slate-600">{item.label}</span>
                    <span className={`font-mono ${isOver ? 'text-rose-600' : 'text-slate-700'}`}>
                      ₹{item.spent.toLocaleString()} / ₹{item.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${isOver ? 'bg-rose-500' : item.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.08 }}
                    />
                  </div>
                  <span className={`text-[9px] font-bold mt-0.5 block ${isOver ? 'text-rose-500' : 'text-slate-400'}`}>
                    {pct}% utilized{isOver ? ' — Approaching Limit' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};