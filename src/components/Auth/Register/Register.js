import React, { useState } from 'react';
import styles from "./Register.module.css";
import { useAuth } from '../../../context/AuthContext';
import ButtonComponent from '../../Common/Button/ButtonComponent';
import { register } from '../../../services/api/register';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Common/Loader/Loader';

const Register = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailEror, setEmailerror] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loader, setLoader] = useState(false);
  const { user, login, logout } = useAuth();

  const handleSignup = async (e) => {
    setLoader(true);
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    if (!isValid) {
      setEmailerror("Your email is incorrect.");
      setLoader(false);
      // setLoader(false);
      return;
    };

    if(!isPasswordValid) {
      setPasswordError(
        "Password must contain minimum eight characters, at least one letter, one number and one special character:"
      );
      setLoader(false);
      return;
    }
      const userData = await register(email, password); // Replace 'api' with your actual API service
      // login(userData); // Update user state in the
      if(userData.message === 'User registered successfully') {
        Navigate('/login');
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
          <ButtonComponent type="submit">Signup</ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default Register;
