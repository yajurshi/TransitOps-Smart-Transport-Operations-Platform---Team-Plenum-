import React, { useState, useMemo } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { FilterSection } from '../../components/FilterSection';
import { KpiCard } from '../../components/KpiCard';
import { RecentTripsTable } from '../../components/RecentTripsTable';
import { VehicleStatusPanel } from '../../components/VehicleStatusPanel';

import { FaTruck, FaRoute } from 'react-icons/fa';
import { FiCheckCircle, FiTool, FiUsers, FiPercent } from 'react-icons/fi';

// Dummy Data
const initialTrips = [
  { id: 'TR-1001', route: 'Chicago to Detroit', vehicle: 'Heavy Duty Truck', vehicleReg: 'TX-9081', vehicleType: 'Heavy Duty', driver: 'Liam Neeson', status: 'On Trip', eta: '2h 15m', region: 'North' },
  { id: 'TR-1002', route: 'Houston to Dallas', vehicle: 'Transit Van', vehicleReg: 'TX-4322', vehicleType: 'Van', driver: 'Sarah Jenkins', status: 'Completed', eta: '--', region: 'South' },
  { id: 'TR-1003', route: 'New York to Boston', vehicle: 'Sedan Courier', vehicleReg: 'NY-7811', vehicleType: 'Sedan', driver: 'Bruce Wayne', status: 'Dispatched', eta: '4h 30m', region: 'East' },
  { id: 'TR-1004', route: 'Los Angeles to San Francisco', vehicle: 'Heavy Duty Rig', vehicleReg: 'CA-8899', vehicleType: 'Heavy Duty', driver: 'Dom Toretto', status: 'Draft', eta: '--', region: 'West' },
  { id: 'TR-1005', route: 'Seattle to Portland', vehicle: 'Light Pickup', vehicleReg: 'WA-5561', vehicleType: 'Light Truck', driver: 'Jane Doe', status: 'On Trip', eta: '1h 05m', region: 'North' },
  { id: 'TR-1006', route: 'Miami to Orlando', vehicle: 'Transit Van', vehicleReg: 'FL-2099', vehicleType: 'Van', driver: 'John Smith', status: 'Completed', eta: '--', region: 'South' },
  { id: 'TR-1007', route: 'Philadelphia to Newark', vehicle: 'Sedan Courier', vehicleReg: 'PA-1102', vehicleType: 'Sedan', driver: 'Clark Kent', status: 'On Trip', eta: '45m', region: 'East' },
  { id: 'TR-1008', route: 'Denver to Aspen', vehicle: 'Heavy Duty Truck', vehicleReg: 'CO-9988', vehicleType: 'Heavy Duty', driver: 'Diana Prince', status: 'Dispatched', eta: '3h 10m', region: 'West' }
];

const initialVehicles = [
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

export const DashboardPage = () => {
  // User/Role States
  const [activeUser, setActiveUser] = useState({ name: 'Alex Mercer', role: 'Fleet Manager' });
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleType, setVehicleType] = useState('All');
  const [status, setStatus] = useState('All');
  const [region, setRegion] = useState('All');

  // List of roles for selection
  const roles = ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'];

  const handleRoleChange = (role) => {
    setActiveUser({ name: 'Alex Mercer', role });
    setIsRoleDropdownOpen(false);
  };

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

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Component */}
      <Sidebar activeTab="Dashboard" />

      {/* Main Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <div className="relative">
          <Navbar
            userName={activeUser.name}
            role={activeUser.role}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          {/* Quick role-switch trigger dropdown absolute positioned for testing */}
          <div className="absolute right-8 top-13 z-30">
            <button 
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="text-[10px] text-slate-400 hover:text-slate-600 font-semibold underline bg-transparent border-0 cursor-pointer"
            >
              Switch Role
            </button>
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${
                      activeUser.role === r ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <main className="flex-1 p-8 pt-24 space-y-6 max-w-7xl w-full mx-auto">
          {/* Page Title Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
              <p className="text-xs text-slate-500 font-medium">Real-time status monitoring, metrics tracking, and resource allocation.</p>
            </div>
            <div className="text-xs font-bold text-slate-400 font-mono bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
              SYSTEM TIME: 2026-07-12 11:04
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
              trend="+2 today"
              trendType="positive"
              icon={<FaTruck className="w-5 h-5 text-blue-500" />}
            />
            <KpiCard
              title="Available Vehicles"
              value={metrics.availableVehicles}
              trend="Optimal"
              trendType="neutral"
              icon={<FiCheckCircle className="w-5 h-5 text-green-500" />}
            />
            <KpiCard
              title="Vehicles in Maintenance"
              value={metrics.inShopVehicles}
              trend="-1 this week"
              trendType="positive"
              icon={<FiTool className="w-5 h-5 text-rose-500" />}
            />
            <KpiCard
              title="Active Trips"
              value={metrics.activeTripsCount}
              trend="On Track"
              trendType="neutral"
              icon={<FaRoute className="w-5 h-5 text-amber-500" />}
            />
            <KpiCard
              title="Drivers On Duty"
              value={metrics.driversOnDuty}
              trend="100% capacity"
              trendType="positive"
              icon={<FiUsers className="w-5 h-5 text-indigo-500" />}
            />
            <KpiCard
              title="Fleet Utilization"
              value={`${metrics.utilization}%`}
              trend="Target 85%"
              trendType="positive"
              icon={<FiPercent className="w-5 h-5 text-purple-500" />}
            />
          </div>

          {/* Tables and Secondary Panels Layout Grid */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Recent Trips Table */}
            <RecentTripsTable trips={filteredTrips} />

            {/* Vehicle Status horizontal progress panel */}
            <VehicleStatusPanel
              statusCounts={{
                available: metrics.availableVehicles,
                onTrip: metrics.activeVehicles,
                inShop: metrics.inShopVehicles,
                retired: metrics.retiredVehicles
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
