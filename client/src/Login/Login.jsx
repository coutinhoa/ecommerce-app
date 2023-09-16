import React, { useState } from "react";
import zalandoLogo from "../images/Zalando_logo.svg";
import "./Login.css";
import { Link } from "react-router-dom";
import zalando from "../images/Zalando.png";

function Login() {
  const [showPass, setShowPass] = useState(false);

  /*const eyeIconClick = () => {
  setShowPass((prevPass) => !prevPass); //it's the previuos value of showPass 
  }; event is onClick={eyeIconClick}*/

  const handleFormSubmit = () => {
    console.log("form is submitted");
  };

  return (
    <div className="login-page">
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
            <form onSubmit={handleFormSubmit}>
              <div className="form">
                <label htmlFor="email" className="label">
                  E-Mail-Adresse
                </label>
                <div className="input-text">
                  <div>
                    <i className="bi bi-envelope"></i>
                  </div>
                  <input
                    id="email"
                    className="login-data"
                    type="email"
                    placeholder="E-Mail Adresse"
                    required
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="pass" className="label">
                  Passwort
                </label>
                <div className="input-text">
                  <div id="hidden password">
                    <i className="bi bi-file-lock"></i>
                  </div>
                  <input
                    id="pass"
                    className="login-data"
                    type={showPass ? "text" : "password"}
                    placeholder="Passwort"
                    minLength="7"
                    maxLength="25"
                    required
                  ></input>
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
                <Link
                  className="cart-link"
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/admin-view`}
                >
                  <button type="submit" className="submit-button">
                    Anmelden
                  </button>
                </Link>
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
          <div>
            <h2>Ich bin neu hier</h2>
          </div>
          <div>
            <button className="register">Registrieren</button>
          </div>
        </div>
      </section>{" "}
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
}

export default Login;
