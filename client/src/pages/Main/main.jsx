import React from 'react';
import styles from './styles.module.css'; 
import forward from './images/forward.png'
import main_img from './images/main_img.png'
import woman_main from './images/woman_main.png'
import addMood from './images/appointment.png'
import add from './images/add.png'
import start from './images/rocket.png'
import positiveMood from './images/mind.png'
import { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, getMe } from '../../redux/features/auth/authSlice';
import { getMeditations, getSavedMeditations, removeSavedMeditation} from '../../redux/features/meditationSlice';
import { MeditationItem } from './MeditationItem';
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import close from './images/close.png';
import { to } from 'react-spring';
import { getMoodData } from '../../redux/features/moodSlice';
import { useMemo } from 'react';
import { removeResult } from '../../redux/features/auth/authSlice';
function Main() {
  const navigate = useNavigate()
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

  //   useEffect(() => {
  //     if (userId) {
  //       dispatch(getSavedMeditations(userId));
  //     }
  //   }, [dispatch, userId]);
  //   console.log(savedMeditations);

  //  console.log(state);

   
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

  const handleChangeProgram = async () => {
    const resultId = user?.result[0];
    console.log(`RESULT ID ${resultId}`);
    try {
      console.log(`USERID ${userId}`);
      dispatch(removeResult({ userId, resultId }));
      navigate(`/starttest`);
    } catch (error) {
      // Handle error
    }
  };
  
  useEffect(() => {
    // Dodaj ponowne załadowanie medytacji po usunięciu do zależności useEffect
    if (userId) {
      dispatch(getSavedMeditations(userId));
      dispatch(getMoodData(userId));
    }
  }, [dispatch, userId]);

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
  const getProgramSuccessMessage = () => {
    const programDays = user?.finishedProgramDays || [];
    let successCount = 0;
  
    for (const day of programDays) {
      const moodForDay = getMoodForDay(day.timestamp);
      
      if (moodForDay === 'good') {
        successCount++;
        console.log(successCount)
      } 
      else if (moodForDay === 'bad') {
        successCount--;
      }
    }
  
    if (successCount > 0) {
      return (<div className={styles.programSuccessMessage}><p>Program zakończył się sukcesem! 🎉</p>
      <p>Zmieniłeś swoję medytacyjne preferencje? Możesz uzyskać nowy program </p>
        <button onClick={handleChangeProgram} className={styles.customButton}> Nowy program</button></div>
      );
     
    }else if (successCount <= 0 ){
      return (<div className={styles.programSuccessMessage}>
        <p>Niestety nasz program  nie pomogł, propunujemy ci ponownie wykonać test w celu pobierania innego programu</p>
        <button onClick={handleChangeProgram} className={styles.customButton}> Zmień program</button>
        </div>);
    }
  
    return null;
  };
  const getLast7DaysMoods = useMemo(() => {
    const last7Days = [];
    const currentDate = new Date();
  
    for (let i = 0; i < 7; i++) {
      const dayTimestamp = currentDate.getTime() - i * 24 * 60 * 60 * 1000;
      const moodForDay = getMoodForDay(dayTimestamp); // Dodano || 'neutral'
      last7Days.push(moodForDay);
      console.log(dayTimestamp);
    }
  
    return last7Days;
  }, [moodData]);
console.log(getLast7DaysMoods)
  const isMoreBadThanGood = getLast7DaysMoods.filter(mood => mood === 'bad').length >
                             getLast7DaysMoods.filter(mood => mood === 'good').length;

 const isMoreGoodThanBad = getLast7DaysMoods.filter(mood => mood === 'bad').length <
                             getLast7DaysMoods.filter(mood => mood === 'good').length;
console.log(isMoreBadThanGood )
console.log(isMoreGoodThanBad )
  const renderMessage = () => {
    if (isMoreBadThanGood) {
      // Lista nazw medytacji
const meditationNames = ["Medytacja Vipassana", "Medytacja Metta (Maitri)", "Medytacja Kundalini", "Medytacja Zen"];

// Filtruj medytacje na podstawie nazw
const filteredMeditations = meditations.filter(meditation => meditationNames.includes(meditation.title));

// Renderuj tylko medytacje zgodne z nazwami

      return ( 
        <div className={styles.suggestedBlock}>
        
      <p >Twój nastrój był więcej razy zły niż dobry przez ostatnie 7 dni. Propunujęmy ci wykonać dodatkową medytacje w celu ulepszenia twojego nastroju:</p>
              <div className={styles.blocksContainer}>
  {filteredMeditations?.slice(0, 4).map((meditation, i) => (
    <div className={` ${styles.blockCommon}`} key={i}>
      <MeditationItem i={i} meditation={meditation}></MeditationItem>
    </div>
  ))}
</div>
              </div>
      );
    }else if (isMoreGoodThanBad) {
      return (<div className={styles.suggestedBlock2}>
        <p>Jesteś w pozytywnym nastroju przez ostatnie 7 dni </p>
        <img src={positiveMood}  alt="positive"  /> 
                </div>);
    }  else { 
      return (<div className={styles.noCompleteddDaysResponse}>
        <p> Nie zapisałeś żadnego nastroju. Zapisz nastrój i zobacz nasze porady </p>
        <img src={addMood} onClick={() => window.location.assign('/mood')} alt="addMood" className={styles.mainImg} />
      </div>
      );
    }
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
                    {user?.savedMeditations && user?.savedMeditations.length > 0 ? (
  <div className={styles.blockContainer}>
    {savedMeditations?.map((savedMeditation, i) => (
      <div key={i} className={` ${styles.blockCommon}`}>
        {savedMeditation && (
          <button className={styles.button2} onClick={() => {handleRemove(savedMeditation?._id, savedMeditation?.meditationId)}}>
            <img src={close} className={styles.close} />
          </button>
        )}
        <img src={`http://localhost:3002/images/${savedMeditation?.img}`} alt={`Image for option `} />
        {savedMeditation?.title || 'Untitled Meditation'}
      </div>
    ))}
  </div>
) : (
  <div className={styles.noCompleteddDaysResponse}>
        <p> Nie zapisałeś żadnej medytacji </p>
        <img src={add} onClick={() => window.location.assign('/meditationsList')} alt="addMeditation" className={styles.mainImg} />
      </div>
)}
                    
  <div className={styles.accessible2}>
                         <p>Obserwacja twojego nastroju na podstawie programu medytacyjnego</p>
                        <div className={styles.all2}>
                        </div>
                    </div>
                    {user?.finishedProgramDays && user?.finishedProgramDays.length > 0 ? (
  <>
    <table>
      <thead>
        <tr>
          <th>Dzień</th>
          <th>Nastrój</th>
          <th>Wynik</th>
        </tr>
      </thead>
      <tbody>
        {user.finishedProgramDays.map((day, i) => (
          <tr key={i}>
            <td>{day?.dayName}</td>
            <td>{getMoodForDay(day?.timestamp)}</td>
            <td>{getProgramEffectMessage(day?.timestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>  {user?.finishedProgramDays && user?.finishedProgramDays.length >= 5 ? (getProgramSuccessMessage()
    ):( 
      `W celu uzyskanie ogólnego wyniku musisz skończyć program`)}
    
  </>
) : (
  <div className={styles.noCompleteddDaysResponse}>
  <p>Nie wykonałeś jeszcze żadnego dnia. Przystąp do programu medytacyjnego w celu uzyskania analizy.</p>
  <img src={start} onClick={() => window.location.assign('/program')} alt="start program"  className={styles.mainImg} />
  </div>
)}


<div className={styles.accessible2}>
<p>Nasze polecenia </p>                         
  </div>
{renderMessage()}
</div>



      </div>   
      </div>
  );
}

export default Main;
