const { Pool } = require('pg');
require('dotenv').config();

// Use DATABASE_URL if available (Render provides this for PostgreSQL), otherwise use individual variables
const pool = new Pool(
  process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } // Required for Render Postgres external connections
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'parking_db',
        port: process.env.DB_PORT || 5432,
      }
);

// We keep a similar interface to mysql2's promise-based query for easy migration
module.exports = {
  query: (text, params) => pool.query(text, params).then(res => [res.rows]),
};
