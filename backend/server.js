require('dotenv').config();
const express = require('express');
const cors = require('cors');
const parkingRoutes = require('./routes/parkingRoutes');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/db'); // Import DB to run init query

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database Table Automatically
const initDb = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        ticket_id VARCHAR(20) UNIQUE NOT NULL,
        vehicle_number VARCHAR(20) NOT NULL,
        vehicle_type VARCHAR(10) NOT NULL CHECK (vehicle_type IN ('bike','car','truck')),
        entry_time TIMESTAMP NOT NULL,
        exit_time TIMESTAMP DEFAULT NULL,
        amount DECIMAL(6,2) DEFAULT NULL,
        status VARCHAR(10) DEFAULT 'parked' CHECK (status IN ('parked','exited')),
        slot_number VARCHAR(10) DEFAULT NULL
      );
    `);
    console.log("Database table 'tickets' verified/created successfully.");
  } catch (error) {
    console.error("Failed to initialize database table:", error);
  }
};
initDb();

// Routes
app.use('/api', parkingRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
