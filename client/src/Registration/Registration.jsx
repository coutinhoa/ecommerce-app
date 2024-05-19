import React, { useState } from "react";
import zalandoLogo from "../images/Zalando_logo.svg";
import "./Registration.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: 'USER'
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password' && value.length < 8) {
      setPasswordError('Dein Passwort muss mindestens 8 Zeichen lang sein');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setPasswordError('Dein Passwort muss mindestens 8 Zeichen lang sein');
      return;
    }

    try {
      const response = await fetch('http://localhost:8092/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success('Registration successful!');
        setFormData({  // Clear form fields after successful registration
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          role: 'USER'
        });
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="header">
        <span>
          <Link to="/">
            <img src={zalandoLogo} className="logo-zal" alt="logo" />
          </Link>
        </span>
        <span>
          <i className="bi bi-globe"></i> Deutsch
        </span>
      </div>
      <div className="registration-container">
        <h1>Ich bin neuer hier</h1>
        <form onSubmit={handleSubmitRegister} className="registration-form">
          <div className="form">
            <label htmlFor="lastName" className="label">Nachname</label>
            <div className="input-text">
              <div>
                <i className="bi bi-person"></i>
              </div>
              <input
                id="lastName"
                name="lastName"
                className="login-data"
                type="text"
                placeholder="Nachname"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form">
            <label htmlFor="firstName" className="label">Vorname</label>
            <div className="input-text">
              <div>
                <i className="bi bi-person"></i>
              </div>
              <input
                id="firstName"
                name="firstName"
                className="login-data"
                type="text"
                placeholder="Vorname"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form">
            <label htmlFor="username" className="label">Benutzername</label>
            <div className="input-text">
              <div>
                <i className="bi bi-person"></i>
              </div>
              <input
                id="username"
                name="username"
                className="login-data"
                type="text"
                placeholder="Benutzername"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form">
            <label htmlFor="password" className="label">Passwort</label>
            <div className="input-text">
              <div>
                <i className="bi bi-lock"></i>
              </div>
              <input
                id="password"
                name="password"
                className="login-data"
                type="password"
                placeholder="Passwort"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" className="register-button">Registrieren</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
