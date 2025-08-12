import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

import Login from "./Login";
import Register from "./Register";
import Quiz from "./QuizOLD"; 
import Home from "./home";
import DatabaseQuiz from "./DatabaseQuiz";

function App() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [view, setView] = useState('login');

  const API_URL = 'http://localhost:5001/api/items';

  useEffect(() => {
    const loginCookie = Cookies.get("loggedIn");
    if (loginCookie === "true"){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  },[]);

  useEffect(() => {
    // Only fetch items if the user is logged in
    if (isLoggedIn) {
      const fetchItems = async () => {
        setLoading(true); // Set loading to true before the fetch
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setItems(data); // Update state with fetched data
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false); // Set loading to false after the fetch
        }
      };

      fetchItems();
    } else {
      // If user logs out, clear the items
      setItems([]);
    }
  }, [isLoggedIn]); // This effect runs whenever isLoggedIn changes

  const handleLogin = () => {
    setIsLoggedIn(true);

  Cookies.set("loggedIn","true", {expires: 1 }); // 1 day / 48 = cookie is active for 30 mins
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("loggedIn");
  };

  if (isLoggedIn) {
    return quizStarted ? (
      <DatabaseQuiz onQuizEnd={() => setQuizStarted(false)} />
    ) : (
      <Home 
            onStartQuiz={() => setQuizStarted(true)}
            onLogout={handleLogout}
            items={items}
            loading={loading}
            error={error}
            />
    )
  }

  return (
      <>
        {view === 'login' ? (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setView('login')} />
        )}
      </>
    );
  }

export default App;
