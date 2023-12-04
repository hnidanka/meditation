//controllers chat.js
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { io } from "../index.js"
import { connectedUsers } from "../events/socket.js";
export const startChat = async (req, res) =>
{
  const { userA, userB } = req.body;

  try
  {
    let chatId = await findExistingChat(userA, userB);

    if (!chatId)
    {
      const chat = new Chat({ users: [userA, userB] });
      const newChat = await chat.save();
      if (newChat)
      {
        await newChat.populate({
          path: 'users',
          select: 'username'
        });
        io.to(connectedUsers[userA]).emit('new-chat', newChat);
        io.to(connectedUsers[userB]).emit('new-chat', newChat);
      }
    }

    res.status(200).json(chatId);
  } catch (error)
  {
    console.log(error.message)
    res.status(500).json({ error: 'Failed to start chat' });
  }
};
export const fetchUserChats = async (req, res) =>
{
  try
  {
    const userId = req.userId;
    const userChats = await Chat.find({ users: userId }).populate({
      path: 'users',
      select: 'username'
    });

    res.status(200).json(userChats);
  } catch (error)
  {
    res.status(500).json({ error: 'Failed to fetch user chats' });
  }
};
export const fetchUsers = async (req, res) =>
{
  try
  {
    const userId = req.userId;

    const users = await User.find({ _id: { $ne: userId } }, 'username');

    const usersArray = users.map((user) => ({
      _id: user._id,
      username: user.username,
    }));

    res.status(200).json(usersArray);
  } catch (error)
  {
    console.log(error.message)
    res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
  }
};

const findExistingChat = async (userA, userB) =>
{
  const chat = await Chat.findOne({ users: { $all: [userA, userB] } });
  return chat ? chat._id : null;
};