import { useState } from 'react';
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

  // This function now receives the user object from the Login component
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setQuizStarted(false);
  };

  // This is called from UserDetails after a successful update
  const handleDetailsSubmit = (updatedUserData) => {
    setUser(updatedUserData);
    setUserName(updatedUserData.name); // Update userName if available
  };

  // --- Main Render Logic ---

  // 1. If a user object exists, they are logged in.
  if (user) {
    // 1a. If they haven't submitted their details yet, show the details form.
    if (!user.detailsSubmitted) {
      return <UserDetails user={user} onDetailsSubmit={handleDetailsSubmit} />;
    }

    // 1b. If details are submitted, show either the Quiz or the Home page.
    return quizStarted ? (
      <DatabaseQuiz onQuizEnd={() => setQuizStarted(false)} />
    ) : (
      <Home userName={userName} user={user} onStartQuiz={() => setQuizStarted(true)} onLogout={handleLogout} />
    );
  }

  // 2. If no user object exists, they are logged out. Show Login or Register page.
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