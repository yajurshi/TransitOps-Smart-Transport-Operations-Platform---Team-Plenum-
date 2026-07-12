const { all, get } = require('../config/database');

class DashboardService {
    async getDashboardMetrics() {
        const metrics = {
            totalVehicles: 0,
            activeVehicles: 0,
            availableVehicles: 0,
            vehiclesInMaintenance: 0,
            activeTrips: 0,
            pendingTrips: 0,
            driversOnDuty: 0,
            fleetUtilization: 0,
            fuelCost: 0,
            maintenanceCost: 0,
            totalExpenses: 0,
            revenue: 0
        };

        // Vehicles status counts
        const vehicleCounts = await all('SELECT status, COUNT(*) as count FROM vehicles GROUP BY status');
        vehicleCounts.forEach(row => {
            const status = (row.status || '').toLowerCase();
            metrics.totalVehicles += row.count;
            if (status === 'available') {
                metrics.availableVehicles = row.count;
            } else if (status === 'on trip') {
                metrics.activeVehicles = row.count;
            } else if (status === 'in shop' || status === 'maintenance') {
                metrics.vehiclesInMaintenance = row.count;
            }
        });

        // Trips status counts
        const tripCounts = await all('SELECT status, COUNT(*) as count FROM trips GROUP BY status');
        tripCounts.forEach(row => {
            const status = (row.status || '').toLowerCase();
            if (status === 'dispatched') {
                metrics.activeTrips = row.count;
            } else if (status === 'scheduled' || status === 'draft') {
                metrics.pendingTrips = row.count;
            }
        });

        // Drivers on duty (on a trip)
        const driversRow = await get(`SELECT COUNT(*) as count FROM drivers WHERE LOWER(availability) = 'on_trip' OR LOWER(availability) = 'on trip'`);
        metrics.driversOnDuty = driversRow.count || 0;

        // Fleet utilization: activeVehicles / totalVehicles
        if (metrics.totalVehicles > 0) {
            metrics.fleetUtilization = Math.round((metrics.activeVehicles / metrics.totalVehicles) * 100);
        } else {
            metrics.fleetUtilization = 0;
        }

        // Costs
        const fuel = await get('SELECT SUM(cost) as total FROM fuel_logs');
        metrics.fuelCost = fuel.total || 0;

        const maint = await get('SELECT SUM(cost) as total FROM maintenance_logs');
        metrics.maintenanceCost = maint.total || 0;

        const exp = await get('SELECT SUM(amount) as total FROM expenses');
        metrics.totalExpenses = exp.total || 0;

        return metrics;
    }
}

module.exports = new DashboardService();
