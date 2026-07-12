import { useApp } from './context/AppContext';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { VehicleList } from './pages/fleet/VehicleList';
import { VehicleDetails } from './pages/fleet/VehicleDetails';
import { DriverList } from './pages/drivers/DriverList';
import { DriverDetails } from './pages/drivers/DriverDetails';
import { TripList } from './pages/trips/TripList';
import { CreateTrip } from './pages/trips/CreateTrip';
import { TripDetails } from './pages/trips/TripDetails';
import { MaintenanceList } from './pages/maintenance/MaintenanceList';
import { MaintenanceDetails } from './pages/maintenance/MaintenanceDetails';
import { FuelExpenses } from './pages/fuel/FuelExpenses';
import { Analytics } from './pages/analytics/Analytics';
import { Settings } from './pages/settings/Settings';
import { Profile } from './pages/profile/Profile';

function App() {
  const { currentView } = useApp();

  switch (currentView) {
    case 'Dashboard':
      return <DashboardPage />;
    case 'Fleet':
      return <VehicleList />;
    case 'VehicleDetails':
      return <VehicleDetails />;
    case 'Drivers':
      return <DriverList />;
    case 'DriverDetails':
      return <DriverDetails />;
    case 'Trips':
      return <TripList />;
    case 'CreateTrip':
      return <CreateTrip />;
    case 'TripDetails':
      return <TripDetails />;
    case 'Maintenance':
      return <MaintenanceList />;
    case 'MaintenanceDetails':
      return <MaintenanceDetails />;
    case 'FuelExpenses':
      return <FuelExpenses />;
    case 'Analytics':
      return <Analytics />;
    case 'Settings':
      return <Settings />;
    case 'Profile':
      return <Profile />;
    default:
      return <DashboardPage />;
  }
}

export default App;