import React, { useState } from 'react';
import styles from "./Login.module.css";
import { useAuth } from '../../../context/AuthContext';
import ButtonComponent from '../../Common/Button/ButtonComponent';
import { loginapi } from '../../../services/api/login';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Common/Loader/Loader';

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailEror, setEmailerror] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loader, setLoader] = useState(false);
  const { login } = useAuth();

  const handleSignup = async (e) => {
    setLoader(true);
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid) {
      setEmailerror("Your email is incorrect.");
      setLoader(false);
      // setLoader(false);
      return;
    };
      const userData = await loginapi(email, password); // Replace 'api' with your actual API service
      // login(userData); // Update user state in the
      // console.log(userData, 'userDAta');
      login({token: userData.token, userId: userData.userId});
      if(userData.token) {
        Navigate('/');
      }
      setPasswordError(userData.error);
      setLoader(false);
  };

  

  return (
    <div className={styles.container}>
      {loader && <Loader />}
      <form className={styles.form} onSubmit={handleSignup}>
        <label className={styles.label}>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            onClick={() => setEmailerror('')}
          />
          {emailEror && <p className={styles.errorMessage}>{emailEror}*</p>}
        </label>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            onClick={() => setPasswordError('')}
          />
          {passwordError && <p className={styles.errorMessage}>{passwordError}*</p>}
        </label>
        <div className={styles.buttonContainer}>
          <ButtonComponent type="submit">Login</ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default Login;
