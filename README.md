# Parking Lot Management System

A full-stack Parking Lot Management System featuring a modern, dark-themed glassmorphism UI and a robust MVC backend architecture. It allows operators to check live capacity, issue automated parking tickets, and calculate dynamic fare charges upon exit based on duration.

## Tech Stack
- **Frontend**: React (Vite), Axios, Custom CSS (Glassmorphism UI)
- **Backend**: Node.js, Express.js, PostgreSQL (pg), cors
- **Deployment**: Vercel (Frontend), Render (Backend/PostgreSQL Database)

## Features
- **Live Slot Availability**: Tracks remaining slots for Bikes, Cars, and Trucks in real-time.
- **Dynamic Ticketing System**: Automatically generates secure tickets and assigns empty slot numbers upon entry.
- **Smart Exit & Billing**: Calculates time parked and generates a dynamic fare automatically (₹30 for 1-3hrs, ₹85 for 4-6hrs, ₹120 for 7+hrs).
- **Auto-Initialization**: The backend automatically sets up the PostgreSQL database schema upon its first start.

## Folder Structure
```
ParkingLotSystem/
├── backend/
│   ├── config/          # Database connection pooling
│   ├── constants/       # Fixed vehicle slot limits
│   ├── controllers/     # API Request handlers
│   ├── middleware/      # Validation and Global Error handling
│   ├── routes/          # Express API definitions
│   ├── services/        # Core business logic
│   ├── sql/             # Database schema backup
│   ├── utils/           # Fare calculators, ticket algorithms
│   ├── .env.example     # Environment template
│   ├── package.json     
│   └── server.js        # Entry point & Auto DB initialization
├── frontend/
│   ├── src/
│   │   ├── components/  # Modular React components (Cards, Tables, Forms)
│   │   ├── services/    # Axios API service calls
│   │   ├── App.jsx      # Main Application Layout
│   │   ├── App.css      # Custom Glassmorphism Styles
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Setup & Deployment Instructions

### 1. Database Setup (Render / PostgreSQL)
1. Provide a `DATABASE_URL` in your backend `.env` file pointing to a valid PostgreSQL instance.
2. The `server.js` file contains a script that will automatically detect and create the `tickets` table if it does not exist upon starting up.

### 2. Backend Setup
1. Navigate to `backend/` and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your PostgreSQL `DATABASE_URL`.
4. Start the server (this will also auto-init the database):
   ```bash
   npm start 
   ```

### 3. Frontend Setup
1. Navigate to `frontend/` and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- **GET `/api/slots`**: Returns current slot availability and limits.
- **GET `/api/parked`**: Returns a detailed list of currently parked vehicles and their metrics.
- **POST `/api/park`**: Parks a vehicle. Requires `{ vehicleNumber, vehicleType }`. Returns ticket.
- **POST `/api/exit`**: Exits a vehicle. Requires `{ ticketId }` or `{ vehicleNumber }`. Returns generated fare.
