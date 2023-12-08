// Program.js
import React from 'react';
import styles from './styles.module.css';
import { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPrograms, getMyResult } from '../../redux/features/programSlice';
import { getMeditations } from '../../redux/features/meditationSlice';
import { Link , useNavigate} from 'react-router-dom';
import { finisheProgramDay } from '../../redux/features/auth/authSlice';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import close from './images/close.png';
import { getMoodData } from '../../redux/features/moodSlice';
function Program() {
  const dispatch = useDispatch();
  const { programs, userResult } = useSelector((state) => state.program5Day);
  const userId = useSelector((state) => state.auth.user?._id);
  const user = useSelector((state) => state.auth?.user);
  const [userFinalProgram, setUserFinalProgram] = useState(null);
  const [programDays, setProgramDays] = useState([]);
  const state = useSelector(state => state)
 const meditation = useSelector(state => state.meditation.meditations)
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedMeditation, setSelectedMeditation] = useState(null);
 const [selectedDay, setSelectedDay] = useState(null);
 let title;
 let description;
 let dayMedId = '';
 const navigate = useNavigate()
 function getLockIcon(dayName) {
  const dayIndex = programDays.findIndex((day) => day.dayName === dayName);

  // Check if all previous days are completed
  const allPreviousDaysCompleted = programDays
    .slice(0, dayIndex)
    .every((prevDay) =>
      user?.finishedProgramDays.some((finishedDay) => finishedDay.dayName === prevDay.dayName)
    );

  // If the day is completed or all previous days are completed, return 'faLockOpen', else 'faLock'
  return user?.finishedProgramDays.some((finishedDay) => finishedDay.dayName === dayName) ||
    allPreviousDaysCompleted
    ? 'faLockOpen'
    : 'faLock';
}


const openModal = (meditationId, dayName) => {
  if (getLockIcon(dayName) === 'faLock') {
    return;
  }
  setSelectedMeditation(meditationId);
  setIsModalOpen(true);
};

 const closeModal = () => {
   setSelectedMeditation(null);
   setIsModalOpen(false);
 };
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getMeditations());
    };

    fetchData(); 
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPrograms());
    if (userId) {
      dispatch(getMyResult(userId));
    }
  }, [dispatch, userId]);

  const compareResults = () => {
    if (programs.length > 0 && userResult.length > 0) {
      programs.forEach((program) => {
        const programResult = program.result;
  
        const userProgram = userResult.find((uProgram) => {
          const userProgramResult = uProgram.result[0].result;
          console.log(userProgramResult)
          return programResult.every((value, index) => value === userProgramResult[index]);
        });
  
        if (userProgram) {
          console.log(`Match found for program: ${program.name}`);
          setUserFinalProgram(program);
          setProgramDays(program.days);
        }
      });
    }
  };

  useEffect(() => {
    compareResults();
  }, [programs, userResult]);
console.log(state)

function onChecked(selectedDay){
  setSelectedDay(selectedDay);
  console.log(selectedDay)
  
    //setChecked(check)
}
function handleStart(dayMeditation) {
  const dayName = selectedDay.dayName;

  // Check if the day is already marked as finished
  const isAlreadyFinished = programDays.some(
    (day) => day.dayName === dayName && user?.finishedProgramDays?.includes(dayName)
  );

  if (isAlreadyFinished) {
    console.log('Day already finished by the user');
    return;
  }
  //const recordedMood = moodData[selectedDay.date]?.mood;
  // Dispatch the action to finish the day
  dispatch(finisheProgramDay({ userId, dayName }));

  // Navigate to the meditation page
  navigate(`/meditation/${dayMeditation}`);
}


  return (
   
    <div className={styles.container}>
      {userFinalProgram ? (
        <div className={styles.header}>
          Twój 5-dniowy program to: {userFinalProgram.name}
        </div>



      ) : (
        <div className={styles.header}>Twój 5-dniowy program to: Brak programu</div>
      )}
 {userFinalProgram && programDays.length > 0 && (
  <>
    {programDays.map((day) => (
      <div key={day?.dayId} className={styles.block}>
       <div className={styles.innerBlock} onClick={() => {
         onChecked(day);
         openModal(day.dayMeditation, day?.dayName)}}>{day?.dayName} </div> 
       <div className={styles.lockUnlock}>
          {getLockIcon(day?.dayName) === 'faLockOpen' ? (
            <FontAwesomeIcon icon={faLockOpen} />
             ) : (
           <FontAwesomeIcon icon={faLock} />
           )}
      </div>
      </div> 
    ))}
  </>
)}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={styles.customModal}
      >
        <h2>{selectedDay?.dayName}</h2>
        {meditation.map((med) => {
    if (med._id === selectedDay?.dayMeditation) {
       title = med.title
       description = med.description
       dayMedId = med._id
       console.log(dayMedId)
    }
   
  })}
  <div className={styles.modalContent}>
  <h3>{title}</h3>
  <p>{description}</p>
  </div>
  <button className={styles.buttonStart} onClick={() => handleStart(dayMedId)}>Rozpocznij</button>
  <button onClick={closeModal} className={styles.imageButton}>
            <img src={close} alt="Close" />
          </button>
      </Modal>
</div>
  );
}

export default Program;

