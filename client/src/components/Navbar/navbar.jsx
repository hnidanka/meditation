import React from 'react';
import styles from './styles.module.css'; 
import logo2 from './images/logo2.png'
import home from './images/home.png'
import music from './images/music.png'
import chat from './images/chat.png'
import profil from './images/profil.png'
import calendar from './images/calendar.png'
import books from './images/books.png'
import logoutImg from './images/logout.png'
import {useLocation} from 'react-router-dom'
import { Link , useNavigate} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice';
import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function Navbar({ name }) {
    const isAuth = true

  // const isAuth = useSelector(checkIsAuth)
  // console.log(isAuth)
   const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const { status } = useSelector((state) => state.auth)
    // useEffect(() => {
    //     if (status) toast(status)
    //     if (isAuth) navigate(`/main/${user._id}`)
    //     //if (isAuth) navigate('/questions')

    // }, [status, isAuth, navigate])
    const logoutHandler = () => {
      dispatch(logout())
      window.localStorage.removeItem('token')
      
        toast('Wylogowałeś się z systemu')
      
      navigate('/logging')
      
  }
    const location = useLocation();
    const { pathname } = location;
    const excludedPaths = ['/hello' , '/' , '/registration' , '/logging' , '/starttest' , '/endtest' , '/question1' , '/question2' , '/question3' , '/questions' ];
    
  
    if (excludedPaths.includes(pathname)) {
        return null;
      }
  return (
    <div className={styles.body}>
      <div className={styles.oval}></div>
      <div className={styles.leftRectangle}></div>
      {isAuth && (
        <div className={styles.textOverRectangle}>
           <img src={logo2} alt="Logo" className={styles.logo} />
           
          <Link to={`main/${user?._id}`} className={styles.textOver}>
            <img src={home} alt="Home Icon" />
            <p>Główna</p>
          </Link>
          <Link to="/music" className={styles.textOver}>
            <img src={music} alt="Music Icon" />
            <p>Muzyka</p>
          </Link>
          <Link to="/chat" className={styles.textOver}>
            <img src={chat} alt="Chat Icon" />
            <p>Czat</p>
          </Link>
          <Link to="/profil" className={styles.textOver}>
            <img src={profil} alt="Profil Icon" />
            <p>Profil</p>
          </Link>
          <Link to="/mood" className={styles.textOver}>
            <img src={calendar} alt="Calendar Icon" />
            <p>Nastrój</p>
          </Link>
          <Link to="/books" className={styles.textOver}>
            <img src={books} alt="Books Icon" />
            <p>Książki</p>
          </Link>
        </div>
      )}
      
      <div className={styles.logoutText}>
        <img src={logoutImg} alt="Logout Icon" />
        <button onClick={logoutHandler} className={styles.buttonLog}><p>Wyloguj się</p></button>
          {/* <p>Wyloguj się</p> */}
      </div>
      <ToastContainer position='bottom-right' />
     </div>
  );
}

export default Navbar;
