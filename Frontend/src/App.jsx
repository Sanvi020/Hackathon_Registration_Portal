import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Signup from './pages/Signup';
import VerifyOTP from './pages/VerifyOTP';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HackathonRegistration from './pages/HackathonRegistration';
import Contact from './pages/Contact';

import ProtectedRoute from './components/ProtectedRoutes';

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/register-hackathon"
                        element={<HackathonRegistration />}
                    />
                </Route>
            </Routes>

            <Footer />
        </>
    );
}

export default App;