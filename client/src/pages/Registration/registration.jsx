import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'; 
import facebook from './images/facebook.png';
import google from './images/google.png';
import twitter from './images/twitter.png';

import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../../redux/features/auth/authSlice'

function Registration() {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    const dispatch = useDispatch()

    const isStrongPassword = (password) => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const isLengthValid = password.length >= 8;
      
      if (isLengthValid && hasUpperCase && hasNumber) {
        setPasswordStrength('Silne hasło');
      } else if (isLengthValid || hasUpperCase || hasNumber) {
        setPasswordStrength('Średnie hasło');
      } else {
        setPasswordStrength('Słabe hasło');
      }   
      return isLengthValid && hasUpperCase && hasNumber;
    };

    const handleSubmit = (e) => {
      e.preventDefault();

    if (!email || !password || !username) {
      setErrorMessage('Wszystkie pola są wymagane!');
      return;
    }
    const isPasswordStrong = isStrongPassword(password);

    if (!isPasswordStrong) {
      setErrorMessage('Hasło jest zbyt słabe. Spróbuj użyć silniejszego hasła.');
      return;
    }
      try {
          dispatch(registerUser({ email, password,username }))
          setEmail('')
          setPassword('')
          setUsername('')
      } catch (error) {
          console.log(error)
          setErrorMessage('Wystąpił błąd podczas rejestracji.');
      }
  }

    return (
      <div className={styles.bodyBlock}>
        <div className={styles.oval}></div>
  
        <div className={styles.centeredСontent}>
          <h1 className={styles.registrationTitle}>Rejestracja</h1>
  
          <form className={styles.form}>
            <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </form>
          <form className={styles.form}>
            <input type="password" id="password" name="password" placeholder="Hasło"  value={password} onChange={(e) => setPassword(e.target.value)}/>
          </form>
          <form className={styles.form}>
            <input type="pseudonym" id="pseudonym" name="pseudonym" placeholder="Wymyśl pseudonim" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </form>
  
          <div className={styles.termsAndConditions}>
          <p>
            Kontynuując zgadzasz się na nasze{' '}
            <span className={`${styles.whiteText} ${styles.grayText}`}>
              Zasady i warunki
            </span>
          </p>
          </div>
           <div className={styles.contentDown}>
          <Link to="/logging" className={styles.nextButton} onClick={handleSubmit}>Dalej</Link>
  
          <div className={styles.lines}>
                 <div className={styles.line}></div>
                <span className={styles.or}>LUB</span>
                <div className={styles.line}></div>
         </div>
 

  
          <div className={styles.logoImages}>
            <img src={facebook} alt="Facebook" />
            <img src={google} alt="Google" />
            <img src={twitter} alt="Twitter" />
          </div>
  
          <div className={styles.terms}>
            <p>
              Posiadasz już konto?      
              <Link to="/logging" className={`${styles.whiteText} ${styles.grayText}`}> Zaloguj się </Link>

            </p></div>
          </div>
        </div>
      </div>
    );
  }


export default Registration;
