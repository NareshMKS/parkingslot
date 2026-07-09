import React, { useState } from 'react';
import { exitVehicle } from '../services/api';

const ExitVehicle = ({ onSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setReceipt(null);

    if (!identifier) {
      setError('Ticket ID or Vehicle Number is required');
      return;
    }

    try {
      const isTicketId = identifier.toUpperCase().startsWith('TKT-');
      const res = await exitVehicle(isTicketId ? identifier.toUpperCase() : identifier.toUpperCase(), isTicketId);
      setReceipt(res.receipt);
      setIdentifier('');
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to exit vehicle');
    }
  };

  return (
    <div className="form-card">
      <h3>Exit a vehicle</h3>
      <p className="subtitle">Calculates the fare</p>
      
      {error && <div className="error-alert">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ticket ID or vehicle number</label>
          <input 
            type="text" 
            placeholder="TKT-1001"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-outline">Exit and calculate fare</button>
      </form>

      {receipt && (
        <div className="receipt">
          <div className="receipt-row">
            <span>Duration</span>
            <span className="bold">{receipt.durationHours} hours</span>
          </div>
          <div className="receipt-row">
            <span>Amount due</span>
            <span className="amount-due">₹{receipt.amount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExitVehicle;
