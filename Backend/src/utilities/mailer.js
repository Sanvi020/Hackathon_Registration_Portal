const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

transporter.verify((error, success) => {
    if (error) {
        console.log('EMAIL CONFIG ERROR:', error);
    } else {
        console.log('Email server is ready!');
    }
});

const sendOTPEmail = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `"Code-a-Nova" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Code-a-Nova Verification OTP',
            html: `
                <h2>Welcome to Code-a-Nova!</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>Valid for 10 minutes.</p>
            `
        });

        console.log('EMAIL SENT:', info.messageId);
        console.log('RECIPIENT:', info.accepted);

    } catch (error) {
        console.error('EMAIL SENDING FAILED:', error);
        throw error;
    }
};

const sendRegistrationEmail = async (email, fullName, projectName) => {
    await transporter.sendMail({
        from: `"Code-a-Nova" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Hackathon Registration Confirmed!',
        html: `
            <div style="font-family: Arial, sans-serif;">
                <h2>Registration Successful!</h2>
                <p>Hello ${fullName},</p>
                <p>Your registration for Code-a-Nova has been confirmed.</p>
                <p><strong>Project:</strong> ${projectName}</p>
                <p>We're excited to have you participate!</p>
                <p>Team Code-a-Nova</p>
            </div>
        `
    });
};

module.exports = { sendOTPEmail,sendRegistrationEmail };