import React, { useState, useEffect, useCallback } from 'react';
import { getSlots, getParkedVehicles } from './services/api';
import AvailabilityCards from './components/AvailabilityCards';
import ParkVehicle from './components/ParkVehicle';
import ExitVehicle from './components/ExitVehicle';
import TicketCard from './components/TicketCard';
import ParkedTable from './components/ParkedTable';
import './App.css';

function App() {
  const [slots, setSlots] = useState({});
  const [parkedVehicles, setParkedVehicles] = useState([]);
  const [latestTicket, setLatestTicket] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const [slotsData, parkedData] = await Promise.all([
        getSlots(),
        getParkedVehicles()
      ]);
      setSlots(slotsData);
      setParkedVehicles(parkedData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleParkSuccess = (ticket) => {
    setLatestTicket(ticket);
    loadData();
  };

  const handleExitSuccess = () => {
    setLatestTicket(null); // Optional: clear latest ticket on exit
    loadData();
  };

  return (
    <div className="container">
      <header>
        <h1>Parking Slot Management</h1>
        <p className="subtitle">
          {Object.values(slots).reduce((acc, curr) => acc + (curr.total - curr.available), 0)} of {Object.values(slots).reduce((acc, curr) => acc + curr.total, 0)} slots occupied
        </p>
      </header>

      <AvailabilityCards slots={slots} />

      <div className="forms-container">
        <ParkVehicle onSuccess={handleParkSuccess} />
        <ExitVehicle onSuccess={handleExitSuccess} />
      </div>

      <TicketCard ticket={latestTicket} />

      <ParkedTable vehicles={parkedVehicles} />
    </div>
  );
}

export default App;
