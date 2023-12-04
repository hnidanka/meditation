//Model Chat.js
import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model('Chat', chatSchema) 