import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // ✅ 1. Import Cookies
import Login from './Login';
import Register from './Register';
import Home from './home';
import DatabaseQuiz from './DatabaseQuiz';
import UserDetails from './UserDetails';

function App() {
  const [user, setUser] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const [view, setView] = useState('login'); // 'login' or 'register'
  const [userName, setUserName] = useState("");


  // ✅ 2. Check for cookie on initial load
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      // If a cookie is found, parse it and set the user state
      setUser(JSON.parse(userCookie));
    }
  }, []); // Empty dependency array makes this run only once


  const handleLogin = (loggedInUser) => {
    // ✅ 3. Save user object to cookie on login
    // The cookie will expire in 1 day.
    Cookies.set('user', JSON.stringify(loggedInUser), { expires: 1 });
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    // ✅ 4. Remove cookie on logout
    Cookies.remove('user');
    setUser(null);
    setQuizStarted(false);
  };

  const handleDetailsSubmit = (updatedUserData) => {
    // Also update the cookie when user details change
    Cookies.set('user', JSON.stringify(updatedUserData), { expires: 1 });
    setUser(updatedUserData);
    setUserName(updatedUserData.name); // Update userName if available
  };

  // --- Main Render Logic (remains the same) ---

  if (user) {
    if (!user.detailsSubmitted) {
      return <UserDetails user={user} onDetailsSubmit={handleDetailsSubmit} />;
    }

    return quizStarted ? (
      <DatabaseQuiz user={user} onQuizEnd={() => setQuizStarted(false)} />
    ) : (
      <Home userName={userName} user={user} onStartQuiz={() => setQuizStarted(true)} onLogout={handleLogout} />
    );
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