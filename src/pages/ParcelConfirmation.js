import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';
import '../App.css';

export default function ParcelConfirmation() {
  const navigate = useNavigate();

  const name = sessionStorage.getItem('parcelName') || '';
  const mobile = sessionStorage.getItem('parcelMobile') || '';
  const selectedDishIds = JSON.parse(sessionStorage.getItem('selectedDishes')) || [];

  const allDishes = [
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
    { id: 35, name: 'Soft Drinks', price: 30 },
  ];

  const selectedDishes = allDishes.filter((dish) => selectedDishIds.includes(dish.id));
  const total = selectedDishes.reduce((sum, dish) => sum + dish.price, 0);

  // Save for payment
  sessionStorage.setItem('parcelTotal', total);
  sessionStorage.setItem('orderType', 'Parcel');

  useEffect(() => {
    const orderDetails = {
      name,
      mobile,
      orderType: 'Parcel',
      table: 'Not applicable',
      dishes: selectedDishes,
      total,
    };

    const timer = setTimeout(() => {
      fetch('https://food-ordering-backend-8yg3.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to save order');
          return res.json();
        })
        .then((data) => {
          console.log('✅ Order saved:', data);
        })
        .catch((err) => {
          console.error('❌ Error saving order:', err.message);
          alert('❌ Order could not be saved. Please try again.');
        });
    }, 2000);

    return () => clearTimeout(timer);
  }, [name, mobile, selectedDishes, total]);

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
      <h2 className="form-heading">PARCEL ORDER CONFIRMATION</h2>

      <div className="input-box">
        <div
          className="form-container"
          style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '20px',
            borderRadius: '10px',
            color: '#fff',
          }}
        >
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Mobile:</strong> {mobile}</p>
          <p><strong>Order Type:</strong> Parcel</p>

          <p><strong>Selected Dishes:</strong></p>
          {selectedDishes.length > 0 ? (
            <ul>
              {selectedDishes.map((dish) => (
                <li key={dish.id}>{dish.name} - ₹{dish.price}</li>
              ))}
            </ul>
          ) : (
            <p>No dishes selected</p>
          )}

          <p><strong>Total Amount:</strong> ₹{total}</p>

          <button
            onClick={() => navigate('/payment')}
            className="submit-button"
            style={{ marginTop: '20px' }}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
