import React from 'react';
import { FiSettings, FiCheck, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export const Settings = () => {
  const { theme, setTheme } = useTheme();

  const rbacMatrix = [
  { module: 'Fleet Assets', manager: true, dispatcher: false, safety: true, finance: false },
  { module: 'Driver registry', manager: true, dispatcher: false, safety: true, finance: false },
  { module: 'Trips & Dispatch', manager: true, dispatcher: true, safety: false, finance: false },
  { module: 'Maintenance Scheduled', manager: true, dispatcher: false, safety: true, finance: false },
  { module: 'Fuel & Expense logs', manager: true, dispatcher: false, safety: false, finance: true },
  { module: 'Analytics & CSV logs', manager: true, dispatcher: true, safety: true, finance: true }];


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            System Parameters
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 uppercase tracking-widest">
              View Only
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            Overview of organization configurations, regional settings, and role permissions matrix.
          </p>
        </div>
      </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* General Settings Info */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <FiSettings className="text-orange-500 w-4 h-4" />
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Organization Profile</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Central Depot Address</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">100 Logistics Pkwy, Chicago, IL</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Default Currency</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">USD ($)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Distance Metric Unit</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mt-1">Kilometers (km)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Support Contact Email</span>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 block mt-1">operations-support@transitops.com</span>
                  </div>
                </div>
              </div>

              {/* Appearance Settings */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  {theme === 'dark' ? <FiMoon className="text-orange-500 w-4 h-4" /> : <FiSun className="text-orange-500 w-4 h-4" />}
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Appearance</h3>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                    <input 
                      type="radio" 
                      name="theme" 
                      value="light" 
                      checked={theme === 'light'} 
                      onChange={() => setTheme('light')} 
                      className="text-orange-500 focus:ring-orange-500" 
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Light Mode</span>
                      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Default high contrast view</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                    <input 
                      type="radio" 
                      name="theme" 
                      value="dark" 
                      checked={theme === 'dark'} 
                      onChange={() => setTheme('dark')} 
                      className="text-orange-500 focus:ring-orange-500" 
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Dark Mode</span>
                      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Low-glare optimized for nighttime</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: RBAC Matrix */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Role-Based Access Matrix (RBAC)</h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">RBAC configurations are read-only for security reasons.</p>
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Module / Asset</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Fleet Manager</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Dispatcher</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Safety Officer</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Financial Analyst</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rbacMatrix.map((row, idx) =>
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900/50">
                        <td className="px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200">{row.module}</td>
                        <td className="px-4 py-3 text-center">
                          {row.manager ? <FiCheck className="text-emerald-500 mx-auto w-4.5 h-4.5" /> : <FiX className="text-slate-300 mx-auto w-4 h-4" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.dispatcher ? <FiCheck className="text-emerald-500 mx-auto w-4.5 h-4.5" /> : <FiX className="text-slate-300 mx-auto w-4 h-4" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.safety ? <FiCheck className="text-emerald-500 mx-auto w-4.5 h-4.5" /> : <FiX className="text-slate-300 mx-auto w-4 h-4" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.finance ? <FiCheck className="text-emerald-500 mx-auto w-4.5 h-4.5" /> : <FiX className="text-slate-300 mx-auto w-4 h-4" />}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </div>
  );
};