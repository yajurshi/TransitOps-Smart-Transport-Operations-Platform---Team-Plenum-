const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DB_PATH ? path.resolve(__dirname, '../../', process.env.DB_PATH) : path.resolve(__dirname, '../../database/transitops.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('[TransitOps] Failed to connect to SQLite database:', err);
    } else {
        console.log('[TransitOps] SQLite (sqlite3) connected successfully at:', dbPath);
        db.run('PRAGMA foreign_keys = ON');
        db.run('PRAGMA journal_mode = WAL');
    }
});

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve(this); // Contains lastID and changes
        });
    });
}

function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = { db, run, get, all };
