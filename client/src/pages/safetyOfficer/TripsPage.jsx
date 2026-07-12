import { Link } from 'react-router-dom';
import { SafetyOfficerPageShell, Badge, SectionCard, StatGrid, TableCard } from './SafetyOfficerPageShell';
import { tripRecords } from './safetyOfficerData';

export const TripsPage = () => {
  return (
    <SafetyOfficerPageShell activeTab="Trips" title="Trips" subtitle="Track safety-critical trip states and alerts.">
      <StatGrid
        items={[
          { label: 'Trips on trip', value: '12', note: 'Currently in motion' },
          { label: 'Delayed trips', value: '3', note: 'Escalated to dispatch' },
          { label: 'Completed today', value: '19', note: 'All logbooks received' },
          { label: 'Hazard alerts', value: '2', note: 'Under review' },
        ]}
      />

      <SectionCard title="Trip log" subtitle="Operational visibility for the safety desk.">
        <TableCard
          rows={tripRecords}
          rowLinkPrefix="/dashboard/safety/trips"
          columns={[
            { key: 'id', label: 'Trip ID' },
            { key: 'title', label: 'Trip', render: (row) => <div className="font-semibold text-slate-800">{row.title}</div> },
            { key: 'driver', label: 'Driver' },
            { key: 'route', label: 'Route' },
            { key: 'status', label: 'Status', render: (row) => <Badge value={row.status} /> },
            { key: 'hazard', label: 'Hazard', render: (row) => <Badge value={row.hazard} /> },
          ]}
        />
      </SectionCard>

      <SectionCard title="Trip notes" subtitle="Safety review checkpoints.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
          <p>• Confirm the driver has passed the pre-trip inspection checklist.</p>
          <p>• Monitor hazard scores on long-haul and nighttime runs.</p>
          <p>• Attach incident notes before a trip is marked complete.</p>
        </div>
      </SectionCard>

      <div className="flex flex-wrap gap-3">
        {tripRecords.map((trip) => (
          <Link key={trip.id} to={`/dashboard/safety/trips/${trip.id}`} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-colors">
            {trip.id}
          </Link>
        ))}
      </div>
    </SafetyOfficerPageShell>
  );
};