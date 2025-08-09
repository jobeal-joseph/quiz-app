import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Login from "./components/Login/Login";
import Quiz from "./components/Quiz/Quiz"; 


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // Checking for existing cookie on first load
  useEffect(() => {
    const loginCookie = Cookies.get("loggedIn");
    if (loginCookie === "true"){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  },[]);

  const handleLogin = () => {
    setIsLoggedIn(true);

    Cookies.set("loggedIn","true", {expires: 1 / 48}); // 1 day / 48 = cookie is active for 30 mins
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("loggedIn");
  };

  if (isLoggedIn === null){
    return <div>Loading...</div>;
  }
  return isLoggedIn ? (
        <Quiz onLogout={handleLogout}/>
      ) : (
        <Login onLogin={handleLogin} />
      );
}

export default App;
