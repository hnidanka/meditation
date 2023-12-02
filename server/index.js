import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/auth.js'
import testRoute from './routes/test.js'
import meditationRoute from './routes/meditation.js'
import stepsRoute from './routes/steps.js'
import moodRoute from './routes/mood.js'
import programRoute from './routes/program.js'
import chatRoute from './routes/chat.js'
import messageRoute from './routes/message.js'
import RewardRoute from './routes/reward.js'
import dotenv from 'dotenv';
import http from 'http';
import { Server } from "socket.io"
import { handleSocketEvents } from './events/socket.js';
dotenv.config();
const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});

handleSocketEvents();
// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use('/images', express.static('data/images'));
//Routes
app.use('/api/chat', chatRoute)
app.use('/api/message', messageRoute)
app.use('/api/auth', authRoute)
app.use('/api/test', testRoute)
app.use('/api/mood', moodRoute)
app.use('/api/programs', programRoute)
app.use('/api/reward', RewardRoute)
app.use('/api', meditationRoute)
app.use('/api', stepsRoute)
async function start()
{
    try
    {
        await mongoose.connect('mongodb+srv://test:test123@cluster0.chbpm7k.mongodb.net/meditationDB')
        server.listen(3002, () => console.log(`Server działa na porcie: 3002`))

    } catch (error)
    {
        console.log(error)
    }
}
start();
