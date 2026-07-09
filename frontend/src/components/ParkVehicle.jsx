import React, { useState } from 'react';
import { parkVehicle } from '../services/api';

const ParkVehicle = ({ onSuccess }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!vehicleNumber) {
      setError('Vehicle number is required');
      return;
    }

    try {
      const res = await parkVehicle(vehicleNumber.toUpperCase(), vehicleType);
      setVehicleNumber('');
      onSuccess(res.ticket);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to park vehicle');
    }
  };

  return (
    <div className="form-card">
      <h3>Park a vehicle</h3>
      <p className="subtitle">Generates a ticket</p>
      
      {error && <div className="error-alert">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vehicle number</label>
          <input 
            type="text" 
            placeholder="KA01AB1234"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Vehicle type</label>
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Generate ticket</button>
      </form>
    </div>
  );
};

export default ParkVehicle;
