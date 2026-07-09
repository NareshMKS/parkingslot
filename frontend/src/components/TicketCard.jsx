import React from 'react';

const TicketCard = ({ ticket }) => {
  if (!ticket) return null;

  return (
    <div className="ticket-card">
      <h3>Sample ticket</h3>
      <div className="ticket-grid">
        <div className="ticket-col">
          <span className="label">TICKET ID</span>
          <span className="value">{ticket.ticketId}</span>
        </div>
        <div className="ticket-col">
          <span className="label">VEHICLE</span>
          <span className="value">{ticket.vehicleNumber}</span>
        </div>
        <div className="ticket-col">
          <span className="label">TYPE</span>
          <span className="value type-capitalize">{ticket.vehicleType}</span>
        </div>
        <div className="ticket-col">
          <span className="label">ENTRY TIME</span>
          <span className="value">
            {new Date(ticket.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        {ticket.slotNumber && (
          <div className="ticket-col">
            <span className="label">SLOT</span>
            <span className="value">{ticket.slotNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
