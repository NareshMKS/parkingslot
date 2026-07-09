import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getSlots = async () => {
  const response = await api.get('/slots');
  return response.data;
};

export const getParkedVehicles = async () => {
  const response = await api.get('/parked');
  return response.data;
};

export const parkVehicle = async (vehicleNumber, vehicleType) => {
  const response = await api.post('/park', { vehicleNumber, vehicleType });
  return response.data;
};

export const exitVehicle = async (identifier, isTicketId) => {
  const payload = isTicketId ? { ticketId: identifier } : { vehicleNumber: identifier };
  const response = await api.post('/exit', payload);
  return response.data;
};

export default api;
