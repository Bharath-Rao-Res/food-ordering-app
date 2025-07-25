import React from 'react';
import backgroundImage from '../assets/background.jpg';
import '../App.css';

export default function OrderSuccess() {
  const orderType = sessionStorage.getItem('orderType') || 'Dining';
  const name =
    orderType === 'Dining'
      ? sessionStorage.getItem('diningName')
      : sessionStorage.getItem('parcelName');
  const mobile =
    orderType === 'Dining'
      ? sessionStorage.getItem('diningMobile')
      : sessionStorage.getItem('parcelMobile');
  const table =
    orderType === 'Dining'
      ? sessionStorage.getItem('selectedTable') || 'Not selected'
      : 'Not applicable';

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

  return (
    <div
      className="form-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '40px 0',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <div
        className="form-container"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '30px',
          borderRadius: '12px',
          width: '90vw',          // Responsive width for mobile
          maxWidth: '360px',
          display: 'inline-block',
        }}
      >
        {/* ✅ Emoji tick instead of image */}
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>

        <h2 style={{ color: 'lightgreen' }}>Your Order is Confirmed!</h2>

        <p><strong>Name:</strong> {name}</p>
        <p><strong>Mobile:</strong> {mobile}</p>
        <p><strong>Order Type:</strong> {orderType}</p>
        <p><strong>Table Number:</strong> {table}</p>

        <p><strong>Selected Dishes:</strong></p>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {selectedDishes.map((dish) => (
            <li key={dish.id}>{dish.name} - ₹{dish.price}</li>
          ))}
        </ul>

        <p style={{ marginTop: '10px' }}><strong>Total Amount:</strong> ₹{total}</p>
      </div>
    </div>
  );
}
