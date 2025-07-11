import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiningDetails from './pages/DiningDetails';
import TableSelection from './pages/TableSelection';
import ParcelDetails from './pages/ParcelDetails';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import ConfirmationPage from './pages/ConfirmationPage'; // ✅ Add this line
import ParcelConfirmation from './pages/ParcelConfirmation';
import PaymentPage from './pages/PaymentPage';
import OrderSuccess from './pages/OrderSuccess';
import AdminOrders from './components/AdminOrders';

function App() {
  return (
    <Router  basename="/food-ordering-app">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/parcel" element={<ParcelDetails />} />
        <Route path="/dining" element={<DiningDetails />} />
        <Route path="/tableselection" element={<TableSelection />} />
        <Route path="/confirmation" element={<ConfirmationPage />} /> 
        <Route path="/parcelconfirmation" element={<ParcelConfirmation />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
