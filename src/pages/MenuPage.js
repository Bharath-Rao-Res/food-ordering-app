import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import backgroundImage from '../assets/background.jpg';

const dishes = [
  { id: 1, name: 'Chicken Biryani', price: 180 },
  { id: 2, name: 'Paneer Butter Masala', price: 160 },
  { id: 3, name: 'Fried Rice', price: 140 },
  { id: 4, name: 'Chicken Lollipop', price: 150 },
  { id: 5, name: 'Veg Noodles', price: 130 },
  { id: 6, name: 'Mutton Curry', price: 220 },
  { id: 7, name: 'Gobi Manchurian', price: 110 },
  { id: 8, name: 'Egg Curry', price: 100 },
  { id: 9, name: 'Butter Naan', price: 40 },
  { id: 10, name: 'Chicken Kebab', price: 160 },
  { id: 11, name: 'Veg Pulao', price: 120 },
  { id: 12, name: 'Dal Tadka', price: 90 },
  { id: 13, name: 'Fish Fry', price: 190 },
  { id: 14, name: 'Tandoori Chicken', price: 210 },
  { id: 15, name: 'Schezwan Noodles', price: 140 },
  { id: 16, name: 'Paneer Tikka', price: 170 },
  { id: 17, name: 'Egg Fried Rice', price: 130 },
  { id: 18, name: 'Chilli Chicken', price: 150 },
  { id: 19, name: 'Chicken Curry', price: 180 },
  { id: 20, name: 'Veg Kurma', price: 100 },
  { id: 21, name: 'Roti', price: 10 },
  { id: 22, name: 'Garlic Naan', price: 50 },
  { id: 23, name: 'Aloo Paratha', price: 60 },
  { id: 24, name: 'Masala Dosa', price: 70 },
  { id: 25, name: 'Idli Vada', price: 50 },
  { id: 26, name: 'Veg Sandwich', price: 40 },
  { id: 27, name: 'French Fries', price: 60 },
  { id: 28, name: 'Spring Roll', price: 80 },
  { id: 29, name: 'Chana Masala', price: 90 },
  { id: 30, name: 'Pav Bhaji', price: 85 },
  { id: 31, name: 'Chicken Soup', price: 75 },
  { id: 32, name: 'Tomato Soup', price: 60 },
  { id: 33, name: 'Cold Coffee', price: 55 },
  { id: 34, name: 'Mango Shake', price: 65 },
  { id: 35, name: 'Soft Drinks', price: 30 }
];

export default function MenuPage() {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    setSelectedDishes((prev) =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleOptionChange = (option) => {
    setSelectedOption(prev => (prev === option ? null : option));
  };

  const handleNextClick = () => {
    if (!selectedOption) {
      alert('Please select either PARCEL or DINING');
      return;
    }

    if (selectedDishes.length === 0) {
      alert('Please select at least one dish before proceeding.');
      return;
    }

    sessionStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));

    if (selectedOption === 'parcel') {
      navigate('/parcel');
    } else if (selectedOption === 'dining') {
      navigate('/dining');
    }
  };

  return (
    <div
      className="menu-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        paddingBottom: '10px',
      }}
    >
      <h2
        className="menu-heading"
        style={{
          fontFamily: "'Cinzel', serif",
          marginTop: '5px',
          fontSize: '32px',
          color: 'orangered',
          textAlign: 'center',
          paddingTop: '20px',
        }}
      >
        AVAILABLE DISHES
      </h2>

      <div className="menu-scroll">
        {dishes.map((dish) => (
          <div key={dish.id} className="menu-item">
            <div className="menu-text">
              <strong>{dish.name}</strong> - ₹{dish.price}
            </div>
            <input
              type="checkbox"
              checked={selectedDishes.includes(dish.id)}
              onChange={() => handleCheckboxChange(dish.id)}
            />
          </div>
        ))}
      </div>

      <div className="option-row">
        <div className="option-group">
          <div className="option-label">
            PARCEL
            <input
              type="checkbox"
              className="option-checkbox"
              checked={selectedOption === 'parcel'}
              onChange={() => handleOptionChange('parcel')}
            />
          </div>
          <span className="option-slash">/</span>
          <div className="option-label">
            DINING
            <input
              type="checkbox"
              className="option-checkbox"
              checked={selectedOption === 'dining'}
              onChange={() => handleOptionChange('dining')}
            />
          </div>
        </div>

        <button className="next-button" onClick={handleNextClick}>
          Next →
        </button>
      </div>
    </div>
  );
}
