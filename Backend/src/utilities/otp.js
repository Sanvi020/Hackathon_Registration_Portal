// This is for creating otp for user verification

const crypto = require("crypto");


const generateOTP = () => {
    const otp = crypto.randomInt(100000, 1000000); // generates a random integer between 100000 and 999999
    return otp.toString();
};


module.exports = {generateOTP};