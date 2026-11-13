import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../Context/AuthContext';

function Login() {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            const response = await API.post(
                'https://hackathon-registration-portal-hc79.onrender.com',
                formData
            );

            const token = response.data.token;

            localStorage.setItem('token', token);

            const profile = await API.get(
                'https://hackathon-registration-portal-hc79.onrender.com/api/user/me',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(profile.data.user);
            navigate('/dashboard');

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');

            localStorage.removeItem('token');
            setUser(null);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-5 py-16">

            <div className="max-w-lg w-full bg-white brutal-card p-8 md:p-10">

                <div className="inline-block bg-[#3DDC97] border-2 border-black px-3 py-1 font-bold rotate-[-3deg] mb-6">
                    GOOD TO SEE YOU!
                </div>

                <h1 className="display-font text-5xl mb-3">
                    WELCOME BACK.
                </h1>

                <p className="text-gray-600 mb-8">
                    Your next big idea is waiting.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="brutal-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="brutal-input"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="brutal-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="brutal-input"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <p className="text-[#FF5C39] font-bold">{error}</p>
                    )}

                    <button
                        disabled={loading}
                        className="brutal-button bg-[#FF5C39] w-full py-3 font-bold text-lg"
                    >
                        {loading ? 'Logging in...' : 'Login →'}
                    </button>

                </form>

                <p className="mt-6 text-center">
                    New here?{' '}
                    <Link to="/signup" className="font-bold underline">
                        Create an account
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;