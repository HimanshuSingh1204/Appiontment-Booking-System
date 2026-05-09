import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookingHistory from './pages/BookingHistory';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/BookingPage';
import AdminPanel from './pages/AdminPanel';
import PaymentPage from './pages/PaymentPage';
import ReviewPage from './pages/ReviewPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/history" element={<BookingHistory />} />
                <Route path="/payment" element={<PaymentPage />} />
                {/* ✅ Add this line */}
                <Route path="/reviews" element={<ReviewPage />} />
            </Routes>
        </Router>
    );
}

export default App;