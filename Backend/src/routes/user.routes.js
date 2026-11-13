const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { getMeController } = require('../controllers/user.controller');

const router = express.Router();

router.get('/me', authMiddleware, getMeController);

module.exports = router;