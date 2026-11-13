const express = require('express');
const { signupController,loginController } = require('../controllers/auth.controller');
const {verifyOTPController,resendOTPController} = require('../controllers/otp.controller');

const router = express.Router();

router.post('/signup', signupController);
router.post('/verify-otp',verifyOTPController);
router.post('/login',loginController);
router.post('/resend-otp',resendOTPController);

module.exports = router;