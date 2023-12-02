import React, { useState, useEffect, useRef } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import star from './images/star.png';
import Play from './images/Play.png';
import Stop from './images/Stop.png';
import M1 from './audio/M1.MP3';
import M2 from './audio/M2.MP3';
import M3 from './audio/M3.MP3';
import M4 from './audio/M4.MP3';
import M5 from './audio/M5.MP3';
import { updateFinishedMeditations , finishedDifferentMeditations} from '../../redux/features/auth/authSlice';

const songsData = [
  {
    audio: new Audio(M1),
  },
  {
    audio: new Audio(M2),
  },
  {
    audio: new Audio(M3),
  },
  {
    audio: new Audio(M4),
  },
  {
    audio: new Audio(M5),
  },
  {
    audio: new Audio(M3),
  },
  {
    audio: new Audio(M4),
  },
  {
    audio: new Audio(M5),
  },
];



function Meditation() {
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const {meditations, savedMeditation} = useSelector((state) => state.meditation);
  const { meditationId } = useParams();
  const userId = useSelector(state => state.auth.user?._id)
 const user = useSelector(state => state.auth.user)
  console.log(state);
  console.log(meditationId);
  let yourAudioFile;
 let meditationOne ;
meditations.forEach((meditation, i) => {
  // Użyj tutaj składni warunkowej
  if (meditation._id === meditationId) {
    // Tutaj użyj yourAudioFile
    meditationOne = meditation;
    yourAudioFile = meditation.audio.filename; //ЦЕ НАЗВА АУДИО ФАЙЛА!!!!!!!!!!
  }
});
console.log(meditationOne);
console.log(yourAudioFile);

  const numStars = 170; 

  const [cloudElements] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [audioPosition, setAudioPosition] = useState(0); 
  const [starsAnimated, setStarsAnimated] = useState(true); 
  const [isAudioLoaded, setIsAudioLoaded] = useState(false); 
  const [isAudioEnded, setIsAudioEnded] = useState(false); 
  const [showNextButton, setShowNextButton] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [highlightAudio, setHighlightAudio] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  
  
  const starElements = [];
  for (let i = 0; i < numStars; i++) {
    const starStyle = {
      top: `${25 + Math.random() * 60}vh`,
      left: `${15 + Math.random() * 80}vw`,
      animationDelay: `${Math.random() * 5}s`,
      animationPlayState: starsAnimated ? 'running' : 'paused', // Control animation state
    };

    starElements.push(
      <img
        key={`star-${i}`}
        src={star}
        alt={`Star ${i}`}
        className={styles.star}
        style={starStyle}
      />
    );
  }

  meditations.forEach((meditation, i) => {
    // Use a conditional statement to check if the current meditation matches the provided ID
    if (meditation._id === meditationId) {
      meditationOne = meditation;
      // Access the audio file from the songsData array using the current index
      yourAudioFile = songsData[i].audio.src;
    }
  });
  

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = new Audio(yourAudioFile);

    const handleCanPlayThrough = () => {
      setIsAudioLoaded(true);
    };
console.log(`AUDIO ${audio}`)
    const handleEnded = () => {
      setIsPlaying(false);
      setStarsAnimated(true);
      setIsAudioEnded(true); // Встанови стан, що аудіо відтворено до кінця
      setShowNextButton(true); // Покажи кнопку "Далі" після завершення відтворення
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('ended', handleEnded);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [yourAudioFile]);

  
 

  const [currentMeditationIndex, setCurrentMeditationIndex] = useState(0);

  useEffect(() => {
    const currentAudio = songsData[currentMeditationIndex].audio;
    audioRef.current = currentAudio;

    const handleCanPlayThrough = () => {
      setIsAudioLoaded(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setStarsAnimated(true);
      setIsAudioEnded(true);
      setShowNextButton(true);
    };

    currentAudio.addEventListener('canplaythrough', handleCanPlayThrough);
    currentAudio.addEventListener('ended', handleEnded);

    return () => {
      currentAudio.removeEventListener('canplaythrough', handleCanPlayThrough);
      currentAudio.removeEventListener('ended', handleEnded);
    };
  }, [currentMeditationIndex]);

  const handleTogglePlay = () => {
    const currentAudio = songsData[currentMeditationIndex].audio;

    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.currentTime = 0;
      currentAudio.play();
    }

    setIsPlaying(!isPlaying);
    setStarsAnimated(!isPlaying);
  };

  const handleFinish = () => {
    setIsFinished(true);
    dispatch(updateFinishedMeditations(userId));
    console.log(`MeditationId: ${meditationId}`)
    dispatch(finishedDifferentMeditations({userId, meditationId}))
    console.log(user.finishedMeditations)
    navigate('/meditationsList');
  };

  return (
    <div className={styles.bodyBlock}>
      <div className={styles.container}>
        {starElements}
        {cloudElements}

        <div className={styles.textOverlay}>
          <h1>{meditationOne?.title}</h1>
        </div>

        <div className={styles.audioControls}>
          {isAudioLoaded && (
            <>
              <button onClick={handleTogglePlay} className={styles.customButton}>
                <img
                  src={isPlaying ? Stop : Play}
                  alt={isPlaying ? 'Stop' : 'Play'}
                  className={styles.controlIcon}
                />
              </button>
              {isFinished ? (
                <button className={styles.customButton2} disabled>
                  Finish
                </button>
              ) : (
                <button onClick={handleFinish} className={styles.customButton2}>
                  Finish
                </button>
              )}
            </>
          )}
        </div>

        <audio ref={audioRef} src={meditationOne?.audio.src} />
      </div>
    </div>
  );
}

export default Meditation;