import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const Analytics = () => {
  const handleExportCSV = () => {
    // Generate a dummy CSV for operational stats
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

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar activeTab="Analytics" />
      <div className="flex-1 pl-64 flex flex-col min-h-screen overflow-y-auto">
        <Navbar
          userName="Alex Mercer"
          role="Fleet Manager"
          searchQuery=""
          onSearchChange={() => {}} />
        

        <main className="flex-1 p-8 pt-24 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                Operational Analytics
                <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
                  Intelligence
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Analyze fleet utilization trends, fuel efficiencies, and operational budget parameters.
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all border border-slate-200 shadow-sm">
              
              <FiDownload className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Analytics Visualizations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart 1: Fleet Utilization Trend */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Fleet Utilization Trend (Weekly)</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Avg 83%</span>
              </div>
              <div className="h-48 flex items-end gap-3 justify-between pt-4">
                {[65, 78, 72, 85, 83, 90, 83].map((val, idx) =>
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-100 rounded-t-lg h-36 relative overflow-hidden border border-slate-200/50">
                      <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-orange-500 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.05 }} />
                    
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">W{idx + 1}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Chart 2: Refuel efficiency parameters */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Fuel Efficiency Comparison (km/L)</span>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">Target: 5.0</span>
              </div>
              <div className="h-48 flex items-end gap-5 justify-between pt-4">
                {[
                { label: 'Heavy Duty', val: 3.8 },
                { label: 'Light Truck', val: 5.2 },
                { label: 'Transit Van', val: 6.8 },
                { label: 'Sedan Courier', val: 12.4 }].
                map((item, idx) =>
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-12 bg-slate-100 rounded-t-lg h-36 relative overflow-hidden border border-slate-200/50">
                      <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-orange-500 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${item.val / 14 * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.05 }} />
                    
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 text-center leading-tight">{item.label}</span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono mt-0.5">{item.val} L</span>
                  </div>
                )}
              </div>
            </div>

            {/* Chart 3: Operational Cost Distributions */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Operational Cost Breakdown (USD)</span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">$2,450 Total</span>
              </div>
              <div className="space-y-3.5">
                {[
                { label: 'Refuel Operations', cost: 1250, pct: 51, color: 'bg-orange-500' },
                { label: 'Maintenance & Repairs', cost: 680, pct: 28, color: 'bg-blue-500' },
                { label: 'Permits & Carrier Fees', cost: 320, pct: 13, color: 'bg-emerald-500' },
                { label: 'Tolls & Admin', cost: 200, pct: 8, color: 'bg-slate-400' }].
                map((item, idx) =>
                <div key={idx}>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>{item.label}</span>
                      <span className="font-mono">${item.cost.toLocaleString()} ({item.pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                      <motion.div
                      className={`h-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.1 }} />
                    
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chart 4: Trip Completion Performance */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Trip Execution Rates</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Target: 95%+</span>
              </div>
              <div className="flex items-center gap-8 py-4">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {/* Decorative circle chart */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="48" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="#f97316"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="301.6"
                      initial={{ strokeDashoffset: 301.6 }}
                      animate={{ strokeDashoffset: 301.6 * (1 - 0.968) }}
                      transition={{ duration: 1.2, ease: 'easeOut' }} />
                    
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-800">96.8%</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Success</span>
                  </div>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Performance Tier</span>
                    <span className="text-orange-600">Optimal Class</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold leading-normal">
                    This safety and completion percentage is calculated based on prompt delivery timestamps and route compliance.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>);

};