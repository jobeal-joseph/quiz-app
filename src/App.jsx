import { useState } from "react";
import Login from "./components/Login/Login";
import Quiz from "./components/Quiz/Quiz"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Quiz />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
