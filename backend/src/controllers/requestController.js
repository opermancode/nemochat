const User = require('../models/userModel');

exports.handleRequest = async (req, res) => {
    const { requestId, status } = req.body; // status 1 = accept, 2 = reject
    try {
        await User.updateRequestStatus(requestId, status);
        res.json({ message: `Request status updated to ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};