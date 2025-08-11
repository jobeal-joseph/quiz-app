import React, { useState } from "react";
import "./home.css";

function Home({ onStartQuiz }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="home-appbar">
       
        <img src="\quizapplogo.png" alt="Quiz Logo" className="home-appbar-logo" />
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
        </ul>
      </nav>

      <div className="home-container">
        <h1 className="home-title">MP & MC</h1>
        <button className="home-btn" onClick={onStartQuiz}>START QUIZ</button>
      </div>
      <div className="home-container">
        <h1 className="home-title">SYSTEM SOFTWARE</h1>
        <button className="soon-btn" >COMING SOON</button>
      </div>
      <div className="home-container">
        <div className="home-how">
          <h3>How It Works</h3>
          <ul>
            <li>Choose a quiz and start answering questions.</li>
            <li>The quiz must be completed within the given time limit</li>
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