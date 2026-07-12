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

// Define Types
interface TripItem {
  id: string;
  route: string;
  vehicle: string;
  vehicleReg: string;
  vehicleType: 'Heavy Duty' | 'Light Truck' | 'Van' | 'Sedan';
  driver: string;
  status: 'On Trip' | 'Completed' | 'Dispatched' | 'Draft';
  eta: string;
  region: 'North' | 'South' | 'East' | 'West';
}

interface VehicleItem {
  reg: string;
  name: string;
  type: 'Heavy Duty' | 'Light Truck' | 'Van' | 'Sedan';
  status: 'Available' | 'On Trip' | 'In Shop' | 'Retired';
  region: 'North' | 'South' | 'East' | 'West';
}

// Dummy Data
const initialTrips: TripItem[] = [
  { id: 'TR-1001', route: 'Chicago to Detroit', vehicle: 'Heavy Duty Truck', vehicleReg: 'TX-9081', vehicleType: 'Heavy Duty', driver: 'Liam Neeson', status: 'On Trip', eta: '2h 15m', region: 'North' },
  { id: 'TR-1002', route: 'Houston to Dallas', vehicle: 'Transit Van', vehicleReg: 'TX-4322', vehicleType: 'Van', driver: 'Sarah Jenkins', status: 'Completed', eta: '--', region: 'South' },
  { id: 'TR-1003', route: 'New York to Boston', vehicle: 'Sedan Courier', vehicleReg: 'NY-7811', vehicleType: 'Sedan', driver: 'Bruce Wayne', status: 'Dispatched', eta: '4h 30m', region: 'East' },
  { id: 'TR-1004', route: 'Los Angeles to San Francisco', vehicle: 'Heavy Duty Rig', vehicleReg: 'CA-8899', vehicleType: 'Heavy Duty', driver: 'Dom Toretto', status: 'Draft', eta: '--', region: 'West' },
  { id: 'TR-1005', route: 'Seattle to Portland', vehicle: 'Light Pickup', vehicleReg: 'WA-5561', vehicleType: 'Light Truck', driver: 'Jane Doe', status: 'On Trip', eta: '1h 05m', region: 'North' },
  { id: 'TR-1006', route: 'Miami to Orlando', vehicle: 'Transit Van', vehicleReg: 'FL-2099', vehicleType: 'Van', driver: 'John Smith', status: 'Completed', eta: '--', region: 'South' },
  { id: 'TR-1007', route: 'Philadelphia to Newark', vehicle: 'Sedan Courier', vehicleReg: 'PA-1102', vehicleType: 'Sedan', driver: 'Clark Kent', status: 'On Trip', eta: '45m', region: 'East' },
  { id: 'TR-1008', route: 'Denver to Aspen', vehicle: 'Heavy Duty Truck', vehicleReg: 'CO-9988', vehicleType: 'Heavy Duty', driver: 'Diana Prince', status: 'Dispatched', eta: '3h 10m', region: 'West' }
];

const initialVehicles: VehicleItem[] = [
  { reg: 'TX-9081', name: 'Heavy Duty Truck', type: 'Heavy Duty', status: 'On Trip', region: 'North' },
  { reg: 'TX-4322', name: 'Transit Van', type: 'Van', status: 'Available', region: 'South' },
  { reg: 'NY-7811', name: 'Sedan Courier', type: 'Sedan', status: 'Available', region: 'East' },
  { reg: 'CA-8899', name: 'Heavy Duty Rig', type: 'Heavy Duty', status: 'In Shop', region: 'West' },
  { reg: 'WA-5561', name: 'Light Pickup', type: 'Light Truck', status: 'On Trip', region: 'North' },
  { reg: 'FL-2099', name: 'Transit Van', type: 'Van', status: 'Available', region: 'South' },
  { reg: 'PA-1102', name: 'Sedan Courier', type: 'Sedan', status: 'On Trip', region: 'East' },
  { reg: 'CO-9988', name: 'Heavy Duty Truck', type: 'Heavy Duty', status: 'Available', region: 'West' },
  { reg: 'IL-3044', name: 'Light Pickup', type: 'Light Truck', status: 'Retired', region: 'North' },
  { reg: 'GA-2011', name: 'Transit Van', type: 'Van', status: 'In Shop', region: 'South' },
  { reg: 'MA-6712', name: 'Sedan Courier', type: 'Sedan', status: 'Available', region: 'East' },
  { reg: 'AZ-4455', name: 'Heavy Duty Rig', type: 'Heavy Duty', status: 'Available', region: 'West' }
];

const recentActivity = [
  { id: 1, time: '10:45 AM', type: 'warning', text: 'Vehicle CA-8899 reported a check engine warning (In Shop).' },
  { id: 2, time: '10:12 AM', type: 'success', text: 'Trip TR-1002 completed successfully by driver Sarah Jenkins.' },
  { id: 3, time: '09:30 AM', type: 'info', text: 'New trip TR-1003 dispatched to driver Bruce Wayne.' },
  { id: 4, time: '08:15 AM', type: 'info', text: 'Driver Dom Toretto submitted pre-trip safety checklist.' }
];

export const DashboardPage: React.FC = () => {
  // Read-only User/Role (Remove role switching)
  const activeUser = { name: 'Alex Mercer', role: 'Fleet Manager' };

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
    return initialVehicles.filter((vehicle) => {
      const matchesType = vehicleType === 'All' || vehicle.type === vehicleType;
      const matchesRegion = region === 'All' || vehicle.region === region;
      const matchesSearch = searchQuery === '' || 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.reg.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesRegion && matchesSearch;
    });
  }, [vehicleType, region, searchQuery]);

  // Filtered Trips (for Table)
  const filteredTrips = useMemo(() => {
    return initialTrips.filter((trip) => {
      const matchesType = vehicleType === 'All' || trip.vehicleType === vehicleType;
      const matchesStatus = status === 'All' || trip.status === status;
      const matchesRegion = region === 'All' || trip.region === region;
      const matchesSearch = searchQuery === '' ||
        trip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.vehicleReg.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesStatus && matchesRegion && matchesSearch;
    });
  }, [vehicleType, status, region, searchQuery]);

  // Operational metrics calculated dynamically
  const metrics = useMemo(() => {
    const totalVehicles = filteredVehicles.length;
    const activeVehicles = filteredVehicles.filter(v => v.status === 'On Trip').length;
    const availableVehicles = filteredVehicles.filter(v => v.status === 'Available').length;
    const inShopVehicles = filteredVehicles.filter(v => v.status === 'In Shop').length;
    const retiredVehicles = filteredVehicles.filter(v => v.status === 'Retired').length;

    const activeTripsCount = filteredTrips.filter(t => t.status === 'On Trip').length;
    
    // Simulate drivers on duty dynamically based on available resources
    const driversOnDuty = totalVehicles - retiredVehicles;

    // Fleet utilization percentage
    const utilization = totalVehicles > 0 
      ? Math.round((activeVehicles / (totalVehicles - retiredVehicles)) * 100) 
      : 0;

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

  // Sparkline/Chart path animation variables for fuel cost distribution trend
  const sparklineData = [35, 42, 38, 48, 55, 62, 58];
  const chartWidth = 320;
  const chartHeight = 80;
  const chartPoints = useMemo(() => {
    return sparklineData.map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * chartWidth;
      const y = chartHeight - (val / Math.max(...sparklineData)) * (chartHeight - 10);
      return `${x},${y}`;
    }).join(' ');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar Component (White + Orange Theme) */}
      <Sidebar activeTab="Dashboard" />

      {/* Main Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen overflow-y-auto">
        {/* Top Navbar */}
        <Navbar
          userName={activeUser.name}
          role={activeUser.role}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Content Body */}
        <main className="flex-1 p-8 pt-24 space-y-6 max-w-7xl w-full mx-auto">
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
              <RecentTripsTable trips={filteredTrips} />


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
                    {/* Shadow underneath chart path */}
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
                    {/* Animated Line */}
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
        </main>
      </div>
    </div>
  );
};
