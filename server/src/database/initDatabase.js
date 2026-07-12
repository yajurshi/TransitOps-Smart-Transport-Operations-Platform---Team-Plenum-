const fs = require('fs');
const path = require('path');
const { db } = require('../config/database');

const initDatabase = () => {
    return new Promise((resolve, reject) => {
        console.log('[TransitOps] Initializing database schema and seeds...');
        
        try {
            const schemaPath = path.resolve(__dirname, '../../database/schema.sql');
            const seedPath = path.resolve(__dirname, '../../database/seed.sql');

            const schemaSql = fs.readFileSync(schemaPath, 'utf8');
            const seedSql = fs.readFileSync(seedPath, 'utf8');

            // db.exec safely runs multiple statements
            db.exec(schemaSql, (err) => {
                if (err) {
                    console.error('[TransitOps] Error executing schema:', err);
                    return reject(err);
                }
                
                db.exec(seedSql, (err) => {
                    if (err) {
                        console.error('[TransitOps] Error executing seeds:', err);
                        return reject(err);
                    }
                    console.log('[TransitOps] Database initialization complete.');
                    resolve();
                });
            });
        } catch (error) {
            console.error('[TransitOps] Critical Error during Database Initialization:', error);
            reject(error);
        }
    });
};

module.exports = initDatabase;
