import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css'; 
import facebook from './images/facebook.png';
import google from './images/google.png';
import twitter from './images/twitter.png';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth, clearStatus } from '../../redux/features/auth/authSlice'
import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function Registration() {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [emptyFieldError, setEmptyFieldError] = useState('');
const state = useSelector((state)=>state.auth)
    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const [passwordError, setPasswordError] = useState('');


    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = () => {
      try {
        if (!email || !password || !username) {
          setEmptyFieldError('Proszę wypełnić wymagane pole');
          return;
        }
  
        if (password.length < 5) {
          setPasswordError('Hasło musi zawierać co najmniej 5 znaków');
        } else {
          setPasswordError('');   
          setEmptyFieldError('');
          dispatch(registerUser({ email, password, username }));
          setEmail('');
          setPassword('');
          setUsername('');
  
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (status) {
          toast(status)
      }
      if (isAuth) navigate('/logging');
      return () => {
        // Clear status when component unmounts
        dispatch(clearStatus());
      };
  }, [status, isAuth, navigate, dispatch])
  console.log(state)
    return (
      <div className={styles.bodyBlock}>
        <div className={styles.oval}></div>
  
        <div className={styles.centeredСontent}>
          <h1 className={styles.registrationTitle}>Rejestracja</h1>
          <form className={styles.form }>
            <input type="email" id="email" name="email" placeholder="Email"  required value={email} onChange={(e) => setEmail(e.target.value) } className={styles.formsize}/>
            {emptyFieldError && !email && <p className={styles.errorText}>{emptyFieldError}</p>}
          </form>  
              
          <form className={styles.form}>
            <input type="password" id="password" name="password" placeholder="Hasło"  value={password} onChange={(e) => setPassword(e.target.value)}/>
          </form>
          {emptyFieldError && !password && <p className={styles.errorText}>{emptyFieldError}</p>}
          {passwordError && <p className={styles.errorText}>{passwordError}</p>}
          
          <form className={styles.form}>
            <input type="pseudonym" id="pseudonym" name="pseudonym" placeholder="Wymyśl pseudonim" value={username} onChange={(e) => setUsername(e.target.value)}/>
            {emptyFieldError && !username && <p className={styles.errorText}>{emptyFieldError}</p>}
          </form> 
          
           <div className={styles.contentDown}>
            <button className={styles.nextButton} onClick={handleSubmit}>Dalej</button>
          <div className={styles.terms}>
            <p>
              Posiadasz już konto?      
              <Link to="/logging" className={`${styles.whiteText} ${styles.grayText}`}> Zaloguj się </Link>

            </p></div>
          </div>
        </div>
        {/* <ToastContainer position='bottom-right' /> */}
      </div>
    );
  }
export default Registration;
