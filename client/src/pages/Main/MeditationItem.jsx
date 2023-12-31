import React from 'react'
import styles from './styles.module.css'; 
import { Link } from 'react-router-dom'
import woman_main from './images/woman_main.png'
export const MeditationItem = ({ meditation }) => {
   
    
    return (
      
        <Link to={`/meditation/${meditation._id}`}>
           <div className={styles.block}>
                
                {/* <img src={woman_main} alt="Woman Main"></img> */}
                <img src={`http://localhost:3002/images/${meditation?.img}`} alt={`Image for option `} />
                {
                  
                  meditation.title
                }
                </div>
        </Link>
           
       
    )
}