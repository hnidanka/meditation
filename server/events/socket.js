import User from "../models/User.js"
import Message from "../models/Message.js"
export const connectedUsers = {};
import { io } from "../index.js"
import jwt from 'jsonwebtoken'
export function handleSocketEvents()
{
    io.on('connection', (socket) =>
    {
        socket.auth = false;
        socket.on("authenticate", async (token) =>
        {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(id).exec();
            if (!user)
            {
                socket.emit("error", { message: "No user found" });
                return;
            }
            socket.auth = true;
            socket.user = user;
            connectedUsers[id] = socket.id;
            console.log("user authenticated")
        });
        socket.on('join-chat', (chatId) =>
        {
            if (!socket.auth)
            {
                console.error("User not authenticated");
            }
            socket.join(chatId);
        });

        socket.on('send-message', async ({ chatId, message }) =>
        {
            if (!socket.auth)
            {
                console.error("User not authenticated");
            }
            if (!message)
            {
                console.error("message is not provided");
                return;
            }
            if (message === '')
            {
                console.error("message can't be empty");
                return;
            }
            const userId = socket.user._id;
            console.log(chatId)
            const newMessage = new Message({ chatId: chatId, sender: userId, text: message });
            await newMessage.save();

            io.to(chatId).emit('new-message', newMessage);
        });
        socket.on('disconnect', () =>
        {
            console.log('User disconnected');
            for (const [userId, socketId] of Object.entries(connectedUsers))
            {
                if (socketId === socket.id)
                {
                    delete connectedUsers[userId];
                    break;
                }
            }
        });
    })
}