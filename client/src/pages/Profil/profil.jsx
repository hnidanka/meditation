import { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css';
import edit from './images/edit.png';
import { addUserImage } from '../../redux/features/auth/authSlice';
import { getRewards , getAllUserRewards, addUserRewards} from '../../redux/features/rewardSlice';
function Profil() {
  const state = useSelector((state)=> state)
  const user = useSelector(state => state.auth.user)
  const userId = useSelector(state => state.auth.user?._id)
  const [image, setImage] = useState("");
  const imageToDisplay = user?.image;
  const userReward = useSelector(state => state.reward.userRewars)
  let rewardId = useSelector(state => state.reward.rewards?._id)
 const [selectedRewardId, setSelectedRewardId] = useState('')
 
  console.log(`REWARD ID ${selectedRewardId}`);
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
useEffect(() => {
  dispatch(getRewards());
  dispatch(getAllUserRewards(userId));
}, [dispatch, userId]);

useEffect(() => {
  const finishedMeditations = user?.finishedMeditations;
  const level = user?.level
  const finishedDifferentMeditations = user?.finishedDifferentMeditations;
  if (finishedMeditations === 1 ) {
    const rewardIdToAdd = state.reward.rewards[0]?._id;
    setSelectedRewardId(rewardIdToAdd);
  }
  if (level === 11 && state.reward.rewards.length > 0) {
    const rewardIdToAdd = state.reward.rewards[2]?._id;
    setSelectedRewardId(rewardIdToAdd);
  }
  if (finishedDifferentMeditations && finishedDifferentMeditations.length === 8 ) {
    const rewardIdToAdd = state.reward.rewards[3]?._id;
    setSelectedRewardId(rewardIdToAdd);
  }
}, [user, state.reward.rewards]);

useEffect(() => {
  if (selectedRewardId) {
    dispatch(addUserRewards({ userId, selectedRewardId })).then(() => {
      // Dispatch getAllUserRewards after addUserRewards is completed
      dispatch(getAllUserRewards(userId));
    });
  }
}, [dispatch, userId, selectedRewardId]);

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