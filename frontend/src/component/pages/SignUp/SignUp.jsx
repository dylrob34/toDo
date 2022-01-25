import React, { useState } from "react";
import { post } from "../../../tools/request";
import { login } from "../../../context/loggedInState";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [validEmail, setValidEmail] = useState(true);



  const handleFNameChange = (e) => {
    setFirst(e.target.value);
  };
  const handleLNameChange = (e) => {
    setLast(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleValidPassword = (e) => {
    if (e.target.value !== password) {
      setPasswordError("The passwords do not match, please try again.");
    } else {
      setPasswordError("");
      console.log("Passwords Match");
    }
    setCheck(e.target.value);
  };

  const validateEmail = () => {
    if (email.includes("@")) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }
  };

  const submitSignUp = (e) => {
    e.preventDefault();

    if (validateEmail() === true) {
      console.log("No email errors");
      setValidEmail(true);
      setEmail("");
    }
    post("/api/user/createUser", {
      firstName: first,
      lastName: last,
      email,
      password,
      passCheck: check,
    }).then((resJson) => {
      if (resJson.loggedIn === true) {
        login(resJson.token);
        setRedirect(true);
      } else {
        console.log("Error Creating User");
      }
    });
  };

  if (redirect === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main-auth">
      <div className="auth-panel">
        <div className="auth-content">
          <div className="auth-element">
            <div>
              <h1>Welcome to Blockz</h1>
              <p> Build your productive life, one block at a time.</p>
            </div>
          </div>

          <div className="auth-element">
            <form name="SignUp">
              <div className="form-inner">
                <div className="form-group">
                  <div className="form-element">
                    <label htmlFor="text" className="auth-label">
                      FIRST NAME:
                    </label>
                    <input
                      type="text"
                      className="auth-input"
                      onChange={handleFNameChange}
                    />
                  </div>
                  <div className="form-element">
                    <label htmlFor="text" className="auth-label">
                      LAST NAME:
                    </label>
                    <input
                      type="text"
                      className="auth-input"
                      onChange={handleLNameChange}
                    />
                  </div>
                </div>
                <div className="form-element">
                  <label htmlFor="email" className="auth-label">
                    EMAIL:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="auth-input"
                    onChange={handleEmailChange}
                  />
                  {validEmail ? null : <div style={{color:"rgb(214, 49, 49)", fontSize:".75rem"}}>Please enter a valid email.</div>}
                </div>
                <div className="form-element">
                  <label htmlFor="email" className="auth-label">
                    PASSWORD:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="auth-input"
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-element">
                  <label htmlFor="email" className="auth-label">
                    CONFIRM PASSWORD:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="auth-input"
                    onChange={handleValidPassword}
                  />
                  <div style={{color:"rgb(214, 49, 49)"}}>{passwordError}</div>
                </div>
                <div className="form-item">
                  <input className="btn-lg" type="submit" value="Sign Up" onClick={submitSignUp}></input>
                </div>
                <Link className="btn-text" to="/login">
                  Already have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
