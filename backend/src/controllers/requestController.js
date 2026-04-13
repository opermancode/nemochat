const User = require('../models/userModel');

exports.sendChatRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
        return res.status(400).json({ message: 'senderId and receiverId are required' });
    }

    try {
        await User.sendRequest(senderId, receiverId);
        res.status(201).json({ message: 'Chat request sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.handleRequest = async (req, res) => {
    const { requestId, receiverId, status } = req.body; // status 1 = accept, 2 = reject

    if (!requestId || !receiverId || !status) {
        return res.status(400).json({ message: 'requestId, receiverId and status are required' });
    }
    if (![1, 2].includes(Number(status))) {
        return res.status(400).json({ message: 'status must be 1 (accept) or 2 (reject)' });
    }

    try {
        await User.updateRequestStatus(requestId, receiverId, Number(status));
        res.json({ message: `Request status updated to ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
