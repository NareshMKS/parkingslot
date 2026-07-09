const parkingService = require('../services/parkingService');

const getSlots = async (req, res, next) => {
  try {
    const slots = await parkingService.getSlotsAvailability();
    res.status(200).json(slots);
  } catch (error) {
    next(error);
  }
};

const getParkedVehicles = async (req, res, next) => {
  try {
    const parked = await parkingService.getParkedVehicles();
    res.status(200).json(parked);
  } catch (error) {
    next(error);
  }
};

const parkVehicle = async (req, res, next) => {
  try {
    const { vehicleNumber, vehicleType } = req.body;
    const ticket = await parkingService.parkVehicle({ vehicleNumber, vehicleType });
    res.status(201).json({ success: true, ticket });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const exitVehicle = async (req, res, next) => {
  try {
    const { ticketId, vehicleNumber } = req.body;
    const isTicketId = !!ticketId;
    const identifier = ticketId || vehicleNumber;
    
    const receipt = await parkingService.exitVehicle({ identifier, isTicketId });
    res.status(200).json({ success: true, receipt });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    next(error);
  }
};

module.exports = {
  getSlots,
  getParkedVehicles,
  parkVehicle,
  exitVehicle
};
