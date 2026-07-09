import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

export const getSlots = async () => {
  const res = await axios.get(`${API_BASE}/slots`);
  return res.data;
};

export const getParkedVehicles = async () => {
  const res = await axios.get(`${API_BASE}/parked`);
  return res.data;
};

export const parkVehicle = async (vehicleNumber, vehicleType) => {
  const res = await axios.post(`${API_BASE}/park`, { vehicleNumber, vehicleType });
  return res.data;
};

export const exitVehicle = async (identifier, isTicketId) => {
  const payload = isTicketId ? { ticketId: identifier } : { vehicleNumber: identifier };
  const res = await axios.post(`${API_BASE}/exit`, payload);
  return res.data;
};
