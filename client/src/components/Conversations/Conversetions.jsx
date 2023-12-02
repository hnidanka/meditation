import styles from './styles.module.css'
import {useState , useEffect} from 'react'
import axios from '../../utils/axios';

export default function Conversetion({conversation , currentUser}){
    const [user,setUser] = useState(null)

    useEffect(()=>{
        const friendId = conversation.members.find(m=> m !== currentUser._id )

        const getUser = async ()=>{
            try{
            const res = await axios(`/users?userId=${friendId}`)
            setUser(res.data)
        }catch(err){
            console.log(err)
        }

        };
        getUser()
    },[currentUser , conversation])
    
    return(
        <div className={styles.conversation}>
             <span className={styles.conversationName}>{user && user.username}</span>
        </div>
    )
}