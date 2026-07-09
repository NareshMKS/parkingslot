const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 1. Connect to SQLite database (creates parking.db file if it doesn't exist)
const dbPath = path.resolve(__dirname, 'parking.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

// 2. Initialize the database schema
function initializeDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticket_id TEXT UNIQUE NOT NULL,
            vehicle_number TEXT NOT NULL,
            vehicle_type TEXT NOT NULL CHECK(vehicle_type IN ('bike', 'car', 'truck')),
            entry_time DATETIME NOT NULL,
            exit_time DATETIME DEFAULT NULL,
            amount DECIMAL(6,2) DEFAULT NULL,
            status TEXT NOT NULL DEFAULT 'parked' CHECK(status IN ('parked', 'exited'))
        );
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Tickets table ready.');
        }
    });
}

// 3. Export the database connection so other files can use it
module.exports = db;
