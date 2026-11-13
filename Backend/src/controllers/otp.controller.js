// This filer contains the code for verification of otp and email address

const bcrypt = require("bcryptjs");
const User = require("../models/user.models");
const {generateOTP} = require('../utilities/otp')
const {sendOTPEmail} = require('../utilities/mailer')

const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Account is already verified" });
    }

    if (!user.otp || !user.otpExpiry || user.otpExpiry <= new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const isOTPValid = await bcrypt.compare(String(otp), user.otp);
    if (!isOTPValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
};

const resendOTPController = async (req, res) => {
    try {
        const email = req.body?.email?.trim().toLowerCase();

        if (!email) {
            return res.status(400).json({
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: 'Account is already verified'
            });
        }

        const otp = generateOTP();

        const hashedOTP = await bcrypt.hash(otp, 10);


        user.otp = hashedOTP;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        await sendOTPEmail(email, otp);

        return res.status(200).json({
            message: 'A new OTP has been generated'
        });

    } catch (error) {
        console.error('Error resending OTP:', error.message);

        return res.status(500).json({
            message: 'Unable to resend OTP'
        });
    }
};

module.exports = { verifyOTPController,resendOTPController };
