import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Search from '../images/Search.png';
import { Link } from 'react-router-dom';
import music2 from '../images/music2.png';
import music5 from '../images/music5.png';
import Play from '../images/Play.png';
import Stop from '../images/Stop.png';
import skipforward from '../images/skipforward.png';
import skipbackward from '../images/skipbackward.png';
import summer from '../audio/summer.mp3'
import relaxed from '../audio/relaxed.mp3'
import sound1 from '../audio/sound1.mp3'
import sound2 from '../audio/sound2.mp3'
import sound3 from '../audio/sound3.mp3'
import sound1img from '../images/sound1.png'
import sound2img from '../images/sound2.png'
import sound3img from '../images/sound3.png'
const songsData = [
  {
    title: 'Fall ASLEEP like a baby',
    author: 'BluBonRelaXon',
    image: sound1img,
    audio: sound1,
  },
  {
    title: 'Rain and Tears',
    author: 'JuliusH',
    image:  sound2img,
    audio:  sound2,
  },
  {
    title: 'The Old Water Mill Meditation',
    author: 'NaturesEye',
    image:  sound3img,
    audio:  sound3,
  },
  {
    title: 'Summer Adventures',
    author: 'SergePavkinMusic',
    image:  music5,
    audio:  summer,
  },
  {
    title: 'Relaxed Vlog (Night Street)',
    author: 'Ashot-Danielyan-Composer',
    image:  music2,
    audio:  relaxed,
  }
  
  
];

function Music() {
  const [selectedSong, setSelectedSong] = useState(songsData[0]);
  const [audioRef, setAudioRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songsData);

 
  const playNextSong = () => {
    const currentIndex = songsData.findIndex((song) => song === selectedSong);
    if (currentIndex < songsData.length - 1) {
      handleSelectSong(songsData[currentIndex + 1]);
    }
  }

  useEffect(() => {
    if (audioRef) {
      audioRef.addEventListener('loadedmetadata', () => {
        const audioDuration = audioRef.duration;
        setDuration(audioDuration);
      });

      audioRef.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.currentTime);
      });

      audioRef.addEventListener('ended', () => {
        playNextSong();
      });
    }
  }, [audioRef, selectedSong]);

  const handleSelectSong = (song) => {
    if (audioRef) {
  
      audioRef.pause();
      audioRef.currentTime = 0;
      setSelectedSong(song);
      audioRef.src = song.audio;
      audioRef.load();
      audioRef.play().catch((error) => {
        console.error("Error while playing audio:", error);
      });
  
      setIsPlaying(true);
    }
  };
  const stopAudio = () => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const playAudio = () => {
    if (audioRef) {
      if (audioRef.paused) {
        audioRef.play().catch((error) => {
          console.error("Error while playing audio:", error);
        });
      } else {
        audioRef.pause();
      }
      setIsPlaying(!audioRef.paused);
    }
  };

  const skipForward = () => {
    if (audioRef) {
      audioRef.currentTime += 10; 
    }
  };

  const skipBackward = () => {
    if (audioRef) {
      audioRef.currentTime -= 10; 
    }
  };
  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const filtered = songsData.filter((song) =>
      song.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    
      <div className={styles.bodyBlock}>
      <div className={styles.oval}></div>
      <div className={styles.pageHeader}>Muzyka</div>
      <div className={styles.searchApp}>
        <div className={styles.searchContainer}>
          <img src={Search} alt="Search" className={styles.searchIcon} />
          <input
  type="text"
  placeholder="Wyszukaj audio"
  value={searchText}
  onChange={handleSearch}
  className={styles.searchInput}
/>

        </div>
      </div>
      <div className={styles.selectMusic}>
      <p className={styles.pText}><Link to="/music">Do medytacji</Link></p>
        <p className={styles.pText}><Link to="/musicunfastened">Odprężające</Link></p>
        <p className={styles.pText}><Link to="/musicforlearning">Do nauki</Link></p>
        <p className={styles.medetetion}><Link to="/sounds">Dźwięki</Link></p>
        <div className={styles.songsContainer}>
        <div className={styles.songList}>
        
        <div className={styles.songListContainer}>
  <ul>
    {filteredSongs.map((song, index) => (
      <li key={index} className={`${styles.songListItem} ${selectedSong === song && isPlaying ? styles.activeSong : ''}`}>
        <button onClick={() => handleSelectSong(song)} className={styles.playButton}>
          <img src={(selectedSong === song && isPlaying) ? Stop : Play} alt={(selectedSong === song && isPlaying) ? "Stop" : "Play"} />
        </button>
        <img src={song.image} alt={song.title} />
        <div className={styles.songInfo}>
          <p className={styles.songTitle}>{song.title}</p>
          <p className={styles.songAuthor}>{song.author}</p>
        </div>
      </li>
    ))}
  </ul>
</div>

</div>

          
        </div>
      </div>

      {selectedSong && (
  <div className={styles.playerContainer}>
    <div className={styles.audioPlayerContainer}>
      <audio ref={(audio) => setAudioRef(audio)}>
        <source src={selectedSong.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className={styles.customAudioControls}>
        
        <button onClick={skipBackward} className={styles.skipBackwardButton}>
          <img src={skipbackward} alt="Rewind" />
        </button>
        <button onClick={playAudio} className={styles.playButton}>
          {isPlaying ? (
            <img src={Stop} alt="Stop" />
          ) : (
            <img src={Play} alt="Play" />
          )}
        </button>
        <button onClick={skipForward} className={styles.skipForwardButton}>
          <img src={skipforward} alt="Fast Forward" />
        </button>
        
      </div>
      
    </div>
    
  </div>
  
      )}
      <div className={styles.slider}>
  {selectedSong && ( 
    <input
      type="range"
      min="0"
      max={audioRef ? audioRef.duration || 0 : 0}
      step="0.01"
      value={audioRef ? currentTime : 0}
      onChange={(e) => (audioRef.currentTime = e.target.value)}
      className={styles.progressSlider} 
    />
  )}
</div>



    </div>
  );
}

export default Music;
