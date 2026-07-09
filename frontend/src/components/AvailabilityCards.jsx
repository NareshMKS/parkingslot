import React from 'react';

const AvailabilityCards = ({ slots }) => {
  const types = ['bike', 'car', 'truck'];

  return (
    <div className="availability-cards">
      {types.map(type => {
        const info = slots[type] || { total: 0, available: 0 };
        const occupied = info.total - info.available;
        const isFull = info.available === 0;
        const percentage = info.total === 0 ? 0 : (occupied / info.total) * 100;

        return (
          <div key={type} className={`card ${isFull ? 'full' : ''}`}>
            <div className="card-header">
              <span className={`dot ${type}`}></span>
              <span className="type-name">{type}</span>
              {isFull && <span className="full-badge">Full</span>}
            </div>
            <div className="card-body">
              <h2>{info.available}</h2>
              <span className="subtext">/ {info.total} free</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className={`progress-bar ${type} ${isFull ? 'progress-full' : ''}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AvailabilityCards;
