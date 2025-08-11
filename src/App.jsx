import { useState } from "react";
import Login from "./Login";
import Quiz from "./Quiz"; 
import Home from "./home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        quizStarted ? (
          <Quiz 
            onQuizEnd={() => setQuizStarted(false)} 
          />
        ) : (
          <Home 
            onStartQuiz={() => setQuizStarted(true)}/>
        )
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
