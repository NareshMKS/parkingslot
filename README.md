# Parking Lot Management System

A complete full-stack Parking Lot Management System built with a strict MVC architecture.

## Tech Stack
- **Frontend**: React, Axios, CSS (No Bootstrap)
- **Backend**: Node.js, Express.js, MySQL, dotenv, cors

## Folder Structure
```
ParkingLotSystem/
├── backend/
│   ├── config/          # Database configuration
│   ├── constants/       # Fixed limits
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Validation and Error handling
│   ├── routes/          # API route definitions
│   ├── services/        # Core business logic
│   ├── sql/             # Database schema
│   ├── utils/           # Fare calculators, ticket generation
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/  # Modular React components
│   │   ├── services/    # Axios API service
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
└── README.md
```

## Setup Instructions

### 1. MySQL Setup
1. Create a MySQL database (e.g., `parking_db`).
2. Run the schema found in `backend/sql/schema.sql` to create the `tickets` table.

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
3. Update `.env` with your MySQL credentials.
4. Start the server:
   ```bash
   npm start # or node server.js
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

- **GET `/api/slots`**: Returns current slot availability.
- **GET `/api/parked`**: Returns a list of currently parked vehicles.
- **POST `/api/park`**: Parks a vehicle. Requires `{ vehicleNumber, vehicleType }`.
- **POST `/api/exit`**: Exits a vehicle. Requires `{ ticketId }` or `{ vehicleNumber }`.
