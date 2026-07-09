const validateParkInput = (req, res, next) => {
  const { vehicleNumber, vehicleType } = req.body;
  if (!vehicleNumber || !vehicleType) {
    return res.status(400).json({ success: false, message: 'Vehicle number and vehicle type are required' });
  }
  
  const validTypes = ['bike', 'car', 'truck'];
  if (!validTypes.includes(vehicleType)) {
    return res.status(400).json({ success: false, message: 'Invalid vehicle type' });
  }

  next();
};

const validateExitInput = (req, res, next) => {
  const { ticketId, vehicleNumber } = req.body;
  if (!ticketId && !vehicleNumber) {
    return res.status(400).json({ success: false, message: 'Missing ticketId or vehicleNumber' });
  }
  next();
};

module.exports = { validateParkInput, validateExitInput };
