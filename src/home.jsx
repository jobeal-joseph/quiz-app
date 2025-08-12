import React, { useState, useEffect } from "react";
import "./home.css";



function Home({ user, onStartQuiz, onLogout, items, loading, error }) {

// ✅ 1. Add 'user' to the list of props being received


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [userResult, setUserResult] = useState(null);
  // ✅ 2. Set initial loading state to true
  const [isLoading, setIsLoading] = useState(true);

  // This guard clause prevents the rest of the code from running if 'user' isn't available yet.
  if (!user) {
    return <p>Loading user data...</p>;
  }

  useEffect(() => {
    const checkQuizStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/results/${user.id}`);
        const data = await response.json();
        setQuizAttempted(data.hasAttempted);
        if (data.hasAttempted) {
          setUserResult(data.result);
        }
      } catch (err) {
        console.error("Error checking quiz status:", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkQuizStatus();
  }, [user]);

  if (isLoading) {
    return <p>Checking quiz status...</p>;
  }

  return (
    <>
      <header className="home-appbar">
        <img src="/quizapplogo.png" alt="Quiz Logo" className="home-appbar-logo" />
        <span className="home-appbar-title">Quiz App</span>
        <button
          className="home-appbar-menu"
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label="Open menu"
        >
          &#9776;
        </button>
      </header>

      {/* Drawer */}
      <nav className={`home-drawer${drawerOpen ? " open" : ""}`}>
        <button className="home-drawer-close" onClick={() => setDrawerOpen(false)}>
          &times;
        </button>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Leaderboard</a></li>
          <li><a href="#">About</a></li>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </ul>
      </nav>

      <h2 className="home-welocme">Welcome, {user.name}!</h2>


      {/* Main Content */}

      <div className="home-container">
        <h1 className="home-title">MP & MC</h1>
        {/* ✅ 3. Conditionally render based on whether the quiz has been attempted */}
        {quizAttempted ? (
          <div className="result-display">
            <h3>Quiz Completed</h3>
            <p>Score: {userResult.score} / {userResult.total}</p>
          </div>
        ) : (
          <button className="home-btn" onClick={onStartQuiz}>START QUIZ</button>
        )}
      </div>

      <div className="home-container">
        <h1 className="home-title">SYSTEM SOFTWARE</h1>
        <button className="soon-btn">COMING SOON</button>
      </div>
      
      <div className="home-container">
        <div className="home-how">
          <h3>How It Works</h3>
          <ul>
            <li>Choose a quiz and start answering questions.</li>
            <li>The quiz must be completed within the given time limit.</li>
            <li>See your score and review answers at the end!</li>
          </ul>
        </div>
      </div>
      
      <footer className="home-footer">
        &copy; Niredxel Corp. All rights reserved.
      </footer>
    </>
  );
}

export default Home;