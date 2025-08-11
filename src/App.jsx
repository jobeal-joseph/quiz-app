import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

import Login from "./Login";
import Quiz from "./Quiz"; 
import Home from "./home";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

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

  Cookies.set("loggedIn","true", {expires: 1 }); // 1 day / 48 = cookie is active for 30 mins
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("loggedIn");
  };

  

  return (
    <>
      {isLoggedIn ? (
        quizStarted ? (
          <Quiz 
            onQuizEnd={() => setQuizStarted(false)} 
          />
        ) : (
          <Home 
            onStartQuiz={() => setQuizStarted(true)}
            onLogout={handleLogout}
            />
        )
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
