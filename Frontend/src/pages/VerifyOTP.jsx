import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api';

function VerifyOTP() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            await API.post(
                'http://localhost:3000/api/auth/verify-otp',
                { email, otp }
            );

            navigate('/login');

        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            setError('');
            setMessage('');

            const response = await API.post(
                'http://localhost:3000/api/auth/resend-otp',
                { email }
            );

            setMessage(response.data.message || 'OTP sent successfully!');

        } catch (err) {
            setError(err.response?.data?.message || 'Unable to resend OTP.');
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="brutal-card bg-white p-8 text-center">
                    <h2 className="display-font text-2xl">EMAIL NOT FOUND!</h2>
                    <p className="my-4">Please sign up again to continue.</p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="brutal-button bg-[#FF5C39] px-5 py-2 font-bold"
                    >
                        Back to Signup
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-5 py-12">

            <div className="max-w-lg w-full bg-white brutal-card p-8 md:p-10 text-center">

                <div className="text-5xl mb-5">✉️</div>

                <div className="inline-block bg-[#3DDC97] border-2 border-black px-3 py-1 font-bold rotate-[-3deg] mb-6">
                    ONE LAST STEP
                </div>

                <h1 className="display-font text-4xl mb-4">
                    VERIFY IT.
                </h1>

                <p className="text-gray-600 mb-2">
                    We've sent a 6-digit verification code to:
                </p>

                <p className="font-bold break-all mb-8">{email}</p>

                <form onSubmit={handleVerify}>

                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="000000"
                        required
                        className="brutal-input text-center text-3xl tracking-[12px] font-bold py-5 mb-6"
                    />

                    {error && (
                        <p className="text-[#FF5C39] font-bold mb-4">{error}</p>
                    )}

                    {message && (
                        <p className="text-green-700 font-bold mb-4">{message}</p>
                    )}

                    <button
                        disabled={loading || otp.length !== 6}
                        className="brutal-button bg-[#FFD23F] w-full py-3 font-bold text-lg disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Verify Account →'}
                    </button>

                </form>

                <div className="mt-7">
                    <p className="text-gray-600 mb-2">Didn't receive the code?</p>

                    <button
                        onClick={handleResend}
                        className="font-bold underline hover:text-[#FF5C39]"
                    >
                        Resend OTP
                    </button>
                </div>

            </div>
        </div>
    );
}

export default VerifyOTP;