const db = require('../models/db');

exports.canChat = async (userOne, userTwo) => {
    const [rows] = await db.execute(
        'SELECT * FROM chat_requests WHERE ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)) AND status = 1',
        [userOne, userTwo, userTwo, userOne]
    );
    return rows.length > 0;
};