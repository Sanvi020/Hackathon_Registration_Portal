import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../Context/AuthContext';

function HackathonRegistration() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mobile: '',
        college: '',
        course: '',
        branch: '',
        year: '',
        domain: '',
        projectName: '',
        pptUrl: '',
        prototypeUrl: '',
        demoUrl: '',
        teamSize: '1',
        teamMembers: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const inputClass = "brutal-input";
    const labelClass = "brutal-label";

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'teamSize') {
            const size = Number(value);

            setFormData(prev => ({
                ...prev,
                teamSize: value,
                teamMembers: Array.from(
                    { length: size - 1 },
                    (_, i) => prev.teamMembers[i] || { name: '', email: '' }
                )
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...formData.teamMembers];

        updated[index] = {
            ...updated[index],
            [name]: value
        };

        setFormData(prev => ({
            ...prev,
            teamMembers: updated
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            setSuccess('');

            const token = localStorage.getItem('token');

            const response = await API.post(
                'https://hackathon-registration-portal-hc79.onrender.com/api/hackathon/register',
                {
                    ...formData,
                    teamSize: Number(formData.teamSize)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSuccess(response.data.message || 'Registration successful!');

            setTimeout(() => navigate('/dashboard'), 1500);

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        ['college', 'College Name', 'text'],
        ['course', 'Course', 'text'],
        ['branch', 'Branch', 'text'],
        ['year', 'Current Year', 'text'],
        ['domain', 'Domain', 'text'],
        ['projectName', 'Project Name', 'text'],
        ['pptUrl', 'PPT URL', 'url'],
        ['prototypeUrl', 'Prototype URL', 'url'],
        ['demoUrl', 'Demo URL (Optional)', 'url']
    ];

    return (
        <div className="min-h-screen px-5 py-16">

            <div className="max-w-3xl mx-auto">

                <div className="mb-10">
                    <span className="bg-[#FFD23F] border-2 border-black px-3 py-1 font-bold">
                        MAKE IT OFFICIAL ✦
                    </span>

                    <h1 className="display-font text-4xl md:text-6xl mt-6">
                        REGISTER YOUR TEAM.
                    </h1>

                    <p className="text-gray-600 mt-3">
                        Fill in the details and bring your idea to life.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white brutal-card p-6 md:p-10 space-y-6">

                    <h2 className="display-font text-2xl text-[#FF5C39]">
                        01 / PARTICIPANT DETAILS
                    </h2>

                    <div>
                        <label className={labelClass}>Full Name</label>
                        <input value={user?.fullName || ''} readOnly className={inputClass} />
                    </div>

                    <div>
                        <label className={labelClass}>Email</label>
                        <input value={user?.email || ''} readOnly className={inputClass} />
                    </div>

                    <div>
                        <label className={labelClass}>Mobile Number</label>
                        <input
                            name="mobile"
                            type="tel"
                            value={formData.mobile}
                            onChange={handleChange}
                            pattern="[6-9][0-9]{9}"
                            maxLength="10"
                            required
                            placeholder="10-digit mobile number"
                            className={inputClass}
                        />
                    </div>

                    <h2 className="display-font text-2xl text-[#FF5C39] pt-5">
                        02 / ACADEMIC DETAILS
                    </h2>

                    {fields.slice(0, 4).map(([name, label, type]) => (
                        <div key={name}>
                            <label className={labelClass}>{label}</label>
                            <input
                                name={name}
                                type={type}
                                value={formData[name]}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>
                    ))}

                    <h2 className="display-font text-2xl text-[#FF5C39] pt-5">
                        03 / PROJECT DETAILS
                    </h2>

                    {fields.slice(4).map(([name, label, type]) => (
                        <div key={name}>
                            <label className={labelClass}>{label}</label>
                            <input
                                name={name}
                                type={type}
                                value={formData[name]}
                                onChange={handleChange}
                                minLength={name === 'projectName' ? 5 : undefined}
                                required={name !== 'demoUrl'}
                                placeholder="Enter details"
                                className={inputClass}
                            />
                        </div>
                    ))}

                    <h2 className="display-font text-2xl text-[#FF5C39] pt-5">
                        04 / TEAM DETAILS
                    </h2>

                    <div>
                        <label className={labelClass}>Team Size</label>
                        <select
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            {[1, 2, 3, 4, 5].map(size => (
                                <option key={size} value={size}>
                                    {size} {size === 1 ? 'Member' : 'Members'}
                                </option>
                            ))}
                        </select>

                        <p className="text-sm text-gray-500 mt-2">
                            Team size includes you as the team leader.
                        </p>
                    </div>

                    {formData.teamMembers.map((member, index) => (
                        <div key={index} className="border-2 border-black p-5 space-y-4 bg-[#FFF4E0]">

                            <h3 className="font-bold text-xl">
                                TEAM MEMBER {index + 2}
                            </h3>

                            <div>
                                <label className={labelClass}>Member Name</label>
                                <input
                                    name="name"
                                    value={member.name}
                                    onChange={e => handleMemberChange(index, e)}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Member Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={member.email}
                                    onChange={e => handleMemberChange(index, e)}
                                    required
                                    className={inputClass}
                                />
                            </div>

                        </div>
                    ))}

                    {error && <p className="font-bold text-[#FF5C39]">{error}</p>}
                    {success && <p className="font-bold text-green-700">{success}</p>}

                    <button
                        disabled={loading}
                        className="brutal-button bg-[#3DDC97] w-full py-4 font-bold text-lg"
                    >
                        {loading ? 'Submitting...' : 'SUBMIT REGISTRATION →'}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default HackathonRegistration;