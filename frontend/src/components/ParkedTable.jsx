import React from 'react';

const ParkedTable = ({ vehicles }) => {
  return (
    <div className="table-container">
      <h3>Currently parked</h3>
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Vehicle no.</th>
            <th>Type</th>
            <th>Entry time</th>
            <th>Slot</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-state">No vehicles currently parked.</td>
            </tr>
          ) : (
            vehicles.map((v) => (
              <tr key={v.ticketId}>
                <td className="bold">{v.ticketId}</td>
                <td>{v.vehicleNumber}</td>
                <td className="type-capitalize">{v.vehicleType}</td>
                <td>{new Date(v.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{v.slotNumber || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParkedTable;
