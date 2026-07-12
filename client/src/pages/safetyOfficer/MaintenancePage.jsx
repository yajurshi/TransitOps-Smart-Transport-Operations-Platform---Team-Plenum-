import { Link } from 'react-router-dom';
import { SafetyOfficerPageShell, Badge, SectionCard, StatGrid, TableCard } from './SafetyOfficerPageShell';
import { maintenanceRecords } from './safetyOfficerData';

export const MaintenancePage = () => {
  return (
    <SafetyOfficerPageShell activeTab="Maintenance" title="Maintenance" subtitle="Track safety-related inspections and repairs.">
      <StatGrid
        items={[
          { label: 'Open jobs', value: '7', note: 'Awaiting workshop slots' },
          { label: 'In progress', value: '4', note: 'Technician assigned' },
          { label: 'Closed today', value: '5', note: 'All cleared for service' },
          { label: 'High priority', value: '1', note: 'Needs immediate attention' },
        ]}
      />

      <SectionCard title="Maintenance queue" subtitle="Safety actions that can block vehicle release.">
        <TableCard
          rows={maintenanceRecords}
          rowLinkPrefix="/dashboard/safety/maintenance"
          columns={[
            { key: 'id', label: 'Job ID' },
            { key: 'title', label: 'Job', render: (row) => <div className="font-semibold text-slate-800 dark:text-white">{row.title}</div> },
            { key: 'vehicle', label: 'Vehicle' },
            { key: 'type', label: 'Type' },
            { key: 'status', label: 'Status', render: (row) => <Badge value={row.status} /> },
            { key: 'priority', label: 'Priority', render: (row) => <Badge value={row.priority} /> },
          ]}
        />
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Risk notes" subtitle="What the safety desk watches closely.">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>• Any open brake or steering issue prevents dispatch approval.</p>
            <p>• Calibration drift must be resolved before the next safety run.</p>
            <p>• Closed jobs should keep the inspection trace attached to the asset.</p>
          </div>
        </SectionCard>
        <SectionCard title="Quick links" subtitle="Jump into the repair record.">
          <div className="flex flex-wrap gap-3">
            {maintenanceRecords.map((record) => (
              <Link key={record.id} to={`/dashboard/safety/maintenance/${record.id}`} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                {record.id}
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>
    </SafetyOfficerPageShell>
  );
};