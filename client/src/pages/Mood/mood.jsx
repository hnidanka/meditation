import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import './Calendar.css';
import Modal from 'react-modal';
import styles from './styles.module.css';
import close from './images/close.png';
import good from './images/good.png';
import bad from './images/bad.png';
import Chart from 'chart.js/auto';
import { addMoodRecord, getMoodData } from '../../redux/features/moodSlice';
import { Line } from 'react-chartjs-2';

function MoodCalendar() {
  const userId = useSelector((state) => state.auth.user?._id);
  const state = useSelector((state) => state);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  const dispatch = useDispatch();
  const moodData = useSelector((state) => state.mood.moodData);

 

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMood('');
  };

  const handleMoodSelection = async (mood) => {
    dispatch(addMoodRecord({ userId, date: selectedDate, mood }));
    closeModal();
  };

  useEffect(() => {
    if (userId) {
      dispatch(getMoodData(userId));
    }
  }, [dispatch, userId]);
 
 

 const prepareChartData = () => {
    const moodEntries = Object.values(moodData);
    const labels = moodEntries.map(entry => new Date(entry.date).toLocaleDateString());
    const moodValues = moodEntries.map(entry => entry.mood === 'good' ? 1 : 0); // Assign numeric values for mood

    return {
      labels,
      datasets: [
        {
          label: 'Twój nastrój',
          data: moodValues,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
      ],
    };
  };
  
  const tileContent = ({ date, view }) => {
    if (view === 'month' ) {
      const dateString = date.toISOString();
      
      // Convert moodData to an array
      const moodDataArray = Object.values(moodData) || [];
      
      // Use find on the array
      const moodEntry = moodDataArray.find(entry => entry && entry.date === dateString);

      if (moodEntry) {
        const mood = moodEntry.mood;
        const isUserEntry = moodEntry.userId === userId;
  
        if (mood === 'good' && isUserEntry) {
          return (
            <div style={{ color: 'green', fontWeight: 'bold' }}>
              good😄
              
            </div>
          );
        } else if (mood === 'bad' && isUserEntry) {
          return (
            <div style={{ color: 'red', fontWeight: 'bold' }}>
              
              bad😞
            </div>
          );
        }
      }
    }
  
    return null;
  };
  
  
  
  return (
    <div className={styles.bodyBlock}>
      <div className={styles.body}></div>
      <div className={styles.back}></div>
      <div className={styles.pageHeader}>Kalendarz nastroju</div>
      <Calendar value={selectedDate} onChange={handleDateChange} tileContent={tileContent} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Mood Record"
        shouldCloseOnOverlayClick={true}
        className={styles.customModal}
        ariaHideApp={false}
      >
        <div className={styles.customModalContent}>
          <button onClick={closeModal} className={styles.imageButton}>
            <img src={close} alt="Close" />
          </button>
          <h2>Rekord nastroju dla {selectedDate.toLocaleDateString()}</h2>
          <label>Wybierz Nastrój: </label>
          <div>
            <img
              src={good}
              alt="Dobry Nastrój"
              onClick={() => handleMoodSelection('good')}
              className={selectedMood === 'good' ? styles.selectedMood : ''}
            />
            <img
              src={bad}
              alt="Zły Nastrój"
              onClick={() => handleMoodSelection('bad')}
              className={selectedMood === 'bad' ? styles.selectedMood : ''}
            />
          </div>
          <p>{moodData[selectedDate.toDateString()]?.mood || 'Nie wybrano nastroju'}</p>
        </div>
      </Modal>
      <div className={styles.pageHeadertwo}>
        Tylko Ty jesteś twórcą swojego nastroju
     
        <Line data={prepareChartData()} /> 
      </div>
    </div>
  );
}

export default MoodCalendar;
