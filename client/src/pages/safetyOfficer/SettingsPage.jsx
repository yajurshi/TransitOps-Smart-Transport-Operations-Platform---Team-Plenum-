import { SafetyOfficerPageShell, SectionCard } from './SafetyOfficerPageShell';

export const SettingsPage = () => {
  return (
    <SafetyOfficerPageShell activeTab="Settings" title="Settings" subtitle="Safety desk preferences and alert routing.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Alert preferences" subtitle="Controls for operational escalation.">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>• Notify the safety desk when a trip changes to delayed or high hazard.</p>
            <p>• Escalate maintenance jobs with braking or steering impact immediately.</p>
            <p>• Send shift-end compliance summaries to the duty manager.</p>
          </div>
        </SectionCard>
        <SectionCard title="Review cadence" subtitle="How frequently records are checked.">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>• Driver checks: Every shift start.</p>
            <p>• Trip checks: Every 30 minutes in transit.</p>
            <p>• Maintenance checks: Twice daily until closure.</p>
          </div>
        </SectionCard>
      </div>
    </SafetyOfficerPageShell>
  );
};