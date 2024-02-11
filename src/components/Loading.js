import React from "react";
import logo from "../assets/img/logo-moulin-casta.png";
const Loading = () => {
  return (
    <div className="loading">
      <div>
        <img src={logo} />
        <div className="dots-container">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
