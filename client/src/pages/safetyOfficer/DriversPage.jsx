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

      <SectionCard title="Driver roster" subtitle="Select a record for detailed compliance and history.">
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
          ]}
        />
      </SectionCard>

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