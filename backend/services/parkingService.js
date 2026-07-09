const db = require('../config/db');
const LIMITS = require('../constants/limits');
const { generateTicketId } = require('../utils/ticketGenerator');
const { assignSlotNumber } = require('../utils/slotManager');
const { calculateFare } = require('../utils/fareCalculator');

class ParkingService {
  async getSlotsAvailability() {
    const [rows] = await db.query(`
      SELECT vehicle_type, COUNT(*) AS occupied 
      FROM tickets 
      WHERE status = 'parked' 
      GROUP BY vehicle_type
    `);

    const occupiedMap = {};
    rows.forEach(row => {
      occupiedMap[row.vehicle_type] = parseInt(row.occupied, 10);
    });

    return {
      bike: { total: LIMITS.bike, available: LIMITS.bike - (occupiedMap['bike'] || 0) },
      car: { total: LIMITS.car, available: LIMITS.car - (occupiedMap['car'] || 0) },
      truck: { total: LIMITS.truck, available: LIMITS.truck - (occupiedMap['truck'] || 0) }
    };
  }

  async getParkedVehicles() {
    const [rows] = await db.query(`
      SELECT ticket_id AS "ticketId", vehicle_number AS "vehicleNumber", vehicle_type AS "vehicleType", entry_time AS "entryTime", slot_number AS "slotNumber"
      FROM tickets 
      WHERE status = 'parked'
      ORDER BY entry_time DESC
    `);
    return rows;
  }

  async parkVehicle({ vehicleNumber, vehicleType }) {
    // Check if duplicate
    const [existing] = await db.query(`SELECT id FROM tickets WHERE vehicle_number = $1 AND status = 'parked'`, [vehicleNumber]);
    if (existing.length > 0) {
      const error = new Error('Already Parked');
      error.statusCode = 400;
      throw error;
    }

    // Check availability
    const [countRows] = await db.query(`SELECT COUNT(*) AS occupied FROM tickets WHERE vehicle_type = $1 AND status = 'parked'`, [vehicleType]);
    const occupied = parseInt(countRows[0].occupied, 10);

    if (occupied >= LIMITS[vehicleType]) {
      const error = new Error('Parking Full');
      error.statusCode = 409;
      throw error;
    }

    // Get last ticket ID for generation
    const [lastTicketRow] = await db.query(`SELECT ticket_id FROM tickets ORDER BY id DESC LIMIT 1`);
    const lastTicketId = lastTicketRow.length > 0 ? lastTicketRow[0].ticket_id : null;
    const ticketId = generateTicketId(lastTicketId);

    // Get all parked vehicles for dynamic slot assignment
    const [allParked] = await db.query(`SELECT * FROM tickets WHERE status = 'parked'`);
    const slotNumber = assignSlotNumber(vehicleType, allParked);
    const entryTime = new Date();

    await db.query(`
      INSERT INTO tickets (ticket_id, vehicle_number, vehicle_type, entry_time, status, slot_number)
      VALUES ($1, $2, $3, $4, 'parked', $5)
    `, [ticketId, vehicleNumber, vehicleType, entryTime, slotNumber]);

    return {
      ticketId,
      vehicleNumber,
      vehicleType,
      entryTime,
      slotNumber
    };
  }

  async exitVehicle({ identifier, isTicketId }) {
    const queryField = isTicketId ? 'ticket_id' : 'vehicle_number';
    const [tickets] = await db.query(`SELECT * FROM tickets WHERE ${queryField} = $1 AND status = 'parked'`, [identifier]);

    if (tickets.length === 0) {
      const error = new Error('Ticket not found or already exited');
      error.statusCode = 404;
      throw error;
    }

    const ticket = tickets[0];
    const entryTime = new Date(ticket.entry_time);
    const exitTime = new Date();
    const ms = exitTime - entryTime;
    const durationHours = Math.max(1, Math.ceil(ms / (1000 * 60 * 60))); // round up to full hours

    const amount = calculateFare(durationHours);

    await db.query(`
      UPDATE tickets 
      SET exit_time = $1, amount = $2, status = 'exited', slot_number = NULL
      WHERE id = $3
    `, [exitTime, amount, ticket.id]);

    return {
      ticketId: ticket.ticket_id,
      vehicleNumber: ticket.vehicle_number,
      entryTime: ticket.entry_time,
      exitTime,
      durationHours,
      amount
    };
  }
}

module.exports = new ParkingService();

