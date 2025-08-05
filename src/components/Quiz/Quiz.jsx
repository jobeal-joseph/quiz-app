import { useState } from "react";
import "./Quiz.css";
import Questions from "../Questions/Questions";

function Quiz() {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Rome", "Berlin", "London"],
      correct: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: "4",
    },
    {
      question: "Which language is used in React?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correct: "JavaScript",
    },
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const end = currentQuestionIndex >= questions.length;
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(
    Array(questions.length).fill(null)
  );
  const [isSubmitted, setisSubmitted] = useState(false);

  function handleAnswer(option) {
    const updatedSelectedOption = [...selectedOption];
    updatedSelectedOption[currentQuestionIndex] = option;
    setSelectedOption(updatedSelectedOption);
  }

  function handleSubmit() {
    let scr = 0;
    selectedOption.forEach((option, i)=>{
      if(option === questions[i].correct){
        scr++;
      }
    })
    setScore(scr);
    setisSubmitted(true);
  }

  return (
    <>
      <div>
        <h1 className="ass">
          <center>Quiz</center>
        </h1>
      </div>
      {!isSubmitted ? (
        <>
          <div className="container">
            <Questions
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              selectedOption={selectedOption[currentQuestionIndex]}
              onOptionSelect={handleAnswer}
            />
            {/* back button */}
            { currentQuestionIndex > 0 &&(
            <button
              className="back"
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                }
              }}
            >
              BACK
            </button>)}
            {/* next or submit */}
            {currentQuestionIndex < questions.length - 1 ? (
            <button
              className="next"
              onClick={() => {
                if (currentQuestionIndex < questions.length - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
              }}
            >
              NEXT
            </button>)
            :(
              <button className="submit" onClick={handleSubmit}>SUBMIT</button>
            )}
            
          </div>
        </>
      ) : (
        <div className="final">
          <h2 >Quiz Completed!</h2>
          <p>
            Total Score : {score}/{questions.length}
          </p>
        </div>
      )}
    </>
  );
}

export default Quiz;
