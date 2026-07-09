const LIMITS = require('../constants/limits');

const assignSlotNumber = (vehicleType, parkedVehicles) => {
  const prefixMap = { bike: 'B', car: 'C', truck: 'T' };
  const prefix = prefixMap[vehicleType];
  const maxSlots = LIMITS[vehicleType];

  const occupiedSlots = parkedVehicles
    .filter(v => v.vehicle_type === vehicleType && v.status === 'parked' && v.slot_number)
    .map(v => parseInt(v.slot_number.split('-')[1], 10));

  for (let i = 1; i <= maxSlots; i++) {
    if (!occupiedSlots.includes(i)) {
      return `${prefix}-${i}`;
    }
  }
  return null; // Should not happen if we checked availability before calling
};

module.exports = { assignSlotNumber };
