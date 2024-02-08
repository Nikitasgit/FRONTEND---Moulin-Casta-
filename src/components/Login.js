import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import xMark from "../assets/icons/circle-xmark.png";
import {
  changeLoginModalState,
  changeLoginStatus,
  changeViewMode,
} from "../feature/loginSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginClick = () => {
    axios
      .post("http://localhost:3010/auth/login", { email, password })
      .then((res) => {
        let token = res.data.token;
        localStorage.setItem("SavedToken", "Bearer " + token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        dispatch(changeLoginStatus());
        dispatch(changeLoginModalState(false));
        dispatch(changeViewMode(false));
      })
      .catch((error) => {
        if (error.response) {
          setError("mot de passe ou email invalide");
        } else if (error.request) {
          setError("No response from server");
        }
      });
  };

  return (
    <div className="login">
      <img
        src={xMark}
        className="close-modal"
        onClick={() => {
          dispatch(changeLoginModalState(false));
        }}
      />
      <h4>Connection</h4>
      <div className="inputs-login">
        <div className="email-login">
          <label>Email:</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="password-login">
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="btn-edit" onClick={() => handleLoginClick()}>
        Se connecter
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;
