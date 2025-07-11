import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import backgroundImage from '../assets/background.jpg';
import dish1 from '../assets/dish1.jpg';
import dish2 from '../assets/dish2.jpg';
import dish3 from '../assets/dish3.jpg';
import dish4 from '../assets/dish4.jpg';
import dish5 from '../assets/dish5.jpg';

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/menu');
  };

  return (
    <div
      className="welcome-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        paddingBottom: '40px',
      }}
    >
    
      <h1
        style={{
          fontFamily: "'Cinzel', serif",  // or your chosen font
          fontSize: '28px',               // ↓ Reduced font size
          color: '#000',
          textAlign: 'center',
          marginTop: '10px',
          paddingTop: '70px',
        }}
>
  Welcome to the Restaurant
</h1>



      <div className="dish-container">
        <div className="dish-row">
          <img src={dish1} alt="Dish 1" className="dish-image" />
          <img src={dish2} alt="Dish 2" className="dish-image" />
          <img src={dish3} alt="Dish 3" className="dish-image" />
        </div>
        <div className="dish-row">
          <img src={dish4} alt="Dish 4" className="dish-image" />
          <img src={dish5} alt="Dish 5" className="dish-image" />
        </div>
      </div>

      <div className="booking-container">
        <button className="booking-button" onClick={handleBookingClick}>
          Start Booking
        </button>
      </div>

      <div className="enquiry-text">
        📞 FOR ANY ENQUIRY: 9876543210
      </div>
    </div>
  );
}
