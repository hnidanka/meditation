import styles from './styles.module.css'
import Navbar from '../../components/Navbar/navbar'
import Conversetion from '../../components/Conversations/Conversetions'
import Message from '../../components/Message/Message'
import ChatOnline from '../../components/ChatOnline/ChatOnline'
import { useDispatch, useSelector} from 'react-redux'
import { useEffect , useState } from 'react'
import axios from '../../utils/axios';

export default function Messenger(){
  
  const user = useSelector(state => state.auth.user)
  const userId = useSelector(state => state.auth.user?._id)
  
  const [conversations , setConversations] = useState([])
  const [currentChat , setCurrentChat] = useState(null)
  const [messages , setMessages] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  

  useEffect(() =>{
     const getConversations = async ()=>{
      try{
      const res = await axios.get(`/conversations/${userId}`)
      setConversations(res.data)
      console.log(res)
    }catch(err){
      console.log(err)
    }

     }
    getConversations();
  }, [userId])
  
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

    return(
        <>
        <Navbar />
        <div className={styles.messenger}>
               <div className={styles.chatMenu}>
                   <div className={styles.chatMenuWrapper}>
                   <input placeholder="Search for friends" className={styles.chatMenuInput} />
                   {conversations.map(c=>(
                    <div onClick={()=>setCurrentChat(c)}>
                        <Conversetion  conversation={c} currentUser={user}/>
                    </div>
                   ))}

                   
                   </div>
               </div>
               <div className={styles.chatBox}>
                 <div className={styles.chatBoxWrapper}>

                {
                  currentChat ?
                  <>
                    <div className={styles.chatBoxTop}>
                     
                       
                       <Message />
                       
                     </div>
                     <div className={styles.chatBoxBottom}>
                     <textarea
                    className={styles.chatMessageInput}
                    placeholder="write something..."
                  ></textarea>
                      <button className={styles.chatSubmitButton} >
                    Send
                  </button>
                     </div> </> : <span className={styles.noConversationText}>Open a conversation to start a chat.</span>}
                  </div>
               </div>
               <div className={styles.chatOnline}>
               <div className={styles.chatOnlineWrapper}>
                       <ChatOnline />
                       <ChatOnline />
                       <ChatOnline />
                  </div>
               </div>
        </div></>
    )
}