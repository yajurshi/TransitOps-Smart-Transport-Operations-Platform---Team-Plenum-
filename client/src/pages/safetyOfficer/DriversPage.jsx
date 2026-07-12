import { Link } from 'react-router-dom';
import { SafetyOfficerPageShell, Badge, SectionCard, StatGrid, TableCard } from './SafetyOfficerPageShell';
import { driverRecords } from './safetyOfficerData';

export const DriversPage = () => {
  return (
    <SafetyOfficerPageShell
      activeTab="Drivers"
      title="Drivers"
      subtitle="Monitor clearance, shift status, and compliance readiness."
      searchPlaceholder="Search drivers by name, route or license..."
    >
      <StatGrid
        items={[
          { label: 'Cleared drivers', value: '24', note: 'Available for assignment' },
          { label: 'Needs review', value: '6', note: 'Safety team follow-up pending' },
          { label: 'High risk', value: '1', note: 'Escalated this morning' },
          { label: 'Avg. score', value: '92', note: 'Across active drivers' },
        ]}
      />

      <div className="flex justify-between items-center mb-6">
        <SectionCard title="Driver roster" subtitle="Select a record for detailed compliance and history." className="mb-0 border-none shadow-none p-0 w-full" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl text-sm transition-colors whitespace-nowrap shadow-sm">
          + Create Driver
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8">
        <TableCard
          rows={driverRecords}
          rowLinkPrefix="/dashboard/safety/drivers"
          columns={[
            { key: 'id', label: 'Driver ID' },
            { key: 'name', label: 'Driver', render: (row) => <div className="font-semibold text-slate-800">{row.name}</div> },
            { key: 'route', label: 'Primary route' },
            { key: 'license', label: 'License' },
            { key: 'status', label: 'Status', render: (row) => <Badge value={row.status} /> },
            { key: 'risk', label: 'Risk', render: (row) => <Badge value={row.risk} /> },
            { key: 'actions', label: 'Actions', render: (row) => (
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold px-2 py-1 rounded bg-blue-50">Edit</button>
                  <button className="text-orange-600 hover:text-orange-800 text-xs font-semibold px-2 py-1 rounded bg-orange-50">Suspend</button>
                  <button className="text-emerald-600 hover:text-emerald-800 text-xs font-semibold px-2 py-1 rounded bg-emerald-50">Reactivate</button>
                </div>
              ) 
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Safety controls" subtitle="Core actions for daily oversight.">
          <div className="space-y-3 text-sm text-slate-600">
            <p>• Pull up a driver profile to review certifications and incident history.</p>
            <p>• Flag a record for re-training when the risk score falls below policy thresholds.</p>
            <p>• Share a readiness summary with dispatch before releasing a shift.</p>
          </div>
        </SectionCard>
        <SectionCard title="Quick access" subtitle="Jump into a specific driver record.">
          <div className="flex flex-wrap gap-3">
            {driverRecords.map((driver) => (
              <Link key={driver.id} to={`/dashboard/safety/drivers/${driver.id}`} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                {driver.name}
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>
    </SafetyOfficerPageShell>
  );
};