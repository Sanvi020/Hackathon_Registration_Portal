import { useState } from 'react';

function Contact() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = encodeURIComponent('Code-A-Nova Website Enquiry');
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
        );

        window.location.href = `mailto:codenovaproject@example.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="min-h-screen px-5 py-20">

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                <div>
                    <span className="bg-[#FFD23F] border-2 border-black px-3 py-1 font-bold">
                        LET'S TALK ✦
                    </span>

                    <h1 className="display-font text-5xl md:text-7xl mt-8">
                        GOT A QUESTION?
                    </h1>

                    <p className="text-xl text-gray-600 mt-6">
                        Ideas, questions or just want to say hello?
                        We'd love to hear from you.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white brutal-card p-8 space-y-5">

                    <div>
                        <label className="brutal-label">Your Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="brutal-input"
                        />
                    </div>

                    <div>
                        <label className="brutal-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="brutal-input"
                        />
                    </div>

                    <div>
                        <label className="brutal-label">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            required
                            className="brutal-input resize-none"
                        />
                    </div>

                    <button className="brutal-button bg-[#FF5C39] w-full py-3 font-bold">
                        SEND MESSAGE ↗
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Contact;