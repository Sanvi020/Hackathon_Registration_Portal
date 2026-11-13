const User = require('../models/user.models');

const getMeController = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password -otp -otpExpiry');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User fetched successfully',
            user
        });

    } catch (error) {
        console.error('Get Me Error:', error.message);

        return res.status(500).json({
            message: 'Unable to fetch user'
        });
    }
};

module.exports = { getMeController };