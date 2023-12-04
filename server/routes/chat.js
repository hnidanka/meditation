// routes/chat.js


import { Router } from 'express'
import { startChat, fetchUserChats, fetchUsers } from '../controllers/chat.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

// Routes for chat operations
router.get("/users", checkAuth, fetchUsers)
router.post('/start-chat', checkAuth, startChat);
router.get("/", checkAuth, fetchUserChats);

export default router;
