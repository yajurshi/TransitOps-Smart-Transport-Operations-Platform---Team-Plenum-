import React, { useState } from 'react';
import { FiLock, FiLogOut } from 'react-icons/fi';

export const Profile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMsg(null);
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMsg('All password fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg('New passwords do not match.');
      return;
    }
    setMsg('Password updated successfully!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    alert('Logged out successfully (Simulated). Redirecting to login...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">User Account Profile</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            Manage your credentials, change password, and check role information.
          </p>
        </div>
      </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* User Info Details card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5 flex flex-col items-center text-center">
              {/* Profile Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-white font-extrabold text-3xl border-4 border-white shadow-lg ring-4 ring-orange-100">
                AM
              </div>

              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">Alex Mercer</h3>
                <span className="inline-block mt-1 text-[10px] font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-orange-200/50">
                  Dispatcher (Operations)
                </span>
              </div>

              <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Email Address</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mt-0.5">alex.mercer@transitops.com</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Mobile Phone</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mt-0.5">+1 555-019-382</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Security Department</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mt-0.5">Logistics & Route Dispatch</span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg border border-rose-200 transition-all active:scale-95 mt-auto">
                
                <FiLogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Change Password Card */}
            <div className="md:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <FiLock className="text-orange-500 w-4 h-4" />
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Change Password Security</h3>
              </div>

              {msg &&
              <div className={`p-3 rounded-lg text-xs font-bold ${
              msg.includes('success') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`
              }>
                  {msg}
                </div>
              }

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
                  
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                    New Secure Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
                  
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
                  
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all shadow-md shadow-orange-500/20 active:scale-95">
                  
                  Update Credentials
                </button>
              </form>
            </div>
          </div>
    </div>
  );
};