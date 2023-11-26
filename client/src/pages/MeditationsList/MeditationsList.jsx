import React from 'react';
import styles from './styles.module.css';
import { getMeditations } from '../../redux/features/meditationSlice';
import { useDispatch , useSelector} from 'react-redux';
import { useEffect , useState}  from 'react';
import woman_main from './images/woman_main.png';
import { insertSavedMeditations } from '../../redux/features/meditationSlice';
import save from './images/save.png';
import { Link , useNavigate} from 'react-router-dom';
import { getSavedMeditations } from '../../redux/features/meditationSlice';
import { upgrateLevel } from '../../redux/features/auth/authSlice';
export const MeditationsList = () => {
  const state = useSelector(state => state)
  const {meditations, savedMeditation} = useSelector((state) => state.meditation);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const user = useSelector((state) => state.auth.user?._id)
  const userr = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  
  const dispatch = useDispatch();
  const [savedMeditationIds, setSavedMeditationIds] = useState(
    JSON.parse(localStorage.getItem('savedMeditationIds')) || []
  );
  const [selectedMeditationId, setSelectedMeditationId] = useState(
    localStorage.getItem('selectedMeditationId') || null
  );
  useEffect(() => {
    localStorage.setItem('selectedMeditationId', selectedMeditationId);
  }, [selectedMeditationId]);

  useEffect(() => {
    localStorage.setItem('savedMeditationIds', JSON.stringify(savedMeditationIds));
  }, [savedMeditationIds]);

 
    const saveMeditation = async (index) => {
      try {
        const params = { meditationId: index, userId: user };
  
        // Dispatch the insertSavedMeditations action
        await dispatch(insertSavedMeditations(params));
  
        // Retrieve the updated savedMeditations after dispatching the insertSavedMeditations action
        const response = await dispatch(getSavedMeditations(user));
  
        if (Array.isArray(response.payload)) {
          // Update the local state with the updated savedMeditations
          setSavedMeditationIds(response.payload.map((m) => m.meditationId));
  
          // Check if the selected meditation is among the saved meditations
          if (savedMeditationIds.includes(index)) {
            // If it is saved, update the selectedMeditationId state
            setSelectedMeditationId(index);
          } else {
            // If it is not saved, reset selectedMeditationId to null (button should be purple)
            setSelectedMeditationId(null);
          }
        } else {
          console.error('Invalid format for saved meditations data:', response);
        }
  
        console.log(state);
      } catch (error) {
        console.error(error);
      }
    };
 
    function handleStart(index){
      navigate(`/meditation/${index}`)
    }
    
    useEffect(() => {
      if (savedMeditation) {
        setSavedMeditationIds(savedMeditation.map((m) => m.meditationId));
      }
    }, [savedMeditation]);


  

  useEffect(() => {
    // Зміни, щоб викликати getMeditations при завантаженні сторінки
    const fetchData = async () => {
      await dispatch(getMeditations());
    };

    fetchData(); // Викликати функцію при завантаженні компонента
  }, [dispatch]);



useEffect(() => {
  if (savedMeditation) {
    // No need to set savedMeditationIds directly
    console.log('savedMeditation:', savedMeditation);
  }
}, [savedMeditation]);


useEffect(() => {
  const finishedMeditations = userr?.finishedMeditations;
const level =  userr?.level;
  console.log('Finished Meditations:', finishedMeditations);

  if (finishedMeditations === 2 || finishedMeditations === 5 || finishedMeditations === 9 || finishedMeditations === 14 || 
    finishedMeditations === 20 || finishedMeditations === 28 || finishedMeditations === 38 || finishedMeditations === 50 ||
     finishedMeditations === 65 || finishedMeditations === 75 || finishedMeditations === 100) {
    // console.log('W ifie');
    // console.log(finishedMeditations);
if(finishedMeditations === 2 && level === 1 || finishedMeditations === 5 && level === 2 ||
  finishedMeditations === 9 && level === 3 || finishedMeditations === 14 && level === 4 ||
   finishedMeditations === 20 && level === 5|| finishedMeditations === 28 && level === 6|| 
   finishedMeditations === 38 && level === 7|| finishedMeditations === 50 && level === 8 || 
  finishedMeditations === 65 && level === 9 || finishedMeditations === 75 && level === 10 || 
  finishedMeditations === 100 && level === 11){
    console.log(`Twój poziom jest już upgrate  wcześniej: ${userr?.level}`);
  }else{
    dispatch(upgrateLevel(user));
  }
    // Dispatch the action
    
   } else {
  //   console.log(`Twój poziom jest taki sam jak wcześniej: ${userr?.level}`);
   }
   
}, [userr?.finishedMeditations, dispatch]);


console.log(state);
    return (
      
        <div className={styles.bodyBlock}>
        <div className={styles.blocksContainer}>
        <div className={styles.meditationall}>Dostępne medytacje</div>
          {meditations?.map((meditation, i) => (
            <div className={styles.block} key={i}>
              <div className={styles.leftSide}>
              <img src={`http://localhost:3002/images/${meditation?.img}`} alt={`Image for option `} />
              </div>
              <div className={styles.rightSide}>
                <p  className={styles.title}>{meditation?.title}</p>
                <p>{meditation.description}</p>
                <div className={styles.buttons}>
                <button
                  style={{
                    backgroundColor:
                      selectedMeditationId === meditation?._id
                        ? '#c44141' // Button is selected
                        : savedMeditationIds.includes(meditation?._id)
                        ? '#c44141' // Button is saved
                        : '#471E70', // Default color
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    saveMeditation(meditation?._id);
                  }}
                >
                  <img src={save} alt="Save" />
                </button>


                <button className={styles.button2} onClick={() => {handleStart(meditation?._id)}}>Start</button>
                </div>
              </div>
            </div>
          ))}
        </div></div>
     
    );
    
}
