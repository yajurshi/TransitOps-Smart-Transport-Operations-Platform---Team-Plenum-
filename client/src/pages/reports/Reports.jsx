import React, { useState } from 'react';
import { FiDownload, FiFileText, FiRefreshCw, FiPrinter, FiFilter, FiCheckCircle, FiClock, FiTrendingUp, FiBarChart2, FiDollarSign } from 'react-icons/fi';
import { FaTruck, FaGasPump, FaRoute } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

// ─── Report Templates ────────────────────────────────────────────────────────
const REPORT_TEMPLATES = [
  {
    id: 'operational-cost',
    label: 'Operational Cost',
    icon: FiDollarSign,
    color: 'orange',
    description: 'Full breakdown of all operational spend across fuel, maintenance, tolls, and insurance.',
  },
  {
    id: 'fuel-consumption',
    label: 'Fuel Consumption',
    icon: FaGasPump,
    color: 'blue',
    description: 'Per-vehicle fuel usage, refueling frequency, and cost-per-km analysis.',
  },
  {
    id: 'vehicle-roi',
    label: 'Vehicle ROI',
    icon: FaTruck,
    color: 'emerald',
    description: 'Return on investment analysis for each registered vehicle asset.',
  },
  {
    id: 'monthly-expenses',
    label: 'Monthly Expenses',
    icon: FiBarChart2,
    color: 'purple',
    description: 'Month-over-month expense comparison across all cost categories.',
  },
  {
    id: 'revenue-summary',
    label: 'Revenue Summary',
    icon: FiTrendingUp,
    color: 'emerald',
    description: 'Freight revenue, trip billing totals, and net income calculations.',
  },
  {
    id: 'trip-analytics',
    label: 'Trip Analytics',
    icon: FaRoute,
    color: 'blue',
    description: 'Dispatch efficiency, on-time delivery rates, and route performance.',
  },
];

const COLOR_MAP = {
  orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600', ring: 'ring-orange-400', active: 'bg-orange-500' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', ring: 'ring-blue-400', active: 'bg-blue-500' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', ring: 'ring-emerald-400', active: 'bg-emerald-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', ring: 'ring-purple-400', active: 'bg-purple-500' },
};

// ─── Report Preview Charts ───────────────────────────────────────────────────
const opsCostData = [
  { name: 'Fuel', value: 38500, color: '#f97316' },
  { name: 'Maintenance', value: 15200, color: '#3b82f6' },
  { name: 'Permits', value: 7800, color: '#10b981' },
  { name: 'Tolls', value: 4200, color: '#8b5cf6' },
  { name: 'Insurance', value: 9300, color: '#f43f5e' },
];

const fuelConsumptionData = [
  { vehicle: 'GJ-01-AB-1234', liters: 180, cost: 28800 },
  { vehicle: 'GJ-06-MN-8765', liters: 75, cost: 12000 },
  { vehicle: 'GJ-03-RS-8901', liters: 45, cost: 7200 },
  { vehicle: 'GJ-18-CD-9081', liters: 95, cost: 15200 },
  { vehicle: 'GJ-27-EF-5678', liters: 60, cost: 9600 },
];

const monthlyExpenseData = [
  { month: 'Feb', fuel: 32000, maintenance: 12000, other: 8000 },
  { month: 'Mar', fuel: 35000, maintenance: 14000, other: 9000 },
  { month: 'Apr', fuel: 31000, maintenance: 11000, other: 7500 },
  { month: 'May', fuel: 38000, maintenance: 16000, other: 10000 },
  { month: 'Jun', fuel: 36000, maintenance: 13000, other: 9500 },
  { month: 'Jul', fuel: 38500, maintenance: 15200, other: 11000 },
];

const tripData = [
  { status: 'Completed', count: 64, color: '#10b981' },
  { status: 'Dispatched', count: 11, color: '#3b82f6' },
  { status: 'Cancelled', count: 3, color: '#f43f5e' },
  { status: 'Draft', count: 8, color: '#94a3b8' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs">
        <p className="font-bold text-slate-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-500">{p.name}:</span>
            <span className="font-black text-slate-800">
              {p.name.toLowerCase().includes('liters') ? `${p.value}L` : `₹${p.value.toLocaleString()}`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Main Component ──────────────────────────────────────────────────────────
export const Reports = ({ searchQuery = '' }) => {
  const { vehicles, trips, maintenance, drivers } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [dateRange, setDateRange] = useState('This Month');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleGenerate = () => {
    if (!selectedTemplate) return;
    setIsGenerating(true);
    setGeneratedReport(null);

    setTimeout(() => {
      const metrics = {
        totalItemsProcessed: trips.length + maintenance.length,
        estimatedTotal: '₹' + (trips.length * 1500 - maintenance.length * 500).toLocaleString(),
        activeResources: vehicles.filter(v => v.status === 'Available').length + drivers.length,
        timestamp: new Date().toLocaleString('en-IN'),
      };
      setGeneratedReport({ type: selectedTemplate.label, range: dateRange, data: metrics, id: selectedTemplate.id });
      setIsGenerating(false);
    }, 900);
  };

  const handleDownloadCSV = () => alert('Mock Action: Downloading CSV report...');
  const handleDownloadPDF = () => alert('Mock Action: Generating PDF report...');

  const renderReportChart = (id) => {
    switch (id) {
      case 'operational-cost':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Cost Distribution</h4>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={opsCostData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
                      {opsCostData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                    <Legend iconType="circle" iconSize={8} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Itemized Costs</h4>
              <div className="space-y-3">
                {opsCostData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      {item.name}
                    </span>
                    <span className="text-xs font-black text-slate-800 font-mono">₹{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'fuel-consumption':
        return (
          <div className="h-[280px]">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Fuel Consumption by Vehicle</h4>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={fuelConsumptionData} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="vehicle" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="liters" name="Liters Used" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={36} />
                <Bar dataKey="cost" name="Cost (₹)" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'monthly-expenses':
        return (
          <div className="h-[280px]">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Monthly Expense Trend</h4>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={monthlyExpenseData} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="fuel" name="Fuel" fill="#f97316" radius={[3, 3, 0, 0]} maxBarSize={24} />
                <Bar dataKey="maintenance" name="Maintenance" fill="#3b82f6" radius={[3, 3, 0, 0]} maxBarSize={24} />
                <Bar dataKey="other" name="Other" fill="#8b5cf6" radius={[3, 3, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'trip-analytics':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Trip Status Breakdown</h4>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={tripData} cx="50%" cy="50%" outerRadius={90} dataKey="count" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {tripData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => `${v} trips`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-3">
              {tripData.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    {item.status}
                  </span>
                  <span className="text-xs font-black text-slate-800">{item.count} trips</span>
                </div>
              ))}
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <p className="text-xs font-bold text-emerald-700">Success Rate: 96.8% ✓</p>
                <p className="text-[10px] text-emerald-600 mt-0.5">Above 95% target threshold</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-12 text-center flex flex-col items-center gap-3">
            <FiFileText className="w-14 h-14 text-slate-200" />
            <p className="text-sm font-bold text-slate-600">Report preview not available in mock mode.</p>
            <p className="text-xs text-slate-400">Download CSV or PDF for the full dataset.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Financial & Operational Reports
            <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-widest">
              Report Center
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Generate, preview, and export dynamic reports for operations, fuel, and profitability.
          </p>
        </div>
      </div>

      {/* Report Template Picker */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Step 1 — Select Report Type</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {REPORT_TEMPLATES.map((tpl) => {
            const c = COLOR_MAP[tpl.color];
            const isSelected = selectedTemplate?.id === tpl.id;
            const Icon = tpl.icon;
            return (
              <motion.button
                key={tpl.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setSelectedTemplate(tpl); setGeneratedReport(null); }}
                className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all text-center ${
                  isSelected
                    ? `${c.bg} ${c.border} border-2 shadow-md ring-2 ${c.ring} ring-offset-1`
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isSelected ? c.bg : 'bg-slate-50'} ${c.border} border`}>
                  <Icon className={`w-5 h-5 ${isSelected ? c.text : 'text-slate-400'}`} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider leading-tight ${isSelected ? c.text : 'text-slate-500'}`}>
                  {tpl.label}
                </span>
              </motion.button>
            );
          })}
        </div>
        {selectedTemplate && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs text-slate-500 font-medium">
            ℹ️ {selectedTemplate.description}
          </motion.p>
        )}
      </div>

      {/* Configuration Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-wrap items-end gap-5">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-auto py-2">
          <FiFilter className="text-orange-500 w-4 h-4" />
          <span className="uppercase tracking-wider text-xs">Step 2 — Configure & Generate</span>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Year to Date</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !selectedTemplate}
          className="h-[42px] flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white rounded-xl px-6 text-sm font-bold transition-all shadow-md shadow-orange-500/20 active:scale-95"
        >
          {isGenerating ? <FiRefreshCw className="animate-spin" /> : <FiFileText />}
          <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
        </button>
      </div>

      {/* Report Output */}
      <AnimatePresence mode="wait">
        {generatedReport ? (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Report Header */}
            <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-orange-50/30 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
                  <FiFileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-base">{generatedReport.type}</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Period: <strong>{generatedReport.range}</strong> &nbsp;•&nbsp; Generated: {generatedReport.data.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  <FiCheckCircle className="w-3 h-3" /> Ready to Export
                </span>
                <button onClick={handleDownloadCSV} className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm">
                  <FiDownload className="w-3.5 h-3.5" /> CSV
                </button>
                <button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm shadow-indigo-500/20">
                  <FiPrinter className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>

            {/* Summary KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-slate-100">
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-center gap-4">
                <div className="p-2.5 bg-orange-500 rounded-xl shadow-sm shadow-orange-500/20">
                  <FiClock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] text-orange-600 font-bold uppercase tracking-widest block">Items Processed</span>
                  <span className="text-2xl font-black text-orange-800">{generatedReport.data.totalItemsProcessed}</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-4">
                <div className="p-2.5 bg-emerald-500 rounded-xl shadow-sm shadow-emerald-500/20">
                  <FiTrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest block">Net Estimated Value</span>
                  <span className="text-2xl font-black text-emerald-800">{generatedReport.data.estimatedTotal}</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-4">
                <div className="p-2.5 bg-blue-500 rounded-xl shadow-sm shadow-blue-500/20">
                  <FaTruck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest block">Active Resources</span>
                  <span className="text-2xl font-black text-blue-800">{generatedReport.data.activeResources}</span>
                </div>
              </div>
            </div>

            {/* Chart Preview */}
            <div className="p-6">
              {renderReportChart(generatedReport.id)}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl p-16 text-center"
          >
            <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <FiFileText className="w-9 h-9 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">No Report Generated</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              {selectedTemplate
                ? `Click "Generate Report" to build your ${selectedTemplate.label} report for ${dateRange}.`
                : 'Select a report type above and configure the date range, then click Generate.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
