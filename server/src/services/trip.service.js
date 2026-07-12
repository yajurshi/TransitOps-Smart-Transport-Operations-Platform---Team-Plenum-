const tripRepo = require('../repositories/trip.repository');
const vehicleRepo = require('../repositories/vehicle.repository');
const driverRepo = require('../repositories/driver.repository');

class TripService {
    async getTrips(page = 1, limit = 10, status = '') {
        const offset = (page - 1) * limit;
        return await tripRepo.getAllTrips(limit, offset, status);
    }

    async getTripById(id) {
        const trip = await tripRepo.getTripById(id);
        if (!trip) {
            const error = new Error('Trip not found');
            error.statusCode = 404;
            throw error;
        }
        return trip;
    }

    async createTrip(data) {
        // 1. Fetch vehicle and driver
        const vehicle = await vehicleRepo.getVehicleById(data.vehicleId);
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        const driver = await driverRepo.getDriverById(data.driverId);
        if (!driver) {
            const error = new Error('Driver not found');
            error.statusCode = 404;
            throw error;
        }

        // 2. Business Rules Validation
        // Vehicle capacity validation
        if (vehicle.capacity <= 0) {
            const error = new Error('Vehicle has invalid capacity');
            error.statusCode = 400;
            throw error;
        }

        // In Shop or Retired vehicles cannot be assigned
        const vehStatus = (vehicle.status || '').toLowerCase();
        if (vehStatus === 'in shop' || vehStatus === 'maintenance') {
            const error = new Error('Vehicle is currently in shop/maintenance and cannot be assigned to a trip');
            error.statusCode = 400;
            throw error;
        }
        if (vehStatus === 'retired') {
            const error = new Error('Retired vehicles cannot be assigned to a trip');
            error.statusCode = 400;
            throw error;
        }

        // Expired driver licenses cannot be assigned
        if (driver.license_expiry) {
            const expiry = new Date(driver.license_expiry);
            if (expiry < new Date()) {
                const error = new Error('Driver has an expired license and cannot be assigned');
                error.statusCode = 400;
                throw error;
            }
        }

        // Suspended/inactive drivers cannot be assigned
        const drStatus = (driver.status || '').toLowerCase();
        if (drStatus === 'suspended' || drStatus === 'inactive') {
            const error = new Error('Suspended or inactive drivers cannot be assigned to a trip');
            error.statusCode = 400;
            throw error;
        }

        // Driver cannot have multiple active trips
        const activeTrip = await tripRepo.getDriverActiveTrip(data.driverId);
        if (activeTrip) {
            const error = new Error('Driver is already assigned to an active trip');
            error.statusCode = 400;
            throw error;
        }

        const status = data.status || 'scheduled';

        // 3. Create the Trip
        const tripId = await tripRepo.createTrip({
            vehicle_id: data.vehicleId,
            driver_id: data.driverId,
            origin: data.origin,
            destination: data.destination,
            status: status,
            start_time: data.startTime || (status === 'dispatched' ? new Date().toISOString() : null),
            end_time: null
        });

        // 4. Update status if dispatched
        if (status === 'dispatched') {
            await vehicleRepo.updateVehicle(data.vehicleId, {
                type: vehicle.type,
                capacity: vehicle.capacity,
                status: 'on trip'
            });

            await driverRepo.updateDriver(data.driverId, {
                first_name: driver.first_name,
                last_name: driver.last_name,
                license_number: driver.license_number,
                license_expiry: driver.license_expiry,
                license_category: driver.license_category,
                status: driver.status,
                availability: 'on_trip'
            });
        }

        return await this.getTripById(tripId);
    }

    async dispatchTrip(id) {
        const trip = await this.getTripById(id);
        if (trip.status === 'dispatched') return trip;

        const vehicle = await vehicleRepo.getVehicleById(trip.vehicle_id);
        const driver = await driverRepo.getDriverById(trip.driver_id);

        await tripRepo.updateTripStatus(id, 'dispatched', null);

        if (vehicle) {
            await vehicleRepo.updateVehicle(trip.vehicle_id, {
                type: vehicle.type,
                capacity: vehicle.capacity,
                status: 'on trip'
            });
        }

        if (driver) {
            await driverRepo.updateDriver(trip.driver_id, {
                first_name: driver.first_name,
                last_name: driver.last_name,
                license_number: driver.license_number,
                license_expiry: driver.license_expiry,
                license_category: driver.license_category,
                status: driver.status,
                availability: 'on_trip'
            });
        }

        return await this.getTripById(id);
    }

    async completeTrip(id) {
        const trip = await this.getTripById(id);
        const vehicle = await vehicleRepo.getVehicleById(trip.vehicle_id);
        const driver = await driverRepo.getDriverById(trip.driver_id);

        await tripRepo.updateTripStatus(id, 'completed', new Date().toISOString());

        if (vehicle) {
            await vehicleRepo.updateVehicle(trip.vehicle_id, {
                type: vehicle.type,
                capacity: vehicle.capacity,
                status: 'available'
            });
        }

        if (driver) {
            await driverRepo.updateDriver(trip.driver_id, {
                first_name: driver.first_name,
                last_name: driver.last_name,
                license_number: driver.license_number,
                license_expiry: driver.license_expiry,
                license_category: driver.license_category,
                status: driver.status,
                availability: 'available'
            });
        }

        return await this.getTripById(id);
    }

    async cancelTrip(id) {
        const trip = await this.getTripById(id);
        const vehicle = await vehicleRepo.getVehicleById(trip.vehicle_id);
        const driver = await driverRepo.getDriverById(trip.driver_id);

        await tripRepo.updateTripStatus(id, 'cancelled', null);

        if (vehicle) {
            await vehicleRepo.updateVehicle(trip.vehicle_id, {
                type: vehicle.type,
                capacity: vehicle.capacity,
                status: 'available'
            });
        }

        if (driver) {
            await driverRepo.updateDriver(trip.driver_id, {
                first_name: driver.first_name,
                last_name: driver.last_name,
                license_number: driver.license_number,
                license_expiry: driver.license_expiry,
                license_category: driver.license_category,
                status: driver.status,
                availability: 'available'
            });
        }

        return await this.getTripById(id);
    }
}

module.exports = new TripService();
