import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/homepage';
import Hello from './pages/Hello/hello';
import Registration from './pages/Registration/registration';
import Logging from './pages/Logging/logging';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import StartTest from './pages/StartTest/starttest';
import EndTest from './pages/EndTest/endtest';
import Question1 from './pages/Question1/question1'
import Question2 from './pages/Question2/question2'
import Question3 from './pages/Question3/question3'
import Main from './pages/Main/main'
import Navbar from './components/Navbar/navbar'
import Books from './pages/Books/books'
import MoodCalendar from './pages/Mood/mood'
import Music from './pages/Music/music'
import Chat from './pages/Chat/chat'
import Profil from './pages/Profil/profil'
import MusicUnfastened from './pages/Music/MusicUnfastened/musicunfastened'
import MusicForLearning from './pages/Music/MusicForLearning/musicforlearning'
import Sounds from './pages/Music/Sounds/sounds'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
//import { getMe } from './redux/features/auth/authSlice';
import Animation from './pages/Animation/animation'
import Meditation from './pages/Meditation/meditation';
import Program from './pages/Program/program'
import Questions from './pages/Questions/questions';
import Test from './pages/Test/Test';
import { MeditationsList } from './pages/MeditationsList/MeditationsList';
import { getMe } from './redux/features/auth/authSlice';
import Messenger from './pages/Messenger/messenger';
import { socket } from './socketIo';
function App()
{
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch()
  useEffect(() =>
  {
    if(!token || token === ""){
      return;
    }
    socket.emit("authenticate", token);
  }, [token])

  useEffect(() =>
  {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/logging" element={<Logging />} />
        <Route path="/starttest" element={<StartTest />} />
        <Route path="/endtest" element={<EndTest />} />
        <Route path="/question1" element={<Question1 />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/question3" element={<Question3 />} />
        <Route path="/main/:userId" element={<Main />} />
        {/* <Route path="/main" element={<Main />} /> */}

        <Route path='/books' element={<Books />} />
        <Route path='/mood' element={<MoodCalendar />} />
        <Route path='/music' element={<Music />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/messenger/:chatId' element={<Messenger />} />

        <Route path='/profil' element={<Profil />} />
        <Route path='/musicunfastened' element={<MusicUnfastened />} />
        <Route path='/musicforlearning' element={<MusicForLearning />} />
        <Route path='/sounds' element={<Sounds />} />
        <Route path='/animation' element={<Animation />} />
        <Route path='/questions' element={<Test />} />
        <Route path='/meditationsList' element={<MeditationsList />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/test' element={<Test />} />
        <Route path='/meditation/:meditationId' element={<Meditation />} />
        <Route path='/program' element={<Program />} />

      </Routes>
    </Router>
  );
}

export default App;
