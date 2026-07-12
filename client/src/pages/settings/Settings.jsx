import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  User, Building2, Bell, Shield, Settings2, ShieldAlert,
  Palette, Database, Webhook, Activity, HeartPulse, Brain,
  Info, HelpCircle, ChevronRight
} from 'lucide-react';

import {
  ProfileSection,
  OrganizationSection,
  NotificationsSection,
  SecuritySection,
  FleetConfigSection,
  RolesPermissionsSection,
  AppearanceSection,
  DataReportsSection,
  IntegrationsSection,
  ActivityLogsSection,
  FleetHealthSection,
  AIFleetInsightsSection,
  AboutSystemSection,
  HelpSupportSection
} from './SettingsSections';

const MENU_ITEMS = [
  { id: 'profile', label: 'Profile', icon: User, roles: ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'] },
  { id: 'organization', label: 'Organization', icon: Building2, roles: ['Fleet Manager'] },
  { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'] },
  { id: 'security', label: 'Security', icon: Shield, roles: ['Fleet Manager'] },
  { id: 'fleet-config', label: 'Fleet Configuration', icon: Settings2, roles: ['Fleet Manager'] },
  { id: 'appearance', label: 'Appearance', icon: Palette, roles: ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'] },
  { id: 'data', label: 'Data & Reports', icon: Database, roles: ['Fleet Manager'] },
  { id: 'integrations', label: 'Integrations', icon: Webhook, roles: ['Fleet Manager'] },
  { id: 'health', label: 'Fleet Health', icon: HeartPulse, roles: ['Fleet Manager'] },
  { id: 'ai', label: 'AI Fleet Insights', icon: Brain, roles: ['Fleet Manager'] },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, roles: ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'] },
];

export const Settings = () => {
  const { role } = useAuth();
  const currentRole = role || 'Fleet Manager';

  // Filter menu items based on Role
  const availableMenuItems = MENU_ITEMS.filter(item => item.roles.includes(currentRole));

  const [activeTab, setActiveTab] = useState(availableMenuItems[0]?.id || 'profile');

  const renderSection = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSection />;
      case 'organization': return <OrganizationSection />;
      case 'notifications': return <NotificationsSection />;
      case 'security': return <SecuritySection />;
      case 'fleet-config': return <FleetConfigSection />;
      case 'rbac': return <RolesPermissionsSection />;
      case 'appearance': return <AppearanceSection />;
      case 'data': return <DataReportsSection />;
      case 'integrations': return <IntegrationsSection />;
      case 'activity': return <ActivityLogsSection />;
      case 'health': return <FleetHealthSection />;
      case 'ai': return <AIFleetInsightsSection />;
      case 'about': return <AboutSystemSection />;
      case 'help': return <HelpSupportSection />;
      default: return <ProfileSection />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-140px)] animate-in fade-in duration-300">

      {/* LEFT: Settings Navigation (Sticky) */}
      <div className="w-full lg:w-64 shrink-0">
        <div className="sticky top-6 space-y-1">
          <div className="mb-6 px-2">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Settings</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Manage system preferences.</p>
          </div>

          <nav className="flex flex-col space-y-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            {availableMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                      : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={16} className="text-orange-200" />}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* RIGHT: Selected Settings Content */}
      <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-3xl shadow-sm p-6 lg:p-10">
        {renderSection()}
      </div>
    </div>
  );
};