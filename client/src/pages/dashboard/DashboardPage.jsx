import React, { useState, useMemo } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FilterSection } from '../../components/FilterSection';
import { KpiCard } from '../../components/KpiCard';
import { RecentTripsTable } from '../../components/RecentTripsTable';
import { VehicleStatusPanel } from '../../components/VehicleStatusPanel';
import { FaTruck, FaRoute, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { FiCheckCircle, FiTool, FiUsers, FiPercent, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { hasAccess } from '../../utils/rbac';

// Import all subpages
import { VehicleList } from '../fleet/VehicleList';
import { VehicleDetails } from '../fleet/VehicleDetails';
import { DriverList } from '../drivers/DriverList';
import { DriverDetails } from '../drivers/DriverDetails';
import { TripList } from '../trips/TripList';
import { CreateTrip } from '../trips/CreateTrip';
import { TripDetails } from '../trips/TripDetails';
import { MaintenanceList } from '../maintenance/MaintenanceList';
import { MaintenanceDetails } from '../maintenance/MaintenanceDetails';
import { FuelExpenses } from '../fuel/FuelExpenses';
import { Analytics } from '../analytics/Analytics';
import { Settings } from '../settings/Settings';
import { Profile } from '../profile/Profile';

const recentActivity = [
  { id: 1, time: '10:45 AM', type: 'warning', text: 'Vehicle CA-8899 reported a check engine warning (In Shop).' },
  { id: 2, time: '10:12 AM', type: 'success', text: 'Trip TR-1002 completed successfully by driver Sarah Jenkins.' },
  { id: 3, time: '09:30 AM', type: 'info', text: 'New trip TR-1003 dispatched to driver Bruce Wayne.' },
  { id: 4, time: '08:15 AM', type: 'info', text: 'Driver Dom Toretto submitted pre-trip safety checklist.' }
];

export const DashboardPage = () => {
  const { vehicles, trips, drivers, maintenance, currentView } = useApp();
  const { user, role: initialRole } = useAuth();

  // Define active user based on context
  const activeUser = {
    name: user?.fullName || 'Alex Mercer',
    role: initialRole || 'Fleet Manager'
  };

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleType, setVehicleType] = useState('All');
  const [status, setStatus] = useState('All');
  const [region, setRegion] = useState('All');

  const handleClearFilters = () => {
    setVehicleType('All');
    setStatus('All');
    setRegion('All');
    setSearchQuery('');
  };

  // Filtered Vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesType = vehicleType === 'All' || vehicle.type === vehicleType;
      const matchesRegion = region === 'All' || vehicle.region === region;
      const matchesSearch = searchQuery === '' ||
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.reg.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesRegion && matchesSearch;
    });
  }, [vehicles, vehicleType, region, searchQuery]);

  // Filtered Trips (for Table)
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchingVeh = vehicles.find((v) => v.reg === trip.vehicleReg);
      const vehicleTypeVal = matchingVeh ? matchingVeh.type : 'Sedan';

      const matchesType = vehicleType === 'All' || vehicleTypeVal === vehicleType;
      const matchesStatus = status === 'All' || trip.status === status;
      const matchesRegion = region === 'All' || trip.region === region;
      const matchesSearch = searchQuery === '' ||
        trip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.vehicleReg.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesStatus && matchesRegion && matchesSearch;
    });
  }, [vehicles, trips, vehicleType, status, region, searchQuery]);

  // Operational metrics calculated dynamically
  const metrics = useMemo(() => {
    const totalVehicles = filteredVehicles.length;
    const activeVehicles = filteredVehicles.filter((v) => v.status === 'On Trip').length;
    const availableVehicles = filteredVehicles.filter((v) => v.status === 'Available').length;
    const inShopVehicles = filteredVehicles.filter((v) => v.status === 'In Shop').length;
    const retiredVehicles = filteredVehicles.filter((v) => v.status === 'Retired').length;

    const activeTripsCount = filteredTrips.filter((t) => t.status === 'Dispatched').length;

    // Simulate drivers on duty dynamically based on available resources
    const driversOnDuty = totalVehicles - retiredVehicles;

    // Fleet utilization percentage
    const utilization = totalVehicles > 0 ?
      Math.round(activeVehicles / (totalVehicles - retiredVehicles) * 100) :
      0;

    return {
      activeVehicles,
      availableVehicles,
      inShopVehicles,
      retiredVehicles,
      activeTripsCount,
      driversOnDuty,
      utilization
    };
  }, [filteredVehicles, filteredTrips]);

  const mappedTrips = useMemo(() => {
    return filteredTrips.map((t) => ({
      id: t.id,
      route: `${t.source} to ${t.destination}`,
      vehicle: t.vehicleName,
      vehicleReg: t.vehicleReg,
      driver: t.driverName,
      status: t.status === 'Cancelled' ? 'Draft' : t.status,
      eta: t.eta
    }));
  }, [filteredTrips]);

  // Sparkline/Chart path animation variables for fuel cost distribution trend
  const sparklineData = [35, 42, 38, 48, 55, 62, 58];
  const chartWidth = 320;
  const chartHeight = 80;
  const chartPoints = useMemo(() => {
    return sparklineData.map((val, idx) => {
      const x = idx / (sparklineData.length - 1) * chartWidth;
      const y = chartHeight - val / Math.max(...sparklineData) * (chartHeight - 10);
      return `${x},${y}`;
    }).join(' ');
  }, []);

  const renderDashboardOverview = () => {
    return (
      <>
        {/* Page Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              Logistics Control Center
              <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-widest">
                Live
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Real-time operational dashboard for fleet coordination, driver dispatch, and cost tracking.
            </p>
          </div>
          {/* Export logs control */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all border border-slate-200 shadow-sm">
              <span>Export logs</span>
            </button>
          </div>
        </div>

        {/* Filter Section Component */}
        <FilterSection
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
          status={status}
          setStatus={setStatus}
          region={region}
          setRegion={setRegion}
          onClearFilters={handleClearFilters}
        />

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <KpiCard
            title="Active Vehicles"
            value={metrics.activeVehicles}
            trend="+2 running"
            trendType="positive"
            icon={<FaTruck className="w-4 h-4 text-orange-500" />}
            delayIndex={0}
          />
          <KpiCard
            title="Available Vehicles"
            value={metrics.availableVehicles}
            trend="Optimal"
            trendType="neutral"
            icon={<FiCheckCircle className="w-4 h-4 text-orange-500" />}
            delayIndex={1}
          />
          <KpiCard
            title="Vehicles In Shop"
            value={metrics.inShopVehicles}
            trend="-1 active repair"
            trendType="positive"
            icon={<FiTool className="w-4 h-4 text-orange-500" />}
            delayIndex={2}
          />
          <KpiCard
            title="Active Trips"
            value={metrics.activeTripsCount}
            trend="100% On-Track"
            trendType="positive"
            icon={<FaRoute className="w-4 h-4 text-orange-500" />}
            delayIndex={3}
          />
          <KpiCard
            title="Drivers On Duty"
            value={metrics.driversOnDuty}
            trend="No alerts"
            trendType="neutral"
            icon={<FiUsers className="w-4 h-4 text-orange-500" />}
            delayIndex={4}
          />
          <KpiCard
            title="Fleet Utilization"
            value={`${metrics.utilization}%`}
            trend="Target 85%"
            trendType="positive"
            icon={<FiPercent className="w-4 h-4 text-orange-500" />}
            delayIndex={5}
          />
        </div>

        {/* Tables, Progress bars, and Live Activity panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left/Middle Column (span 2): Recent Trips Table */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <RecentTripsTable trips={mappedTrips} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Available Dispatch Operators */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest flex items-center gap-1.5">
                    <FiUsers className="text-orange-500 w-4 h-4" />
                    Ready Operators
                  </h3>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Available
                  </span>
                </div>
                <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[180px]">
                  {drivers.filter((d) => d.status === 'Available').slice(0, 3).map((driver) => (
                    <div key={driver.name} className="flex justify-between items-center bg-slate-50 border border-slate-200/50 rounded-lg p-2.5">
                      <div>
                        <span className="block text-xs font-bold text-slate-700">{driver.name}</span>
                        <span className="block text-[9px] text-slate-400 font-semibold mt-0.5">{driver.licenseCategory} • {driver.licenseNumber}</span>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          driver.safetyScore >= 90 ? 'bg-emerald-50 text-emerald-700' :
                          driver.safetyScore >= 80 ? 'bg-amber-50 text-amber-700' :
                          'bg-rose-50 text-rose-700'
                        }`}>
                          Score: {driver.safetyScore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Fleet Maintenance */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest flex items-center gap-1.5">
                    <FiTool className="text-orange-500 w-4 h-4" />
                    Fleet shop log
                  </h3>
                  <span className="text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    In Repairs
                  </span>
                </div>
                <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[180px]">
                  {maintenance.filter((m) => m.status === 'In Progress' || m.status === 'Scheduled').slice(0, 3).map((m) => (
                    <div key={m.id} className="flex justify-between items-center bg-slate-50 border border-slate-200/50 rounded-lg p-2.5">
                      <div>
                        <span className="block text-xs font-bold text-slate-700">{m.vehicleName}</span>
                        <span className="block text-[9px] text-rose-600 font-bold mt-0.5">{m.issue}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">ETA: {m.expectedCompletion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (span 1): Vehicle Status Panel & Live Activity */}
          <div className="flex flex-col gap-6">
            {/* Vehicle Distribution Progress bars */}
            <VehicleStatusPanel
              statusCounts={{
                available: metrics.availableVehicles,
                onTrip: metrics.activeVehicles,
                inShop: metrics.inShopVehicles,
                retired: metrics.retiredVehicles
              }}
            />

            {/* Fuel Trend Visualization Graph (DHL Style Dashboard) */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                    Fuel Cost Trend
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">Weekly cost distribution overview.</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <FiTrendingUp className="w-3.5 h-3.5" />
                  <span>+12.4%</span>
                </div>
              </div>

              {/* SVG Animated Sparkline Chart */}
              <div className="flex items-center justify-center bg-slate-50 border border-slate-200/50 rounded-lg p-2 h-24 mb-4">
                <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M 0,${chartHeight} L ${chartPoints} L ${chartWidth},${chartHeight} Z`}
                    fill="url(#gradient)"
                  />
                  <motion.path
                    d={`M ${chartPoints}`}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                </svg>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Live Alerts Activity Log */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col flex-1">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                  Recent Alerts
                </h3>
                <span className="text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Real-time
                </span>
              </div>

              {/* Timeline activity list */}
              <div className="space-y-4 flex-1 flex flex-col justify-start">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3 items-start group">
                    <div className="mt-0.5">
                      {activity.type === 'warning' ? (
                        <div className="w-5 h-5 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
                          <FaExclamationTriangle className="w-2.5 h-2.5" />
                        </div>
                      ) : activity.type === 'success' ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500">
                          <FaCheckCircle className="w-2.5 h-2.5" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
                          <FaTruck className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-700 leading-normal group-hover:text-slate-900 transition-colors">
                        {activity.text}
                      </p>
                      <span className="text-[10px] text-slate-400 font-bold font-mono tracking-wider block mt-0.5 uppercase">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderDispatcherContent = () => {
    const viewKeyMap = {
      'Dashboard': 'DashboardOverview',
      'Fleet': 'Fleet',
      'VehicleDetails': 'VehicleDetails',
      'Drivers': 'Drivers',
      'DriverDetails': 'DriverDetails',
      'Trips': 'Trips',
      'CreateTrip': 'CreateTrip',
      'TripDetails': 'TripDetails',
      'Maintenance': 'Maintenance',
      'MaintenanceDetails': 'MaintenanceDetails',
      'FuelExpenses': 'Fuel',
      'Analytics': 'Analytics',
      'Settings': 'Settings',
      'Profile': 'Profile'
    };

    const viewKey = viewKeyMap[currentView] || 'DashboardOverview';

    if (!hasAccess(activeUser.role, viewKey)) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center border border-rose-200 text-rose-500 mb-2">
            <FaExclamationTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800">Access Restricted</h2>
          <p className="text-slate-500 max-w-md">
            Your current role ({activeUser.role}) does not have permission to view the {currentView} module. 
            If you believe this is an error, please contact the system administrator.
          </p>
          <button onClick={() => setCurrentView('Dashboard')} className="mt-4 px-6 py-2.5 bg-orange-500 text-white font-bold rounded-lg uppercase tracking-wider text-xs transition-all hover:bg-orange-600 active:scale-95">
            Return to Dashboard
          </button>
        </div>
      );
    }

    switch (currentView) {
      case 'Fleet':
        return <VehicleList searchQuery={searchQuery} />;
      case 'VehicleDetails':
        return <VehicleDetails />;
      case 'Drivers':
        return <DriverList searchQuery={searchQuery} />;
      case 'DriverDetails':
        return <DriverDetails />;
      case 'Trips':
        return <TripList searchQuery={searchQuery} />;
      case 'CreateTrip':
        return <CreateTrip />;
      case 'TripDetails':
        return <TripDetails />;
      case 'Maintenance':
        return <MaintenanceList searchQuery={searchQuery} />;
      case 'MaintenanceDetails':
        return <MaintenanceDetails />;
      case 'FuelExpenses':
        return <FuelExpenses searchQuery={searchQuery} />;
      case 'Analytics':
        return <Analytics />;
      case 'Settings':
        return <Settings />;
      case 'Profile':
        return <Profile />;
      case 'Dashboard':
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar Component (White + Orange Theme, with active role passed down) */}
      <Sidebar activeTab={currentView === 'Dashboard' ? 'Dashboard' : currentView} role={activeUser.role} />

      {/* Main Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen overflow-y-auto">
        {/* Top Navbar */}
        <div className="relative">
          <Navbar
            userName={activeUser.name}
            role={activeUser.role}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Content Body */}
        <main className="flex-1 p-8 pt-24 space-y-6 w-full max-w-none">
          {renderDispatcherContent()}
        </main>
      </div>
    </div>
  );
};
