import { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css';
import edit from './images/edit.png';
import { addUserImage } from '../../redux/features/auth/authSlice';
import { getRewards , getAllUserRewards, addUserRewards} from '../../redux/features/rewardSlice';
import { getMoodData } from '../../redux/features/moodSlice';

function Profil() {
  const state = useSelector((state)=> state)
  const user = useSelector(state => state.auth.user)
  const userId = useSelector(state => state.auth.user?._id)
  const [image, setImage] = useState("");
  const imageToDisplay = user?.image;
  const userReward = useSelector(state => state.reward.userRewars)
  let rewardId = useSelector(state => state.reward.rewards?._id)
 const [selectedRewardId, setSelectedRewardId] = useState('')
 
 const [selectedRewardIdForMeditation, setSelectedRewardIdForMeditation] = useState('');
 const [selectedRewardIdForLevel, setSelectedRewardIdForLevel] = useState('');
 const [selectedRewardIdForDifferentMeditations, setSelectedRewardIdForDifferentMeditations] = useState('');
 const [selectedRewardIdForGoodMood, setSelectedRewardIdForGoodMood] = useState('');
 const [selectedRewardIdForProgramDays, setSelectedRewardIdForProgramDays] = useState('');

  const dispatch = useDispatch();
  function covertToBase64(e){
  console.log(e)
  var reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = ()  => {
    console.log(reader.result); 
    setImage(reader.result);
  };
  reader.onerror = error => {
    console.log("Error", error);
  }
}
function uploadImage(){
 // dispatch(addUserImage({userId , image}))
  console.log("Funkcja img wykonana")
}
const getRecentGoodMoodCount = () => {
  const recentMoodData = state.mood.moodData?.slice(-5) || []; // Sprawdzenie, czy moodData jest zdefiniowane
  const goodMoodCount = recentMoodData.filter((entry) => entry.mood === 'good').length;
  return goodMoodCount;
};
useEffect(() => {
  dispatch(getRewards());
   dispatch(getMoodData(userId));
  dispatch(getAllUserRewards(userId));
}, [dispatch, userId]);


const reward1Id = state.reward.rewards[1]?._id;
console.log(`REWARD 1 ID: ${reward1Id}`)
useEffect(() => {
  const finishedMeditations = user?.finishedMeditations;


  const level = user?.level;
  const finishedDifferentMeditations = user?.finishedDifferentMeditations;
  const goodMoodCount = getRecentGoodMoodCount();
  const isFinishedProgramDaysComplete = user?.finishedProgramDays?.length === 5;

  if (finishedMeditations === 1) {
    const rewardIdToAdd = state.reward.rewards[1]?._id;
    setSelectedRewardIdForMeditation(rewardIdToAdd);

  }
  if (level === 11 && state.reward.rewards.length > 0) {
    const rewardIdToAdd = state.reward.rewards[2]?._id;
    setSelectedRewardIdForLevel(rewardIdToAdd);
  }
  if (finishedDifferentMeditations && finishedDifferentMeditations.length === 8) {
    const rewardIdToAdd = state.reward.rewards[4]?._id;
    setSelectedRewardIdForDifferentMeditations(rewardIdToAdd);
  }
  if (goodMoodCount === 5 && state.reward.rewards.length > 0) {
    const rewardIdToAdd = state.reward.rewards[0]?._id;
    setSelectedRewardIdForGoodMood(rewardIdToAdd);
  }

}, [user, state.reward.rewards]);

  if (isFinishedProgramDaysComplete) {
    const rewardIdToAdd = state.reward.rewards[3]?._id;
    setSelectedRewardIdForProgramDays(rewardIdToAdd);
  }
}, [user, selectedRewardId, state.reward.rewards]);

useEffect(() => {
  if (selectedRewardIdForMeditation) {
    dispatch(addUserRewards({ userId, selectedRewardId: selectedRewardIdForMeditation })).then(() => {
      dispatch(getAllUserRewards(userId));
    });
  }
}, [dispatch, userId, selectedRewardIdForMeditation]);

useEffect(() => {
  if (selectedRewardIdForLevel) {
    dispatch(addUserRewards({ userId, selectedRewardId: selectedRewardIdForLevel })).then(() => {
      dispatch(getAllUserRewards(userId));
    });
  }
}, [dispatch, userId, selectedRewardIdForLevel]);

useEffect(() => {
  if (selectedRewardIdForDifferentMeditations) {
    dispatch(addUserRewards({ userId, selectedRewardId: selectedRewardIdForDifferentMeditations })).then(() => {
      dispatch(getAllUserRewards(userId));
    });
  }
}, [dispatch, userId, selectedRewardIdForDifferentMeditations]);

useEffect(() => {
  if (selectedRewardIdForGoodMood) {
    dispatch(addUserRewards({ userId, selectedRewardId: selectedRewardIdForGoodMood })).then(() => {
      dispatch(getAllUserRewards(userId));
    });
  }
}, [dispatch, userId, selectedRewardIdForGoodMood]);


useEffect(() => {
  if (selectedRewardIdForProgramDays) {
    dispatch(addUserRewards({ userId, selectedRewardId: selectedRewardIdForProgramDays })).then(() => {
      dispatch(getAllUserRewards(userId));
    });
  }
}, [dispatch, userId, selectedRewardIdForProgramDays]);

useEffect(() => {
  dispatch(getAllUserRewards(userId));
}, [dispatch, userId]);;
console.log(state)
  return (
    <div className={styles.bodyBlock}>
     <div className={styles.profil}>Profil</div>
     <div className={styles.infoUser}>
  
            {/* {image =="" || image==null?"":  <img width={100} height={100} src={image}/>} */}
           {/* <button onClick={uploadImage} className={styles.buttonImage}>Dodaj img</button> */}

           {imageToDisplay =="" || imageToDisplay==null?
           <div>
              <label htmlFor="fileInput" className={styles.customFileInput}>
              Wybierz plik
            </label>
            <input
              id="fileInput"
              accept="image/*"
              type="file"
              onChange={covertToBase64}
              className={styles.inputImg}
            />
           <button onClick={uploadImage} className={styles.buttonImage}>Dodaj img</button>
            </div>
           :  <img width={200} height={200} style={{ borderRadius: '80px' }} src={imageToDisplay}/>}
         <div className={styles.name}>
          <p>{user?.username }</p>
          <div className={styles.edit}><img  src={edit}/></div>
          </div>
          
     </div>

     <div className={styles.awards}>
          <p>Nagrody</p>
          <div className={styles.blockAwards}>
              {/* <div className={styles.noneAwards}>Nie masz nagród </div> */}
              {userReward?.map((reward, i) => (
              <div className={styles}>
                 <p>{reward?.title}</p> 
                 <img src={`http://localhost:3002/images/${reward?.img}`} alt={`Image for option `} />

              </div>

              ))}
             
          </div>
     </div>
     <div className={styles.achievement}>
            <p>Osiągnięcie</p>
            <div className={styles.achievementInfo}>
            <div className={styles.achievementLevel}>
               <div className={styles.level}>{user?.level}</div>
            </div>
            <div className={styles.achievementFinish}>
              
              <div className={styles.finish}>{user?.finishedMeditations}</div>
              
            </div>
            </div>
     </div>
     </div>
  );
}

export default Profil;