import { Link, useParams } from 'react-router-dom';
import { SafetyOfficerPageShell, Badge, SectionCard } from './SafetyOfficerPageShell';
import { getDriverById } from './safetyOfficerData';

export const DriverDetailsPage = () => {
  const { driverId } = useParams();
  const driver = getDriverById(driverId);

  return (
    <SafetyOfficerPageShell activeTab="Drivers" title={`${driver.name} Details`} subtitle="Compliance profile and readiness summary.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Identity & Details" subtitle="Can edit">
          <form className="space-y-4 text-sm text-slate-600">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Contact Number</label>
              <input type="text" defaultValue={driver.phone} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">License Number</label>
              <input type="text" defaultValue={driver.license} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">License Category</label>
              <input type="text" defaultValue="CDL Class A" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">License Expiry</label>
              <input type="date" defaultValue="2027-12-31" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Safety Score</label>
              <input type="number" defaultValue={driver.score} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Status</label>
              <select defaultValue={driver.status} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                <option value="Cleared">Cleared</option>
                <option value="Suspended">Suspended</option>
                <option value="Reviewing">Reviewing</option>
              </select>
            </div>
            <button type="button" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">Save Details</button>
          </form>
        </SectionCard>
        
        <SectionCard title="Document Uploads" subtitle="Can upload">
          <div className="space-y-4">
            <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition">
              <p className="text-sm font-semibold text-slate-700">Driving License</p>
              <button className="mt-2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1 px-3 rounded">Upload PDF/Image</button>
            </div>
            <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition">
              <p className="text-sm font-semibold text-slate-700">Medical Certificate <span className="text-[10px] text-green-600 bg-green-100 px-1 rounded ml-1">Bonus</span></p>
              <button className="mt-2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1 px-3 rounded">Upload Document</button>
            </div>
            <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition">
              <p className="text-sm font-semibold text-slate-700">Driver Documents <span className="text-[10px] text-green-600 bg-green-100 px-1 rounded ml-1">Bonus</span></p>
              <button className="mt-2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1 px-3 rounded">Upload Additional Files</button>
            </div>
          </div>
        </SectionCard>
        
        <SectionCard title="Driver Compliance" subtitle="Separate compliance checks">
          <div className="space-y-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">Compliance Actions</p>
            <button className="w-full bg-indigo-100 text-indigo-700 font-bold py-2 rounded border border-indigo-200 hover:bg-indigo-200 transition">
              ✅ Verify License
            </button>
            <button className="w-full bg-emerald-100 text-emerald-700 font-bold py-2 rounded border border-emerald-200 hover:bg-emerald-200 transition">
              ✅ Mark Compliant
            </button>
            <button className="w-full bg-red-100 text-red-700 font-bold py-2 rounded border border-red-200 hover:bg-red-200 transition">
              ❌ Mark Non-Compliant
            </button>
            
            <div className="mt-6 pt-4 border-t border-slate-200">
              <Link to="/dashboard/safety/drivers" className="inline-flex w-full justify-center px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">Back to roster</Link>
            </div>
          </div>
        </SectionCard>
      </div>
    </SafetyOfficerPageShell>
  );
};