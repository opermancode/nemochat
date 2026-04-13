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
            if (senderId === receiverId) {
                throw new Error('You cannot send a request to yourself');
            }

            const [existing] = await db.execute(
                `SELECT id
                 FROM chat_requests
                 WHERE ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?))
                 AND status IN (0, 1)
                 LIMIT 1`,
                [senderId, receiverId, receiverId, senderId]
            );

            if (existing.length > 0) {
                throw new Error('An active request already exists for these users');
            }

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
