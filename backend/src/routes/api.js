const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const requestController = require('../controllers/requestController');
const User = require('../models/userModel');

// Auth
router.post('/register', authController.register);
router.post('/login', authController.login);

// Discovery & Requests
router.get('/search', async (req, res) => {
    const { q, userId } = req.query;
    try {
        const users = await User.searchUsers(q, userId);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/request', requestController.sendChatRequest);
router.post('/handle-request', requestController.handleRequest);

module.exports = router;