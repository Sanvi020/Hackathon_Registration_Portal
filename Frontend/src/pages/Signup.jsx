import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match!');
        }

        try {
            setLoading(true);
            setError('');

            await API.post(
                'http://https://hackathon-registration-portal-hc79.onrender.com/api/auth/signup',
                formData
            );

            navigate('/verify-otp', {
                state: { email: formData.email }
            });

        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-5 py-16">

            <div className="w-full max-w-lg bg-white brutal-card p-8 md:p-10">

                <div className="bg-[#FFD23F] inline-block border-2 border-black px-3 py-1 font-bold rotate-[-3deg] mb-6">
                    JOIN THE MOVEMENT ✦
                </div>

                <h1 className="display-font text-4xl md:text-5xl mb-3">
                    CREATE YOUR ACCOUNT.
                </h1>

                <p className="text-gray-600 mb-8">
                    Your next big idea starts here.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {[
                        { name: 'fullName', label: 'Full Name', type: 'text' },
                        { name: 'email', label: 'Email Address', type: 'email' },
                        { name: 'password', label: 'Password', type: 'password' },
                        { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
                    ].map(field => (

                        <div key={field.name}>
                            <label className="brutal-label">{field.label}</label>

                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                                className="brutal-input"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                        </div>

                    ))}

                    {error && (
                        <p className="text-[#FF5C39] font-bold">{error}</p>
                    )}

                    <button
                        disabled={loading}
                        className="brutal-button bg-[#FF5C39] w-full py-3 font-bold text-lg"
                    >
                        {loading ? 'Creating account...' : 'Create Account →'}
                    </button>

                </form>

                <p className="mt-6 text-center">
                    Already registered?{' '}
                    <Link to="/login" className="font-bold underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;