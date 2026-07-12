import { Link, useParams } from 'react-router-dom';
import { SafetyOfficerPageShell, Badge, SectionCard } from './SafetyOfficerPageShell';
import { getMaintenanceById } from './safetyOfficerData';

export const MaintenanceDetailsPage = () => {
  const { maintenanceId } = useParams();
  const job = getMaintenanceById(maintenanceId);

  return (
    <SafetyOfficerPageShell activeTab="Maintenance" title={`${job.id} Details`} subtitle="Service record and safety impact.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Work order" subtitle="Maintenance metadata.">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div><span className="font-semibold text-slate-800 dark:text-white">Vehicle:</span> {job.vehicle}</div>
            <div><span className="font-semibold text-slate-800 dark:text-white">Type:</span> {job.type}</div>
            <div><span className="font-semibold text-slate-800 dark:text-white">Owner:</span> {job.owner}</div>
            <div><span className="font-semibold text-slate-800 dark:text-white">Due:</span> {job.due}</div>
            <div><span className="font-semibold text-slate-800 dark:text-white">Findings:</span> {job.findings}</div>
          </div>
        </SectionCard>
        <SectionCard title="Safety status" subtitle="Current work state.">
          <div className="space-y-4">
            <Badge value={job.status} />
            <Badge value={job.priority} />
            <p className="text-sm text-slate-600 dark:text-slate-300">The vehicle remains blocked until the work order is closed and reviewed by the safety desk.</p>
          </div>
        </SectionCard>
        <SectionCard title="Actions" subtitle="Recommended next steps.">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>• Confirm replacement parts and sign-off documentation.</p>
            <p>• Re-inspect the vehicle before release from the workshop.</p>
            <p>• Update dispatch if the repair impacts route availability.</p>
            <Link to="/dashboard/safety/maintenance" className="inline-flex mt-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">Back to maintenance</Link>
          </div>
        </SectionCard>
      </div>
    </SafetyOfficerPageShell>
  );
};