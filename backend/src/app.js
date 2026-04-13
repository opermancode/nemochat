const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const { canChat } = require('./services/chatService');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/health', (req, res) => res.status(200).send("OK"));

io.on('connection', (socket) => {
    socket.on('join_room', async ({ room_id, user_id, target_id }) => {
        if (await canChat(user_id, target_id)) {
            socket.join(room_id);
            console.log(`Room Joined: ${room_id}`);
        }
    });

    socket.on('send_message', async (data) => {
        if (await canChat(data.sender_id, data.target_id)) {
            io.to(data.room_id).emit('receive_message', data);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server live on ${PORT}`));