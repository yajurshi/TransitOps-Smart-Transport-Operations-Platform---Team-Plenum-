const driverRepo = require('../repositories/driver.repository');

class DriverService {
    async getDrivers(page = 1, limit = 10, search = '', status = '', availability = '') {
        const offset = (page - 1) * limit;
        return await driverRepo.getAllDrivers(limit, offset, search, status, availability);
    }

    async getDriverById(id) {
        const driver = await driverRepo.getDriverById(id);
        if (!driver) {
            const error = new Error('Driver not found');
            error.statusCode = 404;
            throw error;
        }
        return driver;
    }

    async createDriver(data) {
        try {
            const driverId = await driverRepo.createDriver({
                first_name: data.firstName,
                last_name: data.lastName,
                license_number: data.licenseNumber,
                license_expiry: data.licenseExpiry || null,
                license_category: data.licenseCategory || null,
                status: data.status || 'active',
                availability: data.availability || 'available'
            });
            return await this.getDriverById(driverId);
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                const err = new Error('Driver with this license number already exists');
                err.statusCode = 400;
                throw err;
            }
            throw error;
        }
    }

    async updateDriver(id, data) {
        const existing = await this.getDriverById(id);
        await driverRepo.updateDriver(id, {
            first_name: data.firstName || existing.first_name,
            last_name: data.lastName || existing.last_name,
            license_number: data.licenseNumber || existing.license_number,
            license_expiry: data.licenseExpiry !== undefined ? data.licenseExpiry : existing.license_expiry,
            license_category: data.licenseCategory !== undefined ? data.licenseCategory : existing.license_category,
            status: data.status || existing.status,
            availability: data.availability || existing.availability
        });
        return await this.getDriverById(id);
    }

    async deleteDriver(id) {
        await this.getDriverById(id);
        await driverRepo.deleteDriver(id);
    }
}

module.exports = new DriverService();
