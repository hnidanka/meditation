import styles from './styles.module.css'
import {useState , useEffect} from 'react'
import axios from '../../utils/axios';

export default function Conversetion({conversation , currentUser}){
    
    const [user,setUser] = useState(null)

    useEffect(()=>{
        //const friendId = conversation.members.find(m=> m !== currentUser._id )

        const getUser = async ()=>{
            try{
            const res = await axios(`/users`)
            setUser(res.data)
            console.log(res)
        }catch(err){
            console.log(err)
        }

        };
        getUser()
    },[currentUser , conversation])
    
    return(
        <div className={styles.conversation}>
            <img
              className="chatOnlineImg"
              src='https://www.jtrholidays.com/static/img/bucket/Tours/UAE/Dubai/Theme-Park/IMG-World-of-Adventure/IMG-World-of-Adventure-03.jpg'
              alt=""
            />
             <span className={styles.conversationName}>User:{user?.username}</span>
        </div>
    )
}