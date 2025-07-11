// DiningDetails.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';
import '../App.css';

export default function DiningDetails() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    const storedMobile = sessionStorage.getItem('mobile');
    const storedTable = sessionStorage.getItem('table');

    if (storedName) setName(storedName);
    if (storedMobile) setMobile(storedMobile);
    if (storedTable) setSelectedTable(storedTable);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mobile.length < 10) {
      setError('Incorrect mobile number');
      return;
    }

    if (!selectedTable) {
      alert('Please fill the table numbers before confirming.');
      return;
    }

    setError('');

    // ✅ Unified keys
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('mobile', mobile);
    sessionStorage.setItem('table', selectedTable);
    sessionStorage.setItem('orderType', 'Dining');

    navigate('/confirmation');
  };

  const handleTableRedirect = () => {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('mobile', mobile);
    navigate('/tableselection');
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
      }}
    >
      <h2 className="form-heading" style={{ textAlign: 'center' }}>DINING DETAILS</h2>

      <div className="input-box">
        <div className="form-container">
          <input
            type="text"
            placeholder="ENTER YOUR NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="ENTER MOBILE NUMBER"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        </div>
      </div>

      <div className="cloud-container" onClick={handleTableRedirect} style={{ cursor: 'pointer' }}>
        <div className="cloud-heading" style={{ textAlign: 'center', fontWeight: 'bold' }}>
          🍽️ SEE AVAILABLE TABLES
        </div>
      </div>

      <button className="submit-button" onClick={handleSubmit}>CONFIRM ORDER</button>
    </div>
  );
}
