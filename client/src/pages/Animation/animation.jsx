import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import star from './images/star.png';
import Play from './images/Play.png';
import Stop from './images/Stop.png';
import yourAudioFile from './audio/atmospherepiano.mp3';
import Next from './images/Next.png';

function Animation() {

  
  const numStars = 170; // Number of stars you want to display

  const [cloudElements] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // State to track audio playing status
  const [audioPosition, setAudioPosition] = useState(0); // State to track audio position
  const [starsAnimated, setStarsAnimated] = useState(true); // State to control star animations
  const [isAudioLoaded, setIsAudioLoaded] = useState(false); // Stan do śledzenia stanu wczytywania audio
  const [isAudioEnded, setIsAudioEnded] = useState(false); // Stan do śledzenia stanu zakończenia audio
  const [showNextButton, setShowNextButton] = useState(false);
  
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
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
    setStarsAnimated(!isPlaying);
  };
  const handleNextButtonClick = () => {
    // Реалізуй логіку для переходу на наступний крок або дію, яку потрібно виконати після аудіо
    console.log('Далі');
  };
 
  return (
    <div className={styles.container}>
      {starElements}
      {cloudElements}
      
      {isAudioLoaded && !isPlaying && isAudioEnded && (
  <button onClick={handleNextButtonClick} className={styles.nextButton}>
    <img src={Next} alt="Next" className={styles.fadeIn} />
  </button>
)}

      <div className={styles.textOverlay}>
        <h1>Medytacja skupiona</h1>
        <p>Krok 1: Przygotowanie</p>
      </div>
      

      <div className={styles.audioControls}>
        {isAudioLoaded && (
          <button onClick={handleTogglePlay} className={styles.customButton}>
            <img
              src={isPlaying ? Stop : Play}
              alt={isPlaying ? 'Stop' : 'Play'}
              className={styles.controlIcon}
            />
          </button>
        )}
      </div>

      <audio ref={audioRef} src={yourAudioFile} />
    </div>
  );
}

export default Animation;