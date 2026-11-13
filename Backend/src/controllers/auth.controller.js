const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../utilities/otp');
const {sendOTPEmail} = require('../utilities/mailer')

const signupController = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await User.create({
            fullName,
            email: normalizedEmail,
            password: hashedPassword,
            otp: hashedOTP,
            otpExpiry
        });

        await sendOTPEmail(email, otp);

        return res.status(201).json({
            message: "Signup successful. Verify your email using the OTP."
        });

    } catch (error) {
        console.error("Signup Error:", error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your account before logging in"
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error.message);

        return res.status(500).json({
            message: "Login failed"
        });
    }
};


module.exports = {
    signupController,
    loginController
}; 