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
    const storedName = sessionStorage.getItem('diningName');
    const storedMobile = sessionStorage.getItem('diningMobile');
    const storedTable = sessionStorage.getItem('selectedTable');

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

    sessionStorage.setItem('diningName', name);
    sessionStorage.setItem('diningMobile', mobile);
    sessionStorage.setItem('orderType', 'Dining');
    sessionStorage.setItem('selectedTable', selectedTable);

    navigate('/confirmation');
  };

  const handleTableRedirect = () => {
    sessionStorage.setItem('diningName', name);
    sessionStorage.setItem('diningMobile', mobile);
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
        paddingBottom: '30px',
      }}
    >
      <h2
        className="form-heading"
        style={{
          fontFamily: "'Rubik', sans-serif",
          fontWeight: '700',
          fontSize: '32px',
          color: 'black',
          textAlign: 'center',
          marginBottom: '20px',
        }}
>
  DINING DETAILS
</h2>



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
          {error && (
            <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{error}</p>
          )}
        </div>
      </div>

      <div
  className="cloud-container"
  onClick={handleTableRedirect}
  style={{ cursor: 'pointer' }}
>
  <div
    className="cloud-heading"
    style={{
      fontFamily: "'Cinzel Decorative', cursive",
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      letterSpacing: '1px',
    }}
  >
    🍽️ SEE AVAILABLE TABLES
  </div>
</div>


      <button className="submit-button" onClick={handleSubmit}>
        CONFIRM ORDER
      </button>
    </div>
  );
}
