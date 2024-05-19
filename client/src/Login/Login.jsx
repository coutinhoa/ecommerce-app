import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import zalandoLogo from "../images/Zalando_logo.svg";
import "./Login.css";
import { Link } from "react-router-dom";
import zalando from "../images/Zalando.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8092/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const responseBody = await response.json();
        localStorage.setItem("token", responseBody.token);
        toast.success('You are logged in!');
        setUsername('');
        setPassword('');
        navigate('/');
        console.log(localStorage);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="header">
        <span>
          <Link to={`/`}>
            <img src={zalandoLogo} className="logo-zal" alt="logo" />
          </Link>
        </span>
        <span>
          <i className="bi bi-globe"></i> Deutsch
        </span>
      </div>
      <div>
        <div className="body-login">
          <div>
            <h2>Willkommen zurück</h2>
          </div>
          <div>
            <form onSubmit={handleSubmitLogin}>
              <div className="form">
                <label htmlFor="username" className="label">
                  Benutzername
                </label>
                <div className="input-text">
                  <div>
                    <i className="bi bi-envelope"></i>
                  </div>
                  <input
                    id="username"
                    name="username"
                    className="login-data"
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={handleChangeUsername}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pass" className="label">
                  Passwort
                </label>
                <div className="input-text">
                  <div>
                    <i className="bi bi-file-lock"></i>
                  </div>
                  <input
                    id="pass"
                    name="password"
                    className="login-data"
                    type={showPass ? "text" : "password"}
                    placeholder="Passwort"
                    value={password}
                    onChange={handleChangePassword}
                    minLength="7"
                    maxLength="25"
                    required
                  />
                  <div>
                    <span
                      className="pass-button"
                      onMouseDown={() => setShowPass(true)}
                      onMouseUp={() => setShowPass(false)}
                    >
                      {showPass ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </span>
                  </div>
                </div>
                <button type="submit" className="submit-button">
                  Anmelden
                </button>
              </div>
            </form>
            <div className="forget-pass">
              <p>Passwort vergessen?</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-line"></div>
      <section className="new">
        <div>
          <h2>Ich bin neu hier</h2>
          <nav>
            <Link to="/registration">
              <button className="register">Registrieren</button>
            </Link>
          </nav>
        </div>
      </section>
      <footer>
        <ul className="footer">
          <li>Datenschutz</li>
          <li>Nutzungsbedingungen</li>
          <li>Impressum</li>
        </ul>
        <div className="logo-container">
          <Link to={`/`}>
            <img src={zalando} className="logo-triangle" alt="zal-logo" />
          </Link>
        </div>
      </footer>
    </div>
  );
};


