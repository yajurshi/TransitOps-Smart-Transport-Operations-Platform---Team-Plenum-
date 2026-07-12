import { SafetyOfficerPageShell, Badge, SectionCard } from './SafetyOfficerPageShell';

export const ProfilePage = () => {
  return (
    <SafetyOfficerPageShell activeTab="Profile" title="Profile" subtitle="Safety officer account summary.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Account" subtitle="Current operator profile.">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div><span className="font-semibold text-slate-800 dark:text-white">Name:</span> Safety Officer</div>
            <div><span className="font-semibold text-slate-800 dark:text-white">Team:</span> Operations Safety</div>
            <div><span className="font-semibold text-slate-800 dark:text-white">Region:</span> North / West</div>
            <div><span className="font-semibold text-slate-800 dark:text-white">Shift:</span> Day Coverage</div>
          </div>
        </SectionCard>
        <SectionCard title="Permissions" subtitle="Access scope.">
          <div className="space-y-3">
            <Badge value="Drivers" />
            <Badge value="Trips" />
            <Badge value="Maintenance" />
            <Badge value="Analytics" />
          </div>
        </SectionCard>
        <SectionCard title="Activity" subtitle="Recent safety work.">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>• Reviewed 4 driver records this shift.</p>
            <p>• Closed 2 maintenance notes.</p>
            <p>• Escalated 1 delayed trip for follow-up.</p>
          </div>
        </SectionCard>
      </div>
    </SafetyOfficerPageShell>
  );
};