import styles from './styles.module.css'
import Navbar from '../../components/Navbar/navbar'
import Conversetion from '../../components/Conversations/Conversetions'
import Message from '../../components/Message/Message'
import ChatOnline from '../../components/ChatOnline/ChatOnline'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { socket } from '../../socketIo'
export default function Messenger()
{
  const { chatId } = useParams('chatId');
  const user = useSelector(state => state.auth.user)
  const userId = useSelector(state => state.auth.user?._id)
  const [messageText, setMessageText] = useState("");
  const [allMessages, setAllMesages] = useState([]);
  const [conversations, setConversations] = useState([])

  useEffect(() =>
  {
    const handleNewMessage = (message) =>
    {
      console.log('new message');
      setAllMesages([...allMessages, message])
    };
    socket.on("new-message", handleNewMessage)
    return () =>
    {
      socket.off("new-message", handleNewMessage);
    };
  })
  useEffect(() =>
  {
    if (!chatId || chatId === "")
    {
      return;
    }
    socket.emit("join-chat", chatId)
    const fetchMessages = async () =>
    {
      try
      {
        const res = await axios.get(`/message/${chatId}`)
        setAllMesages(res.data)
        console.log(res.data)
      } catch (err)
      {
        console.log(err)
      }
    }
    fetchMessages();
  }, [chatId])

  const sendMessage = async (event) =>
  {
    if (!messageText || messageText === "")
    {
      return;
    }
    socket.emit("send-message", { chatId: chatId, message: messageText });
    setMessageText("");
  }
  return (
    <>
      <Navbar />
      <div className={styles.messenger}>
        <div className={styles.chatBox}>
          <div className={styles.chatBoxWrapper}>
            <div className={styles.chatBoxTop}>
              {allMessages.length !== 0 && (
                allMessages.map((message) => (
                  <Message image={message.sender.image} userName={message.sender.username } messageText={message.text} createdAt={message.createdAt} own={userId !== message.sender._id} />
                ))
              )}
            </div>
            <div className={styles.chatBoxBottom}>
              <textarea
                className={styles.chatMessageInput}
                placeholder="write something..."
                value={messageText}
                onChange={(event) => { setMessageText(event.target.value) }}
              ></textarea>
              <button onClick={sendMessage} className={styles.chatSubmitButton} >
                Send
              </button>
            </div>
          </div>
        </div>
      </div></>
  )
}