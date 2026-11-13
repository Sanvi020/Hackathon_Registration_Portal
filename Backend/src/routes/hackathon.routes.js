const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');

const {
    registerHackathonController,getMyEntryController
} = require('../controllers/hackathon.controller');

const router = express.Router();

router.post('/register', authMiddleware, registerHackathonController);
router.get('/my-entry', authMiddleware, getMyEntryController);

module.exports = router;