const db = require('./db');

const User = {
    // Find users for the "Global Discovery" feature
    searchUsers: async (searchTerm, excludeId) => {
        try {
            const [rows] = await db.execute(
                'SELECT id, username, bio FROM users WHERE username LIKE ? AND id != ?',
                [`%${searchTerm}%`, excludeId]
            );
            return rows;
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    },

    // Create a new chat request
    sendRequest: async (senderId, receiverId) => {
        try {
            const [result] = await db.execute(
                'INSERT INTO chat_requests (sender_id, receiver_id) VALUES (?, ?)',
                [senderId, receiverId]
            );
            return result;
        } catch (error) {
            console.error('Error sending chat request:', error);
            throw error;
        }
    },

    // Update request status (Accept/Reject) - Added receiverId for security
    updateRequestStatus: async (requestId, receiverId, status) => {
        try {
            await db.execute(
                'UPDATE chat_requests SET status = ? WHERE id = ? AND receiver_id = ?',
                [status, requestId, receiverId]
            );
        } catch (error) {
            console.error('Error updating request status:', error);
            throw error;
        }
    }
};

module.exports = User;