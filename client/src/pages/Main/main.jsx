import React from 'react';
import styles from './styles.module.css'; 
import forward from './images/forward.png'
import main_img from './images/main_img.png'
import woman_main from './images/woman_main.png'
import add from './images/add.png'
import { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, getMe } from '../../redux/features/auth/authSlice';
import { getMeditations, getSavedMeditations, removeSavedMeditation} from '../../redux/features/meditationSlice';
import { MeditationItem } from './MeditationItem';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import close from './images/close.png';
import { to } from 'react-spring';
import { getMoodData } from '../../redux/features/moodSlice';

function Main() {
  
   const dispatch = useDispatch();
   const {meditations, savedMeditations} = useSelector((state) => state.meditation)
  const state = useSelector(state => state)
  const [selectedBlock, setSelectedBlock] = useState(null);
const isAuth = useSelector(checkIsAuth)
const token = useSelector(state => state.auth.token)
const user = useSelector(state => state.auth.user)
 const { userId } = useParams();
 const { moodData } = useSelector((state) => state.mood);
//console.log(token)
 // console.log(isAuth)
 const [savedMeditationIds, setSavedMeditationIds] = useState(
  JSON.parse(localStorage.getItem('savedMeditationIds')) || []
);
  console.log(state)
   useEffect(() => {
    
       dispatch(getMeditations())
       
    }, [dispatch])

    // useEffect(() => {
    //   if (userId) {
    //     dispatch(getSavedMeditations(userId));
    //   }
    // }, [dispatch, userId]);
    // console.log(savedMeditations);

   //console.log(state);

   
   function onChecked(selectedBlock){
    //console.log(selectedBlock)
    setSelectedBlock(selectedBlock);//wybyraje medytacju
    console.log(`Selected Meitation ${selectedBlock}`)
    //console.log(user)

  }
  const handleRemove = async (savedMeditationId,meditationId) => {
    onChecked(savedMeditationId);
    try {
      const params = { id: userId, savedMeditationId: savedMeditationId };
      await dispatch(removeSavedMeditation(params));
      console.log(meditationId)
      const indexOfMeditationToRemove = savedMeditationIds.indexOf(meditationId);
      if (indexOfMeditationToRemove !== -1) {
        savedMeditationIds.splice(indexOfMeditationToRemove, 1);
       localStorage.setItem('savedMeditationIds', JSON.stringify(savedMeditationIds));
      }
      console.log(`Meditation id ${savedMeditationId} removed`);
    } catch (error) {
      console.log('Error:', error);
    }
    console.log('Current state:', state);
  };
  
  useEffect(() => {
    // Dodaj ponowne załadowanie medytacji po usunięciu do zależności useEffect
    if (userId) {
      dispatch(getSavedMeditations(userId));
      dispatch(getMoodData(userId));
    }
  }, [dispatch, savedMeditations]);
  // <MeditationItem i= {i} meditation={meditation}>
  //               </MeditationItem>
  const getMoodForDay = (dayTimestamp) => {
    const moodForDay = moodData.find(
      (mood) => new Date(mood.date).toDateString() === new Date(dayTimestamp).toDateString()
    );
    return moodForDay ? moodForDay.mood : null;
  };

  const getProgramEffectMessage = (dayTimestamp) => {
    const moodForDay = getMoodForDay(dayTimestamp);
    if (moodForDay === 'good') {
      return 'Program pomaga';
    } else if (moodForDay === 'bad') {
      return 'Program nie pomaga';
    }
    return null;
  };
  return (
    <div className={styles.bodyBlock}>
      <div className={styles.oval}></div>
      <div className={styles.main}>
      <div className={styles.sideText}>
      {/* <p>{`Cześć, ${user || 'Guest'}`}</p> */}

        <p>{`Cześć, ${user?.username || 'Guest'}`}</p>
        <p className={styles.textNext}>Uczyń swój dzień lepszym</p>

        <div className={styles.program}>
          
          <div className={styles.programnext}>
          <p>Rozpocznij 5-dniowy program</p>
          <Link to={`/program`}><img src={forward} alt="Forward Icon" className={styles.forward} /></Link></div>
          <img src={main_img} alt="Main Image" className={styles.mainImg} />
        </div>
       

        <div className={styles.accessible}>
        <p>Dostępne medytacje</p>
          <div className={styles.all}>
           <Link to={`/meditationsList`}>
           <p>Wszystko</p>
            </Link> 
           
          </div>
        </div>

        <div className={styles.blocksContainer}>
            {meditations?.slice(0, 4).map((meditation, i) => (
                            <div className={` ${styles.blockCommon}`} key={i}>
                                <MeditationItem i={i} meditation={meditation}></MeditationItem>
                            </div>
                        ))}
                    </div>

                    <div className={styles.accessible2}>
                         <p>Zapisane medytacje</p>
                        <div className={styles.all2}>
                        </div>
                    </div>

                    <div className={styles.blockContainer}>
                    {savedMeditations?.map((savedMeditation, i) => (
  <div key={i} className={` ${styles.blockCommon}`}>
    {savedMeditation && (
      <button className={styles.button2} onClick={() => {handleRemove(savedMeditation?._id, savedMeditation?.meditationId)}}><img src={close} className={styles.close}/></button>
    )}
  <img src={`http://localhost:3002/images/${savedMeditation?.img}`} alt={`Image for option `} />

    {savedMeditation?.title || 'Untitled Meditation'}
  </div>
))}
    
  </div>
  <div className={styles.accessible2}>
                         <p>Twoj nastroj i dni</p>
                        <div className={styles.all2}>
                        </div>
                    </div>
  <div className={styles.blockContainer}>
  {user?.finishedProgramDays?.map((day, i) => (
        <div className={` ${styles.blockCommon}`} key={i}>
          {/* ... (Your existing JSX code for displaying meditation items) */}
          <p>Mood for Day {day?.dayName}: {getMoodForDay(day?.timestamp)} </p>
          <p>{getProgramEffectMessage(day?.timestamp)}</p>
        </div>
      ))}
</div>
</div>

      </div>
     
      </div>
     
    
  );
}

export default Main;
