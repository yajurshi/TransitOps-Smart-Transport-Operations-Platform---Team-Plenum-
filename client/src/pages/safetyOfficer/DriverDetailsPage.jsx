import { Link, useParams } from 'react-router-dom';
import { SafetyOfficerPageShell, Badge, SectionCard } from './SafetyOfficerPageShell';
import { getDriverById } from './safetyOfficerData';

export const DriverDetailsPage = () => {
  const { driverId } = useParams();
  const driver = getDriverById(driverId);

  return (
    <SafetyOfficerPageShell activeTab="Drivers" title={`${driver.name} Details`} subtitle="Compliance profile and readiness summary.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Identity" subtitle="Driver record overview.">
          <div className="space-y-4 text-sm text-slate-600">
            <div><span className="font-semibold text-slate-800">Driver ID:</span> {driver.id}</div>
            <div><span className="font-semibold text-slate-800">License:</span> {driver.license}</div>
            <div><span className="font-semibold text-slate-800">Phone:</span> {driver.phone}</div>
            <div><span className="font-semibold text-slate-800">Shift:</span> {driver.shift}</div>
            <div><span className="font-semibold text-slate-800">Last check:</span> {driver.lastCheck}</div>
          </div>
        </SectionCard>
        <SectionCard title="Risk posture" subtitle="Current compliance state.">
          <div className="space-y-4">
            <Badge value={driver.status} />
            <Badge value={driver.risk} />
            <div className="text-sm text-slate-600 space-y-2">
              <p>Safety score: <span className="font-semibold text-slate-800">{driver.score}</span></p>
              <p>Violations recorded: <span className="font-semibold text-slate-800">{driver.violations}</span></p>
              <p>Primary route: <span className="font-semibold text-slate-800">{driver.route}</span></p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Actions" subtitle="Next steps for the safety desk.">
          <div className="space-y-3 text-sm text-slate-600">
            <p>• Review pre-shift checklist before release.</p>
            <p>• Confirm drug and fatigue compliance if the route changes.</p>
            <p>• Escalate to dispatch if the risk state changes.</p>
            <Link to="/dashboard/safety/drivers" className="inline-flex mt-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">Back to roster</Link>
          </div>
        </SectionCard>
      </div>
    </SafetyOfficerPageShell>
  );
};