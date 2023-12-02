import { Router } from 'express'
import Message from '../models/Message.js'
import { fetchMessages, sendMessage } from '../controllers/message.js';
import { checkAuth } from '../utils/checkAuth.js';
const router = new Router()

router.post("/send-message/:chatId", checkAuth, sendMessage);

router.get("/:chatId", checkAuth, fetchMessages);



export default router