import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAuth } from '../hooks/useAuth';

export const RolePageLayout = ({ activeTab, title, subtitle, children, showSearch = true, searchPlaceholder }) => {
  const { user, role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} />
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <Navbar
          userName={user?.fullName || 'Safety Officer'}
          role={role || 'Safety Officer'}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
        />

        <main className="flex-1 p-8 pt-24 space-y-6 max-w-7xl w-full mx-auto">
          {(title || subtitle) && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {title && <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>}
                {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};