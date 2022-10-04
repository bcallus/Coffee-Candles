import React from "react";
import { useNavigate } from "react-router-dom";
import "./logout.css"

const Logout = ({ setIsLoggedIn, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    alert("You have successfully been logged out.");
    navigate("/");
  };

  return (
      <div className="title">
          <p>Thank you for visiting Coffe & Tea.</p>
          <p>Come back soon!</p>
      <button className="logout-button" onClick={handleLogout}>
        Click here to log out.
      </button>
    </div>
  );
};

export default Logout;