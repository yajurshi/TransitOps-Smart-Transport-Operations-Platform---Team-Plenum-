import React, { useState, useEffect } from 'react';
import { 
  User, Building2, Bell, Shield, Settings2, ShieldAlert, 
  Palette, Database, Webhook, Activity, HeartPulse, Brain, 
  Info, HelpCircle, Save, X, Key, History, Download, Trash2,
  Plug, Play, CheckCircle2, AlertTriangle, FileText, Smartphone,
  Check, Moon, Sun, Monitor
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { TransitOpsLogo } from '../../components/TransitOpsLogo';

// Dummy data for sections
const mockRecentLogins = [
  { id: 1, device: 'Chrome on Windows', ip: '192.168.1.105', time: 'Today, 10:45 AM', location: 'Ahmedabad, GJ' },
  { id: 2, device: 'Safari on iPhone', ip: '10.0.0.42', time: 'Yesterday, 08:30 PM', location: 'Surat, GJ' },
];

const mockActivityLogs = [
  { id: 1, time: '10:45 AM', user: 'Hency Patel', action: 'Theme Changed', category: 'System', status: 'Success' },
  { id: 2, time: '09:12 AM', user: 'Rohan Desai', action: 'Trip Created', category: 'Operations', status: 'Success' },
  { id: 3, time: '08:30 AM', user: 'System', action: 'Backup Data', category: 'Database', status: 'Failed' },
  { id: 4, time: 'Yesterday', user: 'Karan Mehta', action: 'Driver Suspended', category: 'Security', status: 'Success' },
];

/* ──────────────────────────────────────────────────────────────────────────
   1. Profile
────────────────────────────────────────────────────────────────────────── */
export const ProfileSection = () => {
  const { user, role, notify } = useAuth();
  const userName = user?.fullName || 'Hency Patel';
  const userRole = role || 'Fleet Manager';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
  
  const handleSave = () => {
    notify('Profile updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Profile Settings</h2>
        <p className="text-xs text-slate-500">Manage your personal information and account details.</p>
      </div>

      <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-500/20">
          {userInitials}
        </div>
        <div>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition">
            Change Avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
          <input type="text" defaultValue={userName} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
          <input type="text" defaultValue="+91 98765 43210" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department</label>
          <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition">
            <option>Operations</option>
            <option>Finance</option>
            <option>Management</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email (Read Only)</label>
          <input type="email" defaultValue={`${userName.split(' ')[0].toLowerCase()}@transitops.in`} disabled className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed" />
        </div>
      </div>

      <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100 flex flex-wrap gap-6 text-sm">
        <div><span className="block text-[10px] font-bold text-orange-600/70 uppercase">Employee ID</span><span className="font-semibold text-orange-900">EMP-8821</span></div>
        <div><span className="block text-[10px] font-bold text-orange-600/70 uppercase">Assigned Role</span><span className="font-semibold text-orange-900">{userRole}</span></div>
        <div><span className="block text-[10px] font-bold text-orange-600/70 uppercase">Last Login</span><span className="font-semibold text-orange-900">Today, 10:45 AM</span></div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-slate-100">
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-500/20 transition active:scale-95">
          <Save size={16} /> Save Changes
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-sm font-bold transition active:scale-95">
          <X size={16} /> Cancel
        </button>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   2. Organization
────────────────────────────────────────────────────────────────────────── */
export const OrganizationSection = () => {
  const { notify } = useAuth();
  return (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-lg font-bold text-slate-800">Organization Settings</h2>
      <p className="text-xs text-slate-500">Manage company details, branding, and regional localization.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
        <input type="text" defaultValue="TransitOps Logistics Pvt. Ltd." className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Email</label>
        <input type="email" defaultValue="support@transitops.in" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
        <input type="text" defaultValue="+91-79-4000-1234" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</label>
        <input type="text" defaultValue="Gandhinagar, Gujarat" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition" />
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timezone</label>
        <select className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-orange-500"><option>IST (UTC+5:30)</option></select>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Currency</label>
        <select className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-orange-500"><option>INR (₹)</option></select>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Distance</label>
        <select className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-orange-500"><option>Kilometers (km)</option></select>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date Format</label>
        <select className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-orange-500"><option>DD/MM/YYYY</option></select>
      </div>
    </div>

    <button onClick={() => notify('Organization settings saved', 'success')} className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-500/20 transition active:scale-95">
      <Save size={16} /> Save Settings
    </button>
  </div>
);
};

/* ──────────────────────────────────────────────────────────────────────────
   3. Notifications
────────────────────────────────────────────────────────────────────────── */
const Toggle = ({ label, defaultChecked = true }) => {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition shadow-sm">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <button onClick={() => setOn(!on)} className={`relative w-10 h-6 rounded-full transition-colors ${on ? 'bg-orange-500' : 'bg-slate-300'}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${on ? 'left-5' : 'left-1'}`} />
      </button>
    </div>
  );
};

export const NotificationsSection = () => {
  const { notify } = useAuth();
  return (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-lg font-bold text-slate-800">Notification Preferences</h2>
      <p className="text-xs text-slate-500">Control how and when you receive system alerts.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Toggle label="Email Notifications" />
      <Toggle label="Trip Updates" />
      <Toggle label="Fuel Alerts" />
      <Toggle label="Maintenance Alerts" />
      <Toggle label="Expense Alerts" defaultChecked={false} />
      <Toggle label="Weekly Reports" />
      <Toggle label="Monthly Reports" defaultChecked={false} />
      <Toggle label="Driver License Alerts" />
      <Toggle label="Push Notifications (Coming Soon)" defaultChecked={false} />
    </div>

    <button onClick={() => notify('Notification preferences updated', 'success')} className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-500/20 transition active:scale-95">
      <Save size={16} /> Save Preferences
    </button>
  </div>
);
};

/* ──────────────────────────────────────────────────────────────────────────
   4. Security
────────────────────────────────────────────────────────────────────────── */
export const SecuritySection = () => {
  const { notify } = useAuth();
  return (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-lg font-bold text-slate-800">Security & Authentication</h2>
      <p className="text-xs text-slate-500">Protect your account and review active sessions.</p>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2"><Key size={16} className="text-orange-500"/> Change Password</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="password" placeholder="Current Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
        <input type="password" placeholder="New Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
        <input type="password" placeholder="Confirm Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <p className="text-[11px] text-slate-400">Password last changed 45 days ago.</p>
        <button onClick={() => notify('Password updated successfully!', 'success')} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition">Update Password</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
         <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Two-Factor Auth</h3>
         <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
         <button disabled className="px-4 py-2 bg-orange-100 text-orange-400 rounded-lg text-xs font-bold w-full cursor-not-allowed">Enable 2FA (Coming Soon)</button>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
         <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Session Management</h3>
         <p className="text-xs text-slate-500">Automatically logout after period of inactivity.</p>
         <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"><option>30 Minutes</option><option>1 Hour</option><option>Never</option></select>
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2"><History size={16} className="text-orange-500"/> Recent Login History</h3>
        <button onClick={() => notify('Logged out of all other sessions.', 'info')} className="text-[10px] text-rose-600 font-bold uppercase tracking-widest hover:underline">Logout All Devices</button>
      </div>
      <div className="divide-y divide-slate-100">
        {mockRecentLogins.map(l => (
          <div key={l.id} className="p-4 flex items-center justify-between text-sm">
            <div>
              <p className="font-bold text-slate-700">{l.device}</p>
              <p className="text-[11px] text-slate-400">{l.location} • {l.ip}</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">{l.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

/* ──────────────────────────────────────────────────────────────────────────
   5. Fleet Configuration
────────────────────────────────────────────────────────────────────────── */
export const FleetConfigSection = () => {
  const { notify } = useAuth();
  return (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-lg font-bold text-slate-800">Fleet Operations Config</h2>
      <p className="text-xs text-slate-500">Configure global parameters and thresholds for vehicles and trips.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { label: 'Vehicle Default Status', options: ['Available', 'In Shop', 'Retired'] },
        { label: 'Maintenance Reminder Interval', options: ['5,000 km', '10,000 km', '15,000 km'] },
        { label: 'Fuel Unit', options: ['Litres (L)', 'Gallons (gal)'] },
        { label: 'Distance Unit', options: ['Kilometers (km)', 'Miles (mi)'] },
        { label: 'Maximum Load Warning %', options: ['80%', '90%', '100%'] },
        { label: 'Trip Auto Status', options: ['Draft', 'Dispatched'] },
        { label: 'Maintenance Threshold', options: ['Alert at 10% remaining', 'Alert at 20% remaining'] },
        { label: 'Default Currency', options: ['INR (₹)', 'USD ($)'] },
      ].map((conf, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
           <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{conf.label}</span>
           <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none font-semibold text-slate-700">
             {conf.options.map(o => <option key={o}>{o}</option>)}
           </select>
        </div>
      ))}
    </div>

    <button onClick={() => notify('Fleet configuration applied', 'success')} className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-500/20 transition active:scale-95">
      <Save size={16} /> Apply Configuration
    </button>
  </div>
);
};

/* ──────────────────────────────────────────────────────────────────────────
   6. Roles & Permissions (RBAC)
────────────────────────────────────────────────────────────────────────── */
const rbacMatrix = [
  { module: 'Dashboard', manager: true, dispatcher: true, safety: true, finance: true },
  { module: 'Fleet Assets', manager: true, dispatcher: false, safety: true, finance: false },
  { module: 'Driver Registry', manager: true, dispatcher: false, safety: true, finance: false },
  { module: 'Trips & Dispatch', manager: true, dispatcher: true, safety: false, finance: false },
  { module: 'Maintenance Scheduled', manager: true, dispatcher: false, safety: true, finance: false },
  { module: 'Fuel & Expense Logs', manager: true, dispatcher: false, safety: false, finance: true },
  { module: 'Analytics & Reporting', manager: true, dispatcher: true, safety: true, finance: true },
  { module: 'System Settings', manager: true, dispatcher: false, safety: false, finance: false }
];

export const RolesPermissionsSection = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-lg font-bold text-slate-800">Role-Based Access Matrix</h2>
      <p className="text-xs text-slate-500">Overview of organizational roles and their access levels (Read-only).</p>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module</th>
            {['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'].map(role => (
              <th key={role} className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">{role}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rbacMatrix.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3 text-xs font-bold text-slate-700">{row.module}</td>
              {[row.manager, row.dispatcher, row.safety, row.finance].map((hasAccess, i) => (
                <td key={i} className="px-4 py-3 text-center">
                  {hasAccess ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
   7. Appearance
────────────────────────────────────────────────────────────────────────── */
export const AppearanceSection = () => {
  const { notify } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('transitops-theme') || 'Light');
  
  const handleSave = () => {
    localStorage.setItem('transitops-theme', theme);
    notify(`Appearance saved. Theme: ${theme}`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-lg font-bold text-slate-800">UI & Appearance</h2>
        <p className="text-xs text-slate-500">Customize how TransitOps looks on your device.</p>
      </div>

      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Color Theme</h3>
        <div className="grid grid-cols-3 gap-4">
           {[{n:'Light',i:Sun},{n:'Dark',i:Moon},{n:'System',i:Monitor}].map(t => (
             <button key={t.n} onClick={() => setTheme(t.n)} className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition ${theme === t.n ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-300 bg-white'}`}>
               <t.i size={24} className={theme === t.n ? 'text-orange-600' : 'text-slate-400'} />
               <span className={`text-xs font-bold ${theme === t.n ? 'text-orange-700' : 'text-slate-600'}`}>{t.n}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Accent Color</label>
          <div className="flex gap-2">
             <div className="w-8 h-8 rounded-full bg-orange-500 ring-2 ring-offset-2 ring-orange-500 cursor-pointer"></div>
             <div className="w-8 h-8 rounded-full bg-blue-500 opacity-50 cursor-not-allowed"></div>
             <div className="w-8 h-8 rounded-full bg-emerald-500 opacity-50 cursor-not-allowed"></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
             <label className="text-sm font-bold text-slate-700 block">Compact Mode</label>
             <span className="text-[10px] text-slate-400">Reduce spacing in tables and lists.</span>
           </div>
           <Toggle label="" defaultChecked={false} />
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
             <label className="text-sm font-bold text-slate-700 block">Sidebar Collapse</label>
             <span className="text-[10px] text-slate-400">Keep sidebar minimized by default.</span>
           </div>
           <Toggle label="" defaultChecked={false} />
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Font Size</label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none font-semibold text-slate-700">
            <option>Default (14px)</option>
            <option>Large (16px)</option>
          </select>
        </div>
      </div>

      <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-500/20 transition active:scale-95">
        <Save size={16} /> Save Preference
      </button>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   8. Data & Reports
────────────────────────────────────────────────────────────────────────── */
export const DataReportsSection = () => {
  const { notify } = useAuth();
  return (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-lg font-bold text-slate-800">Data Management</h2>
      <p className="text-xs text-slate-500">Export your data, manage backups, and perform system resets.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { title: 'Export CSV', desc: 'Download tabular data.', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
        { title: 'Export PDF', desc: 'Download visual reports.', icon: Download, color: 'text-rose-500', bg: 'bg-rose-50' },
        { title: 'Download Reports', desc: 'Get full monthly archive.', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-50' }
      ].map((card, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-center gap-3">
          <div className={`p-3 rounded-full ${card.bg} ${card.color}`}><card.icon size={24} /></div>
          <div><h4 className="font-bold text-sm text-slate-800">{card.title}</h4><p className="text-[11px] text-slate-400 mt-1">{card.desc}</p></div>
        </div>
      ))}
    </div>

    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">System Administration</h3>
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-100 transition shadow-sm disabled:opacity-50" disabled>
           Backup Data (Coming Soon)
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-100 transition shadow-sm disabled:opacity-50" disabled>
           Restore Backup (Coming Soon)
        </button>
        <button onClick={() => notify('Local cache cleared', 'success')} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-100 transition shadow-sm">
           Clear Cache
        </button>
      </div>
      <div className="pt-4 mt-4 border-t border-rose-100">
         <button onClick={() => notify('Are you sure? This requires admin password.', 'info')} className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 transition">
           <Trash2 size={14}/> Reset Application Data
         </button>
      </div>
    </div>
  </div>
);
};

/* ──────────────────────────────────────────────────────────────────────────
   9. Integrations
────────────────────────────────────────────────────────────────────────── */
const integrations = [
  { name: 'Google Maps API', cat: 'Routing', connected: true },
  { name: 'GPS Tracking Gateway', cat: 'Telematics', connected: true },
  { name: 'SMTP Email Service', cat: 'Communications', connected: true },
  { name: 'SMS Alerts API', cat: 'Communications', connected: false },
  { name: 'Fuel Card Provider', cat: 'Finance', connected: false },
  { name: 'Enterprise ERP', cat: 'Data Sync', connected: false }
];

export const IntegrationsSection = () => {
  const { notify } = useAuth();
  return (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-lg font-bold text-slate-800">System Integrations</h2>
      <p className="text-xs text-slate-500">Manage third-party API connections and webhooks.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {integrations.map((int, i) => (
        <div key={i} className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-orange-200 transition">
          <div className="flex gap-4 items-center">
            <div className={`p-3 rounded-xl ${int.connected ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
              <Plug size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800">{int.name}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{int.cat}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${int.connected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
              {int.connected ? 'Connected' : 'Disconnected'}
            </span>
            <button onClick={() => notify(int.connected ? `${int.name} configured.` : `Connected to ${int.name}`, 'success')} className={`text-xs font-bold hover:underline ${int.connected ? 'text-slate-400' : 'text-blue-600'}`}>
              {int.connected ? 'Configure' : 'Connect'}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

/* ──────────────────────────────────────────────────────────────────────────
   10. Activity Logs
────────────────────────────────────────────────────────────────────────── */
export const ActivityLogsSection = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Audit & Activity Logs</h2>
        <p className="text-xs text-slate-500">Timeline of all system actions.</p>
      </div>
      <input type="text" placeholder="Search logs..." className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-orange-500 shadow-sm" />
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative">
      <div className="absolute left-9 top-6 bottom-6 w-px bg-slate-100"></div>
      <div className="space-y-6 relative">
        {mockActivityLogs.map(log => (
          <div key={log.id} className="flex gap-4">
            <div className={`w-6 h-6 rounded-full border-4 border-white shrink-0 z-10 flex items-center justify-center ${log.status === 'Success' ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
            <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
               <div className="flex justify-between items-start">
                 <p className="text-sm font-bold text-slate-700">{log.action}</p>
                 <span className="text-[10px] font-semibold text-slate-400">{log.time}</span>
               </div>
               <div className="flex gap-3 mt-1.5 text-[11px] font-medium text-slate-500">
                 <span>User: <strong className="text-slate-700">{log.user}</strong></span>
                 <span>Cat: {log.category}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button className="text-xs font-bold text-orange-500 hover:underline">Load More History</button>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
   11. Fleet Health
────────────────────────────────────────────────────────────────────────── */
export const FleetHealthSection = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-lg font-bold text-slate-800">Fleet Health Metrics</h2>
      <p className="text-xs text-slate-500">Overview of operational capacity and costs.</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       {[
         { l: 'Fleet Utilization', v: '84%' },
         { l: 'Vehicles Available', v: '12' },
         { l: 'Vehicles On Trip', v: '45' },
         { l: 'In Maintenance', v: '3' },
         { l: 'Drivers On Duty', v: '48' },
         { l: 'Pending Trips', v: '8' },
         { l: 'Fuel Efficiency', v: '4.2 km/L' },
         { l: 'Maintenance Cost', v: '₹ 1.2L' },
       ].map((m,i) => (
         <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-center text-center">
           <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{m.l}</span>
           <span className="text-xl font-black text-slate-800 mt-1">{m.v}</span>
         </div>
       ))}
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
   12. AI Fleet Insights
────────────────────────────────────────────────────────────────────────── */
export const AIFleetInsightsSection = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Brain className="text-purple-500"/> AI Fleet Insights</h2>
        <p className="text-xs text-slate-500">Intelligent recommendations based on historical data.</p>
      </div>
      <span className="text-[10px] bg-purple-50 text-purple-600 border border-purple-100 px-2 py-1 rounded-full font-bold uppercase tracking-widest">Beta Engine</span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 flex gap-4">
        <AlertTriangle className="text-rose-500 shrink-0" />
        <div>
          <h4 className="font-bold text-sm text-rose-900">Budget Exceeded</h4>
          <p className="text-xs text-rose-700 mt-1">Vehicle GJ-01-AB-1234 has exceeded its quarterly maintenance budget by 14%.</p>
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex gap-4">
        <Info className="text-amber-500 shrink-0" />
        <div>
          <h4 className="font-bold text-sm text-amber-900">Fuel Efficiency Drop</h4>
          <p className="text-xs text-amber-700 mt-1">Overall fleet fuel expenses increased by 12% this week. Check heavy duty trucks.</p>
        </div>
      </div>
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex gap-4">
        <CheckCircle2 className="text-emerald-500 shrink-0" />
        <div>
          <h4 className="font-bold text-sm text-emerald-900">High ROI Asset</h4>
          <p className="text-xs text-emerald-700 mt-1">Tata Intra V30 (GJ-18-CD-9081) is currently generating the highest ROI.</p>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4">
        <ShieldAlert className="text-blue-500 shrink-0" />
        <div>
          <h4 className="font-bold text-sm text-blue-900">Compliance Warning</h4>
          <p className="text-xs text-blue-700 mt-1">Three driver licenses are expiring this month. Renewals required.</p>
        </div>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
   13. About System
────────────────────────────────────────────────────────────────────────── */
export const AboutSystemSection = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center text-center py-10">
    <TransitOpsLogo size={80} showText={false} />
    <div className="mt-4">
      <h2 className="text-2xl font-black text-slate-800">TransitOps</h2>
      <p className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em]">Operations Platform</p>
    </div>
    <span className="text-xs font-bold text-slate-400 border px-3 py-1 rounded-full">Version 1.0.0-enterprise</span>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mt-8">
      {[
        { l: 'Frontend', v: 'React + Vite' },
        { l: 'Backend', v: 'Node.js + Express' },
        { l: 'Database', v: 'MySQL' },
        { l: 'Auth', v: 'JWT' },
        { l: 'Build Date', v: 'July 2026' },
        { l: 'Environment', v: 'Development' },
      ].map((s,i) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.l}</span>
          <span className="block text-xs font-bold text-slate-700 mt-0.5">{s.v}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
   14. Help & Support
────────────────────────────────────────────────────────────────────────── */
export const HelpSupportSection = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-lg font-bold text-slate-800">Help & Support</h2>
      <p className="text-xs text-slate-500">Get assistance and read system documentation.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { t: 'Documentation', d: 'Read the user manual.', i: FileText },
        { t: 'FAQs', d: 'Common questions answered.', i: HelpCircle },
        { t: 'Report a Bug', d: 'Found an issue? Let us know.', i: ShieldAlert },
        { t: 'Contact Support', d: 'Talk to our tech team.', i: Smartphone },
        { t: 'Privacy Policy', d: 'Data handling rules.', i: Shield },
        { t: 'Terms & Conditions', d: 'Usage agreements.', i: FileText },
        { t: 'Release Notes', d: 'What\'s new in v1.0.', i: Play }
      ].map((c, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-orange-300 hover:shadow-md transition cursor-pointer flex gap-3 items-center group">
          <div className="p-2.5 bg-slate-50 rounded-lg group-hover:bg-orange-50 group-hover:text-orange-600 transition text-slate-400">
            <c.i size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-700">{c.t}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">{c.d}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
