import React, { useState } from "react";
import { post } from "../../../tools/request";
import { login } from "../../../context/loggedInState";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");

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

  const handleCheckPassword = (e) => {
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
      return true;
    } else {
      setCheckEmail("invalid email");
      return false;
    }
  };

  const submitSignUp = (e) => {
    e.preventDefault();

    if (validateEmail() === true) {
      console.log("No email errors");
      setCheckEmail("");
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
          {passwordError !== "" ? (
            <div className="error">{passwordError}</div>
          ) : (
            ""
          )}

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
                <div className="form-item">
                  <input className="btn-lg" type="submit" value="LOGIN"></input>
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

export default SignUp;
