import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';
import qrImage from '../assets/qr.png';
import '../App.css';

export default function PaymentPage() {
  const [gpayNumber, setGpayNumber] = useState('');
  const navigate = useNavigate();

  const orderType = sessionStorage.getItem('orderType') || 'Dining';
  const total =
    orderType === 'Parcel'
      ? sessionStorage.getItem('parcelTotal') || 0
      : sessionStorage.getItem('diningTotal') || 0;

  const name = sessionStorage.getItem('name') || '';
  const mobile = sessionStorage.getItem('mobile') || '';
  const table = sessionStorage.getItem('table') || '';
  const selectedDishes = JSON.parse(sessionStorage.getItem('selectedDishes') || '[]');

  const handlePay = async () => {
    const orderData = {
      name,
      mobile,
      table: orderType === 'Dining' ? table : null,
      gpayNumber,
      total,
      orderType,
      dishes: selectedDishes,
    };

    try {
  const response = await fetch('https://food-ordering-backend-8yg3.onrender.com/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  const result = await response.json();  // Always parse the response for debugging

  if (response.ok) {
    console.log('✅ Order saved:', result);
    navigate('/success');
  } else {
    console.error('❌ Server error:', result);
    alert('Payment failed! Please try again.');
  }
} catch (error) {
  console.error('❌ Network or Fetch Error:', error);
  alert('Something went wrong!');
}
  }

  return (
    <div
      className="form-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        paddingTop: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="form-container"
        style={{
          background: '#f5f5f5',
          padding: '30px',
          borderRadius: '15px',
          textAlign: 'center',
          width: '300px',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>PAYMENT</h2>

        <img
          src={qrImage}
          alt="QR Code"
          style={{ width: '200px', margin: '0 auto', display: 'block' }}
        />

        <div
          style={{
            margin: '20px 0',
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#333',
          }}
        >
          OR
        </div>

        <input
          type="text"
          placeholder="Enter GPay Number"
          value={gpayNumber}
          onChange={(e) => setGpayNumber(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            width: '100%',
            textAlign: 'center',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />

        <p style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '16px' }}>
          Total Amount: ₹{total}
        </p>

        <button
          className="submit-button"
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '10px',
            fontSize: '16px',
          }}
          onClick={handlePay}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
