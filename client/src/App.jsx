import React, { useState } from "react";
import TechHubBooking from "./components/TechHubBooking";
import LoginComponent from "./components/LoginComponent";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <TechHubBooking />
      ) : (
        <LoginComponent onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
