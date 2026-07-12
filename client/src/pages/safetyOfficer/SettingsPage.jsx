import { useMemo, useState } from 'react';
import {
  Bell,
  Brush,
  Building2,
  Check,
  CircleUserRound,
  Clock3,
  Cog,
  Info,
  KeyRound,
  LogOut,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
  UserRound,
} from 'lucide-react';
import { SafetyOfficerPageShell } from './SafetyOfficerPageShell';

const settingsMenu = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'general', label: 'General', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'fleet', label: 'Fleet Configuration', icon: Truck },
  { id: 'rbac', label: 'Roles & Permissions', icon: KeyRound },
  { id: 'appearance', label: 'Appearance', icon: Brush },
  { id: 'about', label: 'About System', icon: Info },
];

const rbacRows = [
  { role: 'Fleet Manager', fleet: true, drivers: true, trips: true, fuelExpenses: true, analytics: true, permissions: 'Full Access' },
  { role: 'Dispatcher', fleet: false, drivers: true, trips: true, fuelExpenses: false, analytics: true, permissions: 'Operational Access' },
  { role: 'Safety Officer', fleet: true, drivers: true, trips: true, fuelExpenses: false, analytics: true, permissions: 'Safety & Compliance' },
  { role: 'Financial Analyst', fleet: false, drivers: false, trips: false, fuelExpenses: true, analytics: true, permissions: 'Finance & Reports' },
];

const menuTitleById = {
  profile: 'Profile',
  general: 'General',
  notifications: 'Notifications',
  security: 'Security',
  fleet: 'Fleet Configuration',
  rbac: 'Roles & Permissions',
  appearance: 'Appearance',
  about: 'About System',
};

const Card = ({ title, subtitle, children, action }) => (
  <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
    {(title || subtitle || action) && (
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {title && <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </div>
    )}
    {children}
  </section>
);

const Label = ({ children }) => (
  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 dark:text-slate-500">{children}</label>
);

const TextInput = ({ readOnly = false, value, onChange, type = 'text', placeholder }) => (
  <input
    type={type}
    readOnly={readOnly}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition ${readOnly ? 'cursor-not-allowed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 dark:text-slate-500' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'}`}
  />
);

const SelectInput = ({ value, onChange, children }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-700 dark:text-slate-200 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
  >
    {children}
  </select>
);

const SaveButton = ({ children }) => (
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
  >
    {children}
  </button>
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? 'bg-orange-500' : 'bg-slate-300'}`}
    aria-pressed={checked}
  >
    <span className={`inline-block h-5 w-5 transform rounded-full bg-white dark:bg-slate-800 shadow transition ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </button>
);

const ToggleRow = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3">
    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const CheckCell = ({ value }) => (
  <div className="flex justify-center">
    {value ? <Check className="h-4 w-4 text-emerald-600" /> : <span className="h-4 w-4 rounded-full border border-slate-300" />}
  </div>
);

export const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    fullName: 'Development User',
    email: 'developer@transitops.com',
    phone: '9876543210',
    role: 'Safety Officer',
    department: 'Operations Safety',
  });
  const [general, setGeneral] = useState({
    companyName: 'TransitOps Pvt Ltd',
    companyEmail: 'contact@transitops.com',
    contactNumber: '+91 22 4567 8900',
    address: 'Mumbai Operations Hub, India',
    timezone: 'Asia/Kolkata (GMT+5:30)',
    currency: 'INR',
    distanceUnit: 'Kilometers',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    tripUpdates: true,
    maintenanceAlerts: true,
    fuelExpenseAlerts: false,
    licenseExpiryAlerts: true,
    weeklyReports: true,
  });
  const [security, setSecurity] = useState({
    sessionTimeout: '30 min',
    lastLogin: '2026-07-12 09:15 AM',
  });
  const [fleetConfig, setFleetConfig] = useState({
    defaultVehicleStatus: 'Available',
    maintenanceReminder: '5000 KM',
    fuelUnit: 'Liters',
    defaultCurrency: 'INR',
    maximumLoadWarning: '90%',
  });
  const [appearance, setAppearance] = useState({
    theme: 'Light',
    primaryColor: 'Orange',
    compactMode: false,
    fontSize: 'Medium',
  });

  const lastUpdated = useMemo(() => new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }), []);

  const sectionContent = {
    profile: (
      <Card
        title="Profile"
        subtitle="Manage your personal account details."
        action={<SaveButton>Save Changes</SaveButton>}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2 flex items-center gap-4 rounded-xl border border-orange-200 bg-orange-50 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-orange-500 shadow-sm">
              <CircleUserRound className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">Profile Picture</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">Upload is disabled in mock mode.</p>
            </div>
          </div>
          <div>
            <Label>Full Name</Label>
            <TextInput value={profile.fullName} onChange={(event) => setProfile({ ...profile, fullName: event.target.value })} />
          </div>
          <div>
            <Label>Email Address</Label>
            <TextInput readOnly value={profile.email} />
          </div>
          <div>
            <Label>Phone Number</Label>
            <TextInput value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} />
          </div>
          <div>
            <Label>Assigned Role</Label>
            <TextInput readOnly value={profile.role} />
          </div>
          <div className="md:col-span-2">
            <Label>Department</Label>
            <TextInput value={profile.department} onChange={(event) => setProfile({ ...profile, department: event.target.value })} />
          </div>
        </div>
      </Card>
    ),
    general: (
      <Card title="General" subtitle="Manage company-level configuration." action={<SaveButton>Save Settings</SaveButton>}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Label>Company Name</Label>
            <TextInput value={general.companyName} onChange={(event) => setGeneral({ ...general, companyName: event.target.value })} />
          </div>
          <div>
            <Label>Company Email</Label>
            <TextInput type="email" value={general.companyEmail} onChange={(event) => setGeneral({ ...general, companyEmail: event.target.value })} />
          </div>
          <div>
            <Label>Contact Number</Label>
            <TextInput value={general.contactNumber} onChange={(event) => setGeneral({ ...general, contactNumber: event.target.value })} />
          </div>
          <div>
            <Label>Address</Label>
            <TextInput value={general.address} onChange={(event) => setGeneral({ ...general, address: event.target.value })} />
          </div>
          <div>
            <Label>Time Zone</Label>
            <SelectInput value={general.timezone} onChange={(event) => setGeneral({ ...general, timezone: event.target.value })}>
              <option>Asia/Kolkata (GMT+5:30)</option>
              <option>UTC (GMT+0)</option>
              <option>America/New_York (GMT-5)</option>
            </SelectInput>
          </div>
          <div>
            <Label>Currency</Label>
            <SelectInput value={general.currency} onChange={(event) => setGeneral({ ...general, currency: event.target.value })}>
              <option>INR</option>
              <option>USD</option>
            </SelectInput>
          </div>
          <div>
            <Label>Distance Unit</Label>
            <SelectInput value={general.distanceUnit} onChange={(event) => setGeneral({ ...general, distanceUnit: event.target.value })}>
              <option>Kilometers</option>
              <option>Miles</option>
            </SelectInput>
          </div>
        </div>
      </Card>
    ),
    notifications: (
      <Card title="Notifications" subtitle="Control the alerts and reports you receive." action={<SaveButton>Save Preferences</SaveButton>}>
        <div className="space-y-3">
          <ToggleRow label="Email Notifications" checked={notifications.emailNotifications} onChange={(value) => setNotifications({ ...notifications, emailNotifications: value })} />
          <ToggleRow label="Trip Updates" checked={notifications.tripUpdates} onChange={(value) => setNotifications({ ...notifications, tripUpdates: value })} />
          <ToggleRow label="Maintenance Alerts" checked={notifications.maintenanceAlerts} onChange={(value) => setNotifications({ ...notifications, maintenanceAlerts: value })} />
          <ToggleRow label="Fuel Expense Alerts" checked={notifications.fuelExpenseAlerts} onChange={(value) => setNotifications({ ...notifications, fuelExpenseAlerts: value })} />
          <ToggleRow label="License Expiry Alerts" checked={notifications.licenseExpiryAlerts} onChange={(value) => setNotifications({ ...notifications, licenseExpiryAlerts: value })} />
          <ToggleRow label="Weekly Reports" checked={notifications.weeklyReports} onChange={(value) => setNotifications({ ...notifications, weeklyReports: value })} />
        </div>
      </Card>
    ),
    security: (
      <Card title="Security" subtitle="Session and credential-related controls.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Change Password</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">Reset account password in a secure flow.</p>
            <button type="button" className="mt-3 inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50">
              <KeyRound className="h-4 w-4" />
              Change Password
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Logout from All Devices</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">Terminate all active sessions across devices.</p>
            <button type="button" className="mt-3 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
              <LogOut className="h-4 w-4" />
              Logout All Sessions
            </button>
          </div>
          <div>
            <Label>Session Timeout</Label>
            <SelectInput value={security.sessionTimeout} onChange={(event) => setSecurity({ ...security, sessionTimeout: event.target.value })}>
              <option>15 min</option>
              <option>30 min</option>
              <option>1 Hour</option>
              <option>Never</option>
            </SelectInput>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold">Last Login Time</p>
            <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <Clock3 className="h-4 w-4 text-orange-500" />
              {security.lastLogin}
            </div>
          </div>
        </div>
      </Card>
    ),
    fleet: (
      <Card title="Fleet Configuration" subtitle="Default values for operational setup." action={<SaveButton>Save Configuration</SaveButton>}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Label>Default Vehicle Status</Label>
            <SelectInput value={fleetConfig.defaultVehicleStatus} onChange={(event) => setFleetConfig({ ...fleetConfig, defaultVehicleStatus: event.target.value })}>
              <option>Available</option>
              <option>On Trip</option>
              <option>In Shop</option>
            </SelectInput>
          </div>
          <div>
            <Label>Maintenance Reminder</Label>
            <TextInput value={fleetConfig.maintenanceReminder} onChange={(event) => setFleetConfig({ ...fleetConfig, maintenanceReminder: event.target.value })} />
          </div>
          <div>
            <Label>Fuel Unit</Label>
            <TextInput value={fleetConfig.fuelUnit} onChange={(event) => setFleetConfig({ ...fleetConfig, fuelUnit: event.target.value })} />
          </div>
          <div>
            <Label>Default Currency</Label>
            <SelectInput value={fleetConfig.defaultCurrency} onChange={(event) => setFleetConfig({ ...fleetConfig, defaultCurrency: event.target.value })}>
              <option>INR</option>
              <option>USD</option>
            </SelectInput>
          </div>
          <div>
            <Label>Maximum Load Warning</Label>
            <TextInput value={fleetConfig.maximumLoadWarning} onChange={(event) => setFleetConfig({ ...fleetConfig, maximumLoadWarning: event.target.value })} />
          </div>
        </div>
      </Card>
    ),
    rbac: (
      <Card title="Roles & Permissions" subtitle="Read-only RBAC visibility matrix for the current release.">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="min-w-full divide-y divide-slate-200 bg-white dark:bg-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 dark:text-slate-500">Role</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 dark:text-slate-500">Fleet</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 dark:text-slate-500">Drivers</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 dark:text-slate-500">Trips</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 dark:text-slate-500">Fuel & Expenses</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 dark:text-slate-500">Analytics</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 dark:text-slate-500">Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rbacRows.map((row) => (
                <tr key={row.role} className="hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900/70">
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800 dark:text-white">{row.role}</td>
                  <td className="px-4 py-3"><CheckCell value={row.fleet} /></td>
                  <td className="px-4 py-3"><CheckCell value={row.drivers} /></td>
                  <td className="px-4 py-3"><CheckCell value={row.trips} /></td>
                  <td className="px-4 py-3"><CheckCell value={row.fuelExpenses} /></td>
                  <td className="px-4 py-3"><CheckCell value={row.analytics} /></td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.permissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    ),
    appearance: (
      <Card title="Appearance" subtitle="Control display preferences for your workspace.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Label>Theme</Label>
            <div className="space-y-2">
              <div className="rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2.5 text-sm font-medium text-orange-700">Light</div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">Dark (Coming Soon)</div>
            </div>
          </div>
          <div>
            <Label>Primary Color</Label>
            <TextInput readOnly value={appearance.primaryColor} />
          </div>
          <div>
            <Label>Compact Mode</Label>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5">
              <Toggle checked={appearance.compactMode} onChange={(value) => setAppearance({ ...appearance, compactMode: value })} />
            </div>
          </div>
          <div>
            <Label>Font Size</Label>
            <SelectInput value={appearance.fontSize} onChange={(event) => setAppearance({ ...appearance, fontSize: event.target.value })}>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </SelectInput>
          </div>
        </div>
      </Card>
    ),
    about: (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          { title: 'Application Name', value: 'TransitOps', icon: Cog },
          { title: 'Version', value: '1.0.0', icon: SlidersHorizontal },
          { title: 'Frontend', value: 'React + Vite', icon: CircleUserRound },
          { title: 'Backend', value: 'Node.js + Express', icon: Building2 },
          { title: 'Database', value: 'MySQL', icon: Truck },
          { title: 'Authentication', value: 'JWT', icon: ShieldCheck },
          { title: 'Environment', value: 'Development', icon: Info },
          { title: 'Last Updated', value: lastUpdated, icon: Clock3 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-orange-600">
                <Icon className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 dark:text-slate-500">{item.title}</p>
              </div>
              <p className="mt-3 text-base font-semibold text-slate-800 dark:text-white">{item.value}</p>
            </article>
          );
        })}
      </div>
    ),
  };

  return (
    <SafetyOfficerPageShell
      activeTab="Settings"
      title="Settings"
      subtitle="Manage your account preferences, application configuration and system settings."
      showSearch={false}
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 shadow-sm xl:sticky xl:top-24 xl:h-fit">
          <nav className="space-y-1">
            {settingsMenu.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeSection;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${isActive ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-orange-50 hover:text-orange-700'}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 dark:text-slate-500">
            <SlidersHorizontal className="h-3.5 w-3.5 text-orange-500" />
            {menuTitleById[activeSection]}
          </div>
          {sectionContent[activeSection]}
        </section>
      </div>
    </SafetyOfficerPageShell>
  );
};