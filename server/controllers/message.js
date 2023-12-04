import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
export const fetchMessages = async (req, res) =>
{
    try
    {
        const userId = req.userId;
        const { chatId } = req.params;
        const chatExists = await Chat.findOne({
            _id: chatId
            , users: {
                $elemMatch: { $eq: userId }
            }
        });

        if (chatExists)
        {
            const messages = await Message.find({ chatId }).sort({ createdAt: 1 }).populate("sender").exec();

            res.status(200).json(messages);
        } else
        {
            res.status(404).json({ error: 'Chat not found or user is not a participant' });
        }
    } catch (error)
    {
        res.status(500).json({ error: 'Server error' });
    }
};


export const sendMessage = async (req, res) =>
{
    try
    {
        const userId = socket.user._id;
        const { chatId } = req.params;
        const { message } = req.body;

        const chatExists = await Chat.findOne({ _id: chatId, users: userId });

        if (chatExists)
        {
            const newMessage = new Message({ chatId, sender: userId, text: message });
            await newMessage.save();

            res.status(200).json({ message: 'Message sent successfully' });
        } else
        {
            res.status(404).json({ error: 'Chat not found or user is not a participant' });
        }
    } catch (error)
    {
        res.status(500).json({ error: 'Server error' });
    }
};
