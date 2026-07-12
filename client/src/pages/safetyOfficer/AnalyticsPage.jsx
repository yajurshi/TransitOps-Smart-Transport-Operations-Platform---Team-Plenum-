import { SafetyOfficerPageShell, SectionCard, StatGrid } from './SafetyOfficerPageShell';
import { analyticsSummary } from './safetyOfficerData';

export const AnalyticsPage = () => {
  return (
    <SafetyOfficerPageShell activeTab="Analytics" title="Analytics" subtitle="Safety trends, compliance signals, and exception monitoring.">
      <StatGrid items={analyticsSummary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Trend view" subtitle="Month-to-date safety summary.">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>• Compliance is stable and above target across the active fleet.</p>
            <p>• Maintenance exceptions dropped after the latest inspection cycle.</p>
            <p>• Driver coaching has reduced high-risk flags in the last week.</p>
          </div>
        </SectionCard>
        <SectionCard title="Actionable signals" subtitle="Focus items for the safety lead.">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>• Prioritize the remaining critical maintenance job before end of shift.</p>
            <p>• Review the delayed trip cohort for recurring route issues.</p>
            <p>• Flag the single high-risk driver record for re-assessment.</p>
          </div>
        </SectionCard>
      </div>
    </SafetyOfficerPageShell>
  );
};