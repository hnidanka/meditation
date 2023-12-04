import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Search from './images/Search.png';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setMessages, fetchUsers, fetchChats, addChat } from '../../redux/features/chatSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { socket } from '../../socketIo';

function Chat()
{
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const users = useSelector((state) => state.chat.users);
  const chats = useSelector((state) => state.chat.chats);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const handleNewChat = (chat) => {
      dispatch(addChat(chat));
    };
  
    socket.on("new-chat", handleNewChat);
  
    return () => {
      socket.off("new-chat", handleNewChat);
    };
  });

  useEffect(() =>
  {
    console.log(chats)
  }, [chats]);

  const handleSearch = (input) =>
  {
    setSearchInput(input);
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(input.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  const startChatWithUser = async (targetUser) =>
  {
    setSearchInput("");
    const body = {
      "userA": user._id,
      "userB": targetUser._id
    }
    try
    {
      const res = await axios.post("http://localhost:3002/api/chat/start-chat", body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error)
    {
      console.log(error.message);
    }
  };
  const removeChat = (userToRemove) =>
  {

  };
  const navigateToChatPage = (chatId) =>
  {
    navigate(`/messenger/${chatId}`);
  };
  useEffect(() =>
  {
    dispatch(fetchUsers());
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className={styles.bodyBlock}>
      <div className={styles.chat}>
        <p>Czat</p>
      </div>
      <div className={styles.searchApp}>
        <div className={styles.searchContainer}>
          <img src={Search} alt="Search" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Wyszukaj osób"
            className={styles.searchInput}
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {searchInput && (
          <div className={styles.searchResults} style={{ backgroundColor: searchResults.length > 0 ? 'white' : 'transparent' }}>
            {searchResults.map((user) => (
              <div
                key={user._id}
                className={styles.result}
                onClick={() => startChatWithUser(user)}
              >
                {user.username}
              </div>
            ))}
          </div>
        )}
        {chats && (
          <div className={styles.chatsContainer}>
            {chats.map(chat => (
              chat.users.length === 2 && (
                <div className={styles.signleChatContainer} onClick={() => navigateToChatPage(chat._id)} key={chat.id}>
                  {chat.users.map(usr => (
                    usr._id !== user._id && (
                      <div key={usr._id}>
                        {usr.username}
                      </div>
                    )
                  ))}
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;