import React, { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Poll the backend every 5 seconds
  useEffect(() => {
    const fetchOrders = () => {
      fetch('http://localhost:5000/api/orders')
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error('Error fetching orders:', err));
    };

    fetchOrders(); // initial load
    const interval = setInterval(fetchOrders, 5000); // every 5s

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Live Orders (Admin View)</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>Name:</strong> {order.name} <br />
              <strong>Mobile:</strong> {order.mobile} <br />
              <strong>Order Type:</strong> {order.orderType} <br />
              <strong>Table:</strong> {order.table || 'N/A'} <br />
              <strong>Total:</strong> ₹{order.total} <br />
              <strong>Dishes:</strong> {order.dishes.map(d => d.name).join(', ')}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
