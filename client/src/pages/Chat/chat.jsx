import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Search from './images/Search.png';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setMessages, fetchUsers } from '../../redux/features/chatSlice';

function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const users = useSelector((state) => state.chat.users);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(() => {
  const storedUsers = localStorage.getItem('selectedUsers');
  return storedUsers ? JSON.parse(storedUsers) : [];
});

useEffect(() => {
  // Save selectedUsers to local storage whenever it changes
  localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
}, [selectedUsers]);

  const handleSearch = (input) => {
    setSearchInput(input);
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(input.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  const startChatWithUser = (user) => {
    setSelectedUsers([...selectedUsers, user]); // Add user to selected users
    // You may want to dispatch an action to fetch messages between logged-in user and selected user here
  };
  const removeChat = (userToRemove) => {
    const updatedUsers = selectedUsers.filter(user => user._id !== userToRemove._id);
    setSelectedUsers(updatedUsers);
  }; 

  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch the fetchUsers action on component mount
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
                onClick={() => startChatWithUser(user)} // Handle click to start chat with the user
              >
                {user.username}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedUsers.map((selectedUser) => (
        <div key={selectedUser._id} className={styles.chatWindow} style={{ backgroundColor: 'purple' }}>
          <p>{selectedUser.username}</p>
          <button onClick={() => removeChat(selectedUser)}>Close Chat</button>
          {/* Render chat messages or input field here */}
        </div>
      ))}
      <div className={styles.noneSMS}>Brak powiadomień</div>
    </div>
  );
}

export default Chat;