import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import LoginPage from '../pages/Login';
import { RegisterPage } from '../pages/authentication/RegisterPage';
import { DriversPage } from '../pages/safetyOfficer/DriversPage';
import { DriverDetailsPage } from '../pages/safetyOfficer/DriverDetailsPage';
import { TripsPage } from '../pages/safetyOfficer/TripsPage';
import { TripDetailsPage } from '../pages/safetyOfficer/TripDetailsPage';
import { MaintenancePage } from '../pages/safetyOfficer/MaintenancePage';
import { MaintenanceDetailsPage } from '../pages/safetyOfficer/MaintenanceDetailsPage';
import { AnalyticsPage } from '../pages/safetyOfficer/AnalyticsPage';
import { SettingsPage } from '../pages/safetyOfficer/SettingsPage';
import { ProfilePage } from '../pages/safetyOfficer/ProfilePage';
import { ProtectedRoute } from './ProtectedRoute';

const RoleDashboard = () => <DashboardPage />;

export const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Navigate to="/login" replace />} />
		<Route path="/login" element={<LoginPage />} />
		<Route path="/register" element={<RegisterPage />} />
		<Route path="/dashboard" element={<ProtectedRoute><RoleDashboard /></ProtectedRoute>} />
		<Route path="/dashboard/fleet" element={<ProtectedRoute><RoleDashboard /></ProtectedRoute>} />
		<Route path="/dashboard/dispatcher" element={<ProtectedRoute><RoleDashboard /></ProtectedRoute>} />
		<Route path="/dashboard/safety" element={<ProtectedRoute><RoleDashboard /></ProtectedRoute>} />
		<Route path="/dashboard/finance" element={<ProtectedRoute><RoleDashboard /></ProtectedRoute>} />
		<Route path="/dashboard/safety/drivers" element={<ProtectedRoute><DriversPage /></ProtectedRoute>} />
		<Route path="/dashboard/safety/drivers/:driverId" element={<ProtectedRoute><DriverDetailsPage /></ProtectedRoute>} />
		<Route path="/dashboard/safety/trips" element={<ProtectedRoute><TripsPage /></ProtectedRoute>} />
		<Route path="/dashboard/safety/trips/:tripId" element={<ProtectedRoute><TripDetailsPage /></ProtectedRoute>} />
		<Route path="/dashboard/safety/maintenance" element={<ProtectedRoute><MaintenancePage /></ProtectedRoute>} />
		<Route path="/dashboard/safety/maintenance/:maintenanceId" element={<ProtectedRoute><MaintenanceDetailsPage /></ProtectedRoute>} />
		<Route path="/dashboard/safety/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
		<Route path="/dashboard/safety/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
		<Route path="/dashboard/safety/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
		<Route path="*" element={<Navigate to="/login" replace />} />
	</Routes>
);
