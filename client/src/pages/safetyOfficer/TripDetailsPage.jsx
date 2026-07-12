import { Link, useParams } from 'react-router-dom';
import { SafetyOfficerPageShell, Badge, SectionCard } from './SafetyOfficerPageShell';
import { getTripById } from './safetyOfficerData';

export const TripDetailsPage = () => {
  const { tripId } = useParams();
  const trip = getTripById(tripId);

  return (
    <SafetyOfficerPageShell activeTab="Trips" title={`${trip.id} Details`} subtitle="Detailed trip safety inspection.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Trip summary" subtitle="Core movement details.">
          <div className="space-y-4 text-sm text-slate-600">
            <div><span className="font-semibold text-slate-800">Title:</span> {trip.title}</div>
            <div><span className="font-semibold text-slate-800">Driver:</span> {trip.driver}</div>
            <div><span className="font-semibold text-slate-800">Vehicle:</span> {trip.vehicle}</div>
            <div><span className="font-semibold text-slate-800">Route:</span> {trip.route}</div>
            <div><span className="font-semibold text-slate-800">Distance:</span> {trip.distance}</div>
          </div>
        </SectionCard>
        <SectionCard title="Operational state" subtitle="Live safety posture.">
          <div className="space-y-4">
            <Badge value={trip.status} />
            <Badge value={trip.hazard} />
            <div className="text-sm text-slate-600 space-y-2">
              <p>Departure: <span className="font-semibold text-slate-800">{trip.start}</span></p>
              <p>ETA: <span className="font-semibold text-slate-800">{trip.eta}</span></p>
              <p>Hazard escalation: <span className="font-semibold text-slate-800">Pending manual review</span></p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Actions" subtitle="Next steps.">
          <div className="space-y-3 text-sm text-slate-600">
            <p>• Validate stop-by-stop compliance if a delay is reported.</p>
            <p>• Attach incident photos or notes to the trip record.</p>
            <p>• Notify the driver and dispatcher of any route deviations.</p>
            <Link to="/dashboard/safety/trips" className="inline-flex mt-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">Back to trips</Link>
          </div>
        </SectionCard>
      </div>
    </SafetyOfficerPageShell>
  );
};