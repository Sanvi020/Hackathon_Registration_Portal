import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../Context/AuthContext';

function Dashboard() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [registration, setRegistration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchRegistration = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await API.get(
                    'http://https://hackathon-registration-portal-hc79.onrender.com/api/hackathon/my-entry',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setRegistration(
                    response.data.registration || response.data
                );

            } catch (err) {
                if (err.response?.status === 404) {
                    setRegistration(null);
                } else {
                    setError('Unable to fetch registration details.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRegistration();

    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Loading...</div>;
    }

    return (
        <div className="min-h-screen px-6 md:px-12 py-12">

            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">

                    <div>
                        <p className="font-bold text-[#FF5C39]">YOUR SPACE / 01</p>

                        <h1 className="display-font text-4xl md:text-6xl mt-3">
                            HEY, {user?.fullName?.split(' ')[0]?.toUpperCase()}!
                        </h1>

                        <p className="text-gray-600 mt-3 text-lg">
                            Ready to build something extraordinary?
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="brutal-button bg-white px-6 py-3 font-bold h-fit"
                    >
                        Logout ↗
                    </button>

                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="brutal-card bg-[#FFD23F] p-8">
                        <p className="font-bold">YOUR PROFILE</p>

                        <h2 className="display-font text-3xl mt-8">
                            {user?.fullName}
                        </h2>

                        <p className="mt-3 break-all">{user?.email}</p>

                        <div className="mt-8 inline-block bg-white border-2 border-black px-4 py-2 font-bold">
                            VERIFIED PARTICIPANT ✓
                        </div>
                    </div>

                    <div className="brutal-card bg-white p-8">

                        <p className="font-bold text-[#FF5C39]">HACKATHON STATUS</p>

                        {error ? (
                            <p className="mt-8 font-bold text-[#FF5C39]">{error}</p>
                        ) : registration ? (

                            <>
                                <div className="bg-[#3DDC97] border-2 border-black p-4 mt-6 font-bold">
                                    REGISTRATION CONFIRMED ✓
                                </div>

                                <h2 className="display-font text-3xl mt-6">
                                    {registration.projectName}
                                </h2>

                                <p className="mt-3">Domain: {registration.domain}</p>
                                <p>College: {registration.college}</p>
                                <p>Team size: {registration.teamSize}</p>
                            </>

                        ) : (

                            <>
                                <h2 className="display-font text-3xl mt-8">
                                    YOUR IDEA STARTS HERE.
                                </h2>

                                <p className="mt-4 text-gray-600">
                                    You haven't registered yet. Gather your team
                                    and complete your registration!
                                </p>

                                <button
                                    onClick={() => navigate('/register-hackathon')}
                                    className="brutal-button bg-[#FF5C39] px-6 py-3 font-bold mt-8"
                                >
                                    Register Now ↗
                                </button>
                            </>

                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Dashboard;