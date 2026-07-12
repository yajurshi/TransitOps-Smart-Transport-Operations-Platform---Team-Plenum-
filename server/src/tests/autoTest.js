const http = require('http');
const fs = require('fs');
const path = require('path');
const app = require('../app');
const { get, all } = require('../config/database');
const initDatabase = require('../database/initDatabase');

const TEST_PORT = 5099;
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

const runTests = async () => {
    console.log('\n--- STARTING AUTOMATED TEST SUITE ---\n');
    let serverInstance;

    try {
        // 1. Initialize DB
        console.log('[Test] Initializing DB...');
        await initDatabase();
        console.log('[Test] DB initialized successfully.');

        // 2. Verify Database File Exists
        const dbPath = path.resolve(__dirname, '../../database/transitops.db');
        if (!fs.existsSync(dbPath)) {
            throw new Error(`Database file does not exist at ${dbPath}`);
        }
        console.log('[Test] Verified database file exists.');

        // 3. Verify Tables Exist
        const expectedTables = ['roles', 'users', 'vehicles', 'drivers', 'trips', 'maintenance_logs', 'fuel_logs', 'expenses', 'notifications', 'settings'];
        for (const table of expectedTables) {
            const row = await get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [table]);
            if (!row) throw new Error(`Table ${table} is missing from the database`);
        }
        console.log('[Test] Verified all 10 tables exist.');

        // 4. Verify Roles Seeded
        const roles = await all('SELECT name FROM roles');
        const roleNames = roles.map(r => r.name);
        const expectedRoles = ['Administrator', 'Fleet Manager', 'Dispatcher', 'Maintenance Manager', 'Financial Analyst'];
        for (const role of expectedRoles) {
            if (!roleNames.includes(role)) {
                throw new Error(`Role ${role} was not seeded`);
            }
        }
        console.log('[Test] Verified all roles seeded successfully.');

        // Start Express server on test port
        serverInstance = app.listen(TEST_PORT);
        console.log(`[Test] Server started on port ${TEST_PORT}`);

        // 5. Register API
        console.log('[Test] Testing Register API...');
        const uniqueEmail = `testuser_${Date.now()}@test.com`;
        const regRes = await request('POST', '/api/auth/register', {
            firstName: 'Test',
            lastName: 'User',
            email: uniqueEmail,
            password: 'password123',
            phone: '1234567890',
            role: 'Administrator'
        });

        if (regRes.status !== 201 || !regRes.body.success) {
            throw new Error(`Register failed: ${JSON.stringify(regRes.body)}`);
        }
        console.log('[Test] Register API works.');

        // 6. Login API
        console.log('[Test] Testing Login API...');
        const loginRes = await request('POST', '/api/auth/login', {
            email: uniqueEmail,
            password: 'password123'
        });

        if (loginRes.status !== 200 || !loginRes.body.success || !loginRes.body.data.token) {
            throw new Error(`Login failed: ${JSON.stringify(loginRes.body)}`);
        }
        const token = loginRes.body.data.token;
        const headers = { 'Authorization': `Bearer ${token}` };
        console.log('[Test] Login API works. Token received.');

        // 7. Profile API
        console.log('[Test] Testing Profile API...');
        const profileRes = await request('GET', '/api/auth/profile', null, headers);
        if (profileRes.status !== 200 || !profileRes.body.success || profileRes.body.data.user.email !== uniqueEmail) {
            throw new Error(`Profile check failed: ${JSON.stringify(profileRes.body)}`);
        }
        const userId = profileRes.body.data.user.id;
        console.log('[Test] Profile API and JWT works.');

        // 8. Vehicle CRUD
        console.log('[Test] Testing Vehicle CRUD...');
        const uniqueReg = `REG-${Date.now()}`;
        const createVeh = await request('POST', '/api/vehicles', {
            registration: uniqueReg,
            model: 'Cargo Master 3000',
            type: 'Cargo Truck',
            capacity: 8000,
            status: 'available'
        }, headers);

        if (createVeh.status !== 201 || !createVeh.body.success) {
            throw new Error(`Vehicle creation failed: ${JSON.stringify(createVeh.body)}`);
        }
        const vehicleId = createVeh.body.data.vehicle.id;

        const updateVeh = await request('PUT', `/api/vehicles/${vehicleId}`, {
            registration: uniqueReg,
            model: 'Cargo Master 3000 Updated',
            type: 'Cargo Truck',
            capacity: 9000,
            status: 'available'
        }, headers);

        if (updateVeh.status !== 200 || !updateVeh.body.success) {
            throw new Error(`Vehicle update failed: ${JSON.stringify(updateVeh.body)}`);
        }

        const getVehs = await request('GET', '/api/vehicles', null, headers);
        if (getVehs.status !== 200 || !getVehs.body.data.vehicles.some(v => v.id === vehicleId)) {
            throw new Error('Vehicle GET list failed');
        }
        console.log('[Test] Vehicle CRUD works.');

        // 9. Driver CRUD
        console.log('[Test] Testing Driver CRUD...');
        const uniqueLicense = `LIC-${Date.now()}`;
        const createDriver = await request('POST', '/api/drivers', {
            firstName: 'Super',
            lastName: 'Driver',
            licenseNumber: uniqueLicense,
            contact: '555-5555',
            availability: 'available',
            status: 'active'
        }, headers);

        if (createDriver.status !== 201 || !createDriver.body.success) {
            throw new Error(`Driver creation failed: ${JSON.stringify(createDriver.body)}`);
        }
        const driverId = createDriver.body.data.driver.id;

        const updateDriver = await request('PUT', `/api/drivers/${driverId}`, {
            firstName: 'Super Updated',
            lastName: 'Driver',
            licenseNumber: uniqueLicense,
            contact: '555-6666',
            availability: 'available',
            status: 'active'
        }, headers);

        if (updateDriver.status !== 200 || !updateDriver.body.success) {
            throw new Error(`Driver update failed: ${JSON.stringify(updateDriver.body)}`);
        }

        const getDrivers = await request('GET', '/api/drivers', null, headers);
        if (getDrivers.status !== 200 || !getDrivers.body.data.drivers.some(d => d.id === driverId)) {
            throw new Error('Driver GET list failed');
        }
        console.log('[Test] Driver CRUD works.');

        // 10. Trip CRUD
        console.log('[Test] Testing Trip CRUD...');
                const createTrip = await request('POST', '/api/trips', {
            vehicleId: vehicleId,
            driverId: driverId,
            origin: 'New York',
            destination: 'Los Angeles',
            distance: 3000,
            status: 'scheduled'
        }, headers);

        if (createTrip.status !== 201 || !createTrip.body.success) {
            throw new Error(`Trip creation failed: ${JSON.stringify(createTrip.body)}`);
        }
        const tripId = createTrip.body.data.trip.id;

        const updateTrip = await request('PATCH', `/api/trips/${tripId}/complete`, {}, headers);
        if (updateTrip.status !== 200 || !updateTrip.body.success) {
            throw new Error(`Trip completion failed: ${JSON.stringify(updateTrip.body)}`);
        }

        const getTrips = await request('GET', '/api/trips', null, headers);
        if (getTrips.status !== 200 || !getTrips.body.data.trips.some(t => t.id === tripId)) {
            throw new Error('Trip GET list failed');
        }
        console.log('[Test] Trip CRUD works.');

        // 11. Maintenance CRUD
        console.log('[Test] Testing Maintenance CRUD...');
                const createMaint = await request('POST', '/api/maintenance', {
            vehicleId: vehicleId,
            description: 'Regular service and oil change',
            cost: 250.50,
            status: 'pending'
        }, headers);

        if (createMaint.status !== 201 || !createMaint.body.success) {
            throw new Error(`Maintenance creation failed: ${JSON.stringify(createMaint.body)}`);
        }
        const maintId = createMaint.body.data.log.id;

        const updateMaint = await request('PATCH', `/api/maintenance/${maintId}/complete`, {}, headers);
        if (updateMaint.status !== 200 || !updateMaint.body.success) {
            throw new Error(`Maintenance completion failed: ${JSON.stringify(updateMaint.body)}`);
        }

        const getMaint = await request('GET', '/api/maintenance', null, headers);
        if (getMaint.status !== 200 || !getMaint.body.data.logs.some(m => m.id === maintId)) {
            throw new Error('Maintenance GET list failed');
        }
        console.log('[Test] Maintenance CRUD works.');

        // 12. Fuel CRUD
        console.log('[Test] Testing Fuel CRUD...');
        const createFuel = await request('POST', '/api/fuel', {
            vehicleId: vehicleId,
            gallons: 50,
            cost: 175.50,
            date: new Date().toISOString()
        }, headers);

        if (createFuel.status !== 201 || !createFuel.body.success) {
            throw new Error(`Fuel creation failed: ${JSON.stringify(createFuel.body)}`);
        }
        const fuelId = createFuel.body.data.log.id;

        const getFuel = await request('GET', '/api/fuel', null, headers);
        if (getFuel.status !== 200 || !getFuel.body.data.logs.some(f => f.id === fuelId)) {
            throw new Error('Fuel GET list failed');
        }
        console.log('[Test] Fuel CRUD works.');

        // 13. Expense CRUD
        console.log('[Test] Testing Expense CRUD...');
        const createExpense = await request('POST', '/api/expenses', {
            category: 'Office Supplies',
            amount: 45.99,
            description: 'Printer ink'
        }, headers);

        if (createExpense.status !== 201 || !createExpense.body.success) {
            throw new Error(`Expense creation failed: ${JSON.stringify(createExpense.body)}`);
        }
        const expenseId = createExpense.body.data.expense.id;

        const getExpenses = await request('GET', '/api/expenses', null, headers);
        if (getExpenses.status !== 200 || !getExpenses.body.data.expenses.some(e => e.id === expenseId)) {
            throw new Error('Expense GET list failed');
        }
        console.log('[Test] Expense CRUD works.');

        // 14. Notification CRUD
        console.log('[Test] Testing Notification CRUD...');
        const { createNotification } = require('../repositories/notification.repository');
        await createNotification(userId, 'Test Notification Message');

        const getNotifs = await request('GET', '/api/notifications', null, headers);
        if (getNotifs.status !== 200 || !getNotifs.body.data.notifications.length) {
            throw new Error('Notification GET list failed');
        }
        const notifId = getNotifs.body.data.notifications[0].id;

        const markRead = await request('PATCH', `/api/notifications/${notifId}/read`, null, headers);
        if (markRead.status !== 200 || !markRead.body.success) {
            throw new Error('Notification mark read failed');
        }
        console.log('[Test] Notification CRUD works.');

        // 15. Settings CRUD
        console.log('[Test] Testing Settings CRUD...');
        const updateTheme = await request('PUT', '/api/settings/theme', { theme: 'dark' }, headers);
        if (updateTheme.status !== 200 || !updateTheme.body.success) {
            throw new Error('Settings theme update failed');
        }

        const updatePref = await request('PUT', '/api/settings/preferences', { preferences: { email: false, push: true } }, headers);
        if (updatePref.status !== 200 || !updatePref.body.success) {
            throw new Error('Settings preferences update failed');
        }

        const getSettings = await request('GET', '/api/settings', null, headers);
        if (getSettings.status !== 200 || getSettings.body.data.theme !== 'dark') {
            throw new Error('Settings GET failed');
        }
        console.log('[Test] Settings CRUD works.');

        console.log('\n--- ALL TESTS PASSED SUCCESSFULLY! ---\n');
        process.exit(0);

    } catch (err) {
        console.error('\n--- TEST FAILURE! ---');
        console.error(err);
        process.exit(1);
    } finally {
        if (serverInstance) serverInstance.close();
    }
};

runTests();
