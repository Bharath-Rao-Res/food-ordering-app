import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';
import '../App.css';

export default function TableSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const toggleSeat = (seatLabel) => {
    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatLabel));
    } else {
      setSelectedSeats([...selectedSeats, seatLabel]);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat before proceeding.');
      return;
    }

    sessionStorage.setItem('selectedTable', selectedSeats.join(', '));
    navigate('/dining');
  };

  const renderSeats = (table, count) => {
    return (
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}><b>{table}</b></h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {[...Array(count)].map((_, index) => {
            const seatLabel = `${table} - Seat ${index + 1}`;
            const selected = selectedSeats.includes(seatLabel);
            return (
              <button
                key={seatLabel}
                onClick={() => toggleSeat(seatLabel)}
                className={`table-button ${selected ? 'selected' : ''}`}
              >
                Seat {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="form-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        paddingBottom: '30px',
      }}
    >
      <h2 className="form-heading">TABLE SELECTION</h2>

      <div className="input-box">
        <div className="form-container">
          {renderSeats('Table 1', 2)}
          {renderSeats('Table 2', 4)}
          {renderSeats('Table 3', 6)}
        </div>
      </div>

      <button className="submit-button" onClick={handleConfirm}>
        CONFIRM SELECTION
      </button>
    </div>
  );
}
