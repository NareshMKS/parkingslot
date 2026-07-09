const calculateFare = (durationHours) => {
  if (durationHours <= 3) return 30;
  if (durationHours <= 6) return 85;
  return 120;
};

module.exports = { calculateFare };
