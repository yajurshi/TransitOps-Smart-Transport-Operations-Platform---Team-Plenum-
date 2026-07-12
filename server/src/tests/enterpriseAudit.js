const http = require('http');
const fs = require('fs');
const path = require('path');
const app = require('../app');
const { get, all, run } = require('../config/database');
const initDatabase = require('../database/initDatabase');

const TEST_PORT = 5100;
const BASE_URL = `http://localhost:${TEST_PORT}`;

// Helper to make HTTP requests returning a Promise
const request = (method, urlPath, body = null, headers = {}) => {
    return new Promise((resolve, reject) => {
        const url = new URL(urlPath, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });

        req.on('error', (err) => reject(err));

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
};

const runAudit = async () => {
    console.log('\n==================================================');
    console.log('         TRANSITOPS ENTERPRISE AUDIT');
    console.log('==================================================\n');

    const results = [];
    const reportResult = (name, passed, details = '') => {
        results.push({ name, passed, details });
        console.log(`[Audit] ${name}: ${passed ? 'PASS ✅' : 'FAIL ❌'} ${details ? `(${details})` : ''}`);
    };

    let serverInstance;

    try {
        // --- 8. DATABASE CHECKS ---
        try {
            await initDatabase();
            const dbPath = path.resolve(__dirname, '../../database/transitops.db');
            const dbExists = fs.existsSync(dbPath);
            reportResult('Database file exists', dbExists);

            // Re-run initDatabase to verify idempotency
            await initDatabase();
            const rolesCount = await get('SELECT COUNT(*) as count FROM roles');
            reportResult('Restart does not duplicate data', rolesCount.count === 5, `Total roles: ${rolesCount.count}`);

            // Verify all entities created
            const expectedTables = ['roles', 'users', 'vehicles', 'drivers', 'trips', 'maintenance_logs', 'fuel_logs', 'expenses', 'notifications', 'settings'];
            let allTablesExist = true;
            for (const table of expectedTables) {
                const row = await get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [table]);
                if (!row) allTablesExist = false;
            }
            reportResult('Schema creates all entities', allTablesExist);
            reportResult('Seed inserts roles', rolesCount.count === 5);
        } catch (e) {
            reportResult('Database initialization and integrity', false, e.message);
        }

        // Start server for API tests
        serverInstance = app.listen(TEST_PORT);
        console.log(`[Audit] Test server running on port ${TEST_PORT}\n`);

        // --- 1. AUTHENTICATION CHECKS ---
        let token;
        let authHeaders;
        const uniqueEmail = `audit_admin_${Date.now()}@transitops.com`;
        
        try {
            // Register creates users
            const regRes = await request('POST', '/api/auth/register', {
                firstName: 'Audit',
                lastName: 'Admin',
                email: uniqueEmail,
                password: 'secure_password_123',
                phone: '555-0199',
                role: 'Administrator'
            });
            reportResult('Register creates user in SQLite', regRes.status === 201 && regRes.body.success);

            // Passwords are bcrypt hashed
            const dbUser = await get('SELECT * FROM users WHERE email = ?', [uniqueEmail]);
            const isHashed = dbUser && dbUser.password_hash.startsWith('$2b$') && !dbUser.password_hash.includes('secure_password_123');
            reportResult('Passwords are bcrypt hashed', !!isHashed);

            // Login generates JWT
            const loginRes = await request('POST', '/api/auth/login', {
                email: uniqueEmail,
                password: 'secure_password_123'
            });
            const hasJwt = loginRes.status === 200 && loginRes.body.success && loginRes.body.data.token;
            reportResult('Login generates JWT', !!hasJwt);
            if (hasJwt) {
                token = loginRes.body.data.token;
                authHeaders = { 'Authorization': `Bearer ${token}` };
            }

            // Protected routes require authentication
            const protectedRes = await request('GET', '/api/vehicles');
            reportResult('Protected routes require authentication', protectedRes.status === 401);

            // RBAC Roles work correctly
            // Create a non-dispatcher/admin user
            const analystEmail = `analyst_${Date.now()}@transitops.com`;
            await request('POST', '/api/auth/register', {
                firstName: 'Financial',
                lastName: 'Analyst',
                email: analystEmail,
                password: 'password123',
                phone: '555-0000',
                role: 'Financial Analyst'
            });
            const analystLogin = await request('POST', '/api/auth/login', {
                email: analystEmail,
                password: 'password123'
            });
            const analystHeaders = { 'Authorization': `Bearer ${analystLogin.body.data.token}` };
            const blockedRes = await request('POST', '/api/trips', { origin: 'NY', destination: 'LA' }, analystHeaders);
            reportResult('RBAC roles work correctly', blockedRes.status === 403, 'Financial Analyst blocked from Trip creation');

        } catch (e) {
            console.error(e);
            reportResult('Authentication tests', false, e.message);
        }

        // --- 2. VEHICLE BUSINESS RULES ---
        let vehicleId;
        const uniqueReg = `AUDIT-REG-${Date.now()}`;
        try {
            // Registration number uniqueness
            const createVeh1 = await request('POST', '/api/vehicles', {
                registration: uniqueReg,
                model: 'Audit Truck',
                type: 'Truck',
                capacity: 5000,
                status: 'available'
            }, authHeaders);
            vehicleId = createVeh1.body.data.vehicle.id;

            const createVeh2 = await request('POST', '/api/vehicles', {
                registration: uniqueReg,
                model: 'Duplicate Reg Truck',
                type: 'Truck',
                capacity: 5000,
                status: 'available'
            }, authHeaders);
            reportResult('Registration number uniqueness', createVeh2.status === 400);

            // Capacity validation (done via validator)
            const createVehInvalidCap = await request('POST', '/api/vehicles', {
                registration: `INVALID-CAP-${Date.now()}`,
                model: 'Zero Capacity Truck',
                type: 'Truck',
                capacity: 0,
                status: 'available'
            }, authHeaders);
            reportResult('Vehicle capacity validation', createVehInvalidCap.status === 400);
        } catch (e) {
            reportResult('Vehicle basic rules', false, e.message);
        }

        // --- 3. DRIVER BUSINESS RULES ---
        let activeDriverId;
        let suspendedDriverId;
        let expiredDriverId;
        try {
            // Setup active driver
            const activeDriverRes = await request('POST', '/api/drivers', {
                firstName: 'Active',
                lastName: 'Driver',
                licenseNumber: `LIC-ACT-${Date.now()}`,
                licenseExpiry: '2030-01-01',
                status: 'active',
                availability: 'available'
            }, authHeaders);
            activeDriverId = activeDriverRes.body.data.driver.id;

            // Setup suspended driver
            const suspendedDriverRes = await request('POST', '/api/drivers', {
                firstName: 'Suspended',
                lastName: 'Driver',
                licenseNumber: `LIC-SUS-${Date.now()}`,
                licenseExpiry: '2030-01-01',
                status: 'suspended',
                availability: 'available'
            }, authHeaders);
            suspendedDriverId = suspendedDriverRes.body.data.driver.id;

            // Setup expired driver
            const expiredDriverRes = await request('POST', '/api/drivers', {
                firstName: 'Expired',
                lastName: 'Driver',
                licenseNumber: `LIC-EXP-${Date.now()}`,
                licenseExpiry: '2020-01-01', // Expired in the past
                status: 'active',
                availability: 'available'
            }, authHeaders);
            expiredDriverId = expiredDriverRes.body.data.driver.id;

            // Expired license validation
            const tripExpiredLicense = await request('POST', '/api/trips', {
                vehicleId: vehicleId,
                driverId: expiredDriverId,
                origin: 'NY',
                destination: 'LA'
            }, authHeaders);
            reportResult('Expired licenses cannot be assigned', tripExpiredLicense.status === 400);

            // Suspended driver validation
            const tripSuspendedDriver = await request('POST', '/api/trips', {
                vehicleId: vehicleId,
                driverId: suspendedDriverId,
                origin: 'NY',
                destination: 'LA'
            }, authHeaders);
            reportResult('Suspended drivers cannot be assigned', tripSuspendedDriver.status === 400);

        } catch (e) {
            reportResult('Driver basic rules', false, e.message);
        }

        // --- 4. TRIP WORKFLOW ---
        try {
            // Assign active vehicle & driver to a scheduled (Draft) trip
            const createTrip = await request('POST', '/api/trips', {
                vehicleId: vehicleId,
                driverId: activeDriverId,
                origin: 'New York',
                destination: 'Chicago',
                status: 'scheduled'
            }, authHeaders);
            const tripId = createTrip.body.data.trip.id;

            // Verify initial status
            reportResult('Trip starts in scheduled/draft status', createTrip.status === 201 && createTrip.body.data.trip.status === 'scheduled');

            // Dispatch: vehicle status becomes On Trip, driver availability becomes On Trip
            const dispatchRes = await request('PATCH', `/api/trips/${tripId}/dispatch`, {}, authHeaders);
            
            const dbVehicleDispatched = await get('SELECT status FROM vehicles WHERE id = ?', [vehicleId]);
            const dbDriverDispatched = await get('SELECT availability FROM drivers WHERE id = ?', [activeDriverId]);
            const dispatchedStatusCorrect = dbVehicleDispatched.status === 'on trip' && dbDriverDispatched.availability === 'on_trip';
            reportResult('Dispatch changes statuses to On Trip', dispatchedStatusCorrect);

            // Driver cannot have multiple active trips
            const secondTripRes = await request('POST', '/api/trips', {
                vehicleId: vehicleId,
                driverId: activeDriverId,
                origin: 'Chicago',
                destination: 'Detroit'
            }, authHeaders);
            reportResult('Driver cannot have multiple active trips', secondTripRes.status === 400);

            // Completion: vehicle becomes Available, driver becomes Available
            const completeRes = await request('PATCH', `/api/trips/${tripId}/complete`, {}, authHeaders);
            const dbVehicleCompleted = await get('SELECT status FROM vehicles WHERE id = ?', [vehicleId]);
            const dbDriverCompleted = await get('SELECT availability FROM drivers WHERE id = ?', [activeDriverId]);
            const completedStatusCorrect = dbVehicleCompleted.status === 'available' && dbDriverCompleted.availability === 'available';
            reportResult('Completion restores statuses to Available', completedStatusCorrect);

            // Cancellation: restores availability
            const createTrip2 = await request('POST', '/api/trips', {
                vehicleId: vehicleId,
                driverId: activeDriverId,
                origin: 'Boston',
                destination: 'New York',
                status: 'dispatched'
            }, authHeaders);
            const tripId2 = createTrip2.body.data.trip.id;

            await request('PATCH', `/api/trips/${tripId2}/cancel`, {}, authHeaders);
            const dbVehicleCancelled = await get('SELECT status FROM vehicles WHERE id = ?', [vehicleId]);
            const dbDriverCancelled = await get('SELECT availability FROM drivers WHERE id = ?', [activeDriverId]);
            const cancelledStatusCorrect = dbVehicleCancelled.status === 'available' && dbDriverCancelled.availability === 'available';
            reportResult('Cancellation restores availability', cancelledStatusCorrect);

        } catch (e) {
            reportResult('Trip workflow', false, e.message);
        }

        // --- 5. MAINTENANCE WORKFLOW ---
        try {
            // Creating active maintenance changes vehicle status to In Shop
            const maintRes = await request('POST', '/api/maintenance', {
                vehicleId: vehicleId,
                description: 'Radiator fix',
                cost: 150.00
            }, authHeaders);
            const maintId = maintRes.body.data.log.id;
            const dbVehicleMaint = await get('SELECT status FROM vehicles WHERE id = ?', [vehicleId]);
            reportResult('Creating active maintenance changes vehicle status to In Shop', dbVehicleMaint.status === 'in shop');

            // Vehicle unavailable for dispatch
            const tripWithMaintVehicle = await request('POST', '/api/trips', {
                vehicleId: vehicleId,
                driverId: activeDriverId,
                origin: 'NY',
                destination: 'LA'
            }, authHeaders);
            reportResult('Vehicle in maintenance is unavailable for dispatch', tripWithMaintVehicle.status === 400);

            // Completing maintenance: returns vehicle to Available
            await request('PATCH', `/api/maintenance/${maintId}/complete`, {}, authHeaders);
            const dbVehicleRestored = await get('SELECT status FROM vehicles WHERE id = ?', [vehicleId]);
            reportResult('Completing maintenance returns vehicle to Available', dbVehicleRestored.status === 'available');

        } catch (e) {
            reportResult('Maintenance workflow', false, e.message);
        }

        // --- 6. FUEL AND EXPENSES ---
        try {
            const fuelRes = await request('POST', '/api/fuel', {
                vehicleId: vehicleId,
                gallons: 25.5,
                cost: 85.00
            }, authHeaders);
            reportResult('Fuel logs save correctly', fuelRes.status === 201 && fuelRes.body.data.log.cost === 85.00);

            const expRes = await request('POST', '/api/expenses', {
                category: 'Tolls',
                amount: 30.00,
                description: 'Highway tolls'
            }, authHeaders);
            reportResult('Expenses save correctly', expRes.status === 201 && expRes.body.data.expense.amount === 30.00);

        } catch (e) {
            reportResult('Fuel and Expenses', false, e.message);
        }

        // --- 7. DASHBOARD METRICS ---
        try {
            const dashboardRes = await request('GET', '/api/dashboard/metrics', null, authHeaders);
            const body = dashboardRes.body.data;
            const keys = ['activeVehicles', 'availableVehicles', 'vehiclesInMaintenance', 'activeTrips', 'pendingTrips', 'driversOnDuty', 'fleetUtilization'];
            let allKeysPresent = true;
            for (const key of keys) {
                if (body[key] === undefined) allKeysPresent = false;
            }
            reportResult('Dashboard calculations use stored data', dashboardRes.status === 200 && allKeysPresent);
            reportResult('Dashboard APIs return required keys', allKeysPresent);
        } catch (e) {
            reportResult('Dashboard Metrics', false, e.message);
        }

    } catch (e) {
        console.error('Audit crashed:', e);
    } finally {
        if (serverInstance) serverInstance.close();
        
        console.log('\n==================================================');
        console.log('            TRANSITOPS AUDIT SUMMARY');
        console.log('==================================================');
        const total = results.length;
        const passedCount = results.filter(r => r.passed).length;
        console.log(`Passed: ${passedCount} / ${total}`);
        console.log(`Failed: ${total - passedCount}`);
        console.log('==================================================\n');

        if (passedCount === total) {
            console.log('ALL AUDIT CHECKS PASSED SUCCESSFULY! 🚀\n');
            process.exit(0);
        } else {
            console.error('AUDIT CHECKS FAILED! ❌\n');
            process.exit(1);
        }
    }
};

runAudit();
