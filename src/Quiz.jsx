import { useState } from "react";
import "./Quiz.css";
import Questions from "./Questions";
import QuizTimer from "./QuizTimer";
import allquestions from "./questionset";

function Quiz({ onQuizEnd }) {
  const [questions, setQuestions] = useState(
    shuffleQuestions(allquestions).slice(0, 30)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const end = currentQuestionIndex >= questions.length;
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(
    Array(questions.length).fill(null)
  );
  const [isSubmitted, setisSubmitted] = useState(false);
  const [userAnswer, setUserAnswer] = useState([]);

  function handleAnswer(option) {
    const updatedSelectedOption = [...selectedOption];
    updatedSelectedOption[currentQuestionIndex] = option;
    setSelectedOption(updatedSelectedOption);

    const updatedAnswer = [...userAnswer];
    updatedAnswer[currentQuestionIndex] = {
      question: questions[currentQuestionIndex].question,
      userAnswer: option,
      correctAnswer: questions[currentQuestionIndex].correct,
    };
    setUserAnswer(updatedAnswer);
  }

  function handleSubmit() {
    let scr = 0;
    selectedOption.forEach((option, i) => {
      if (option === questions[i].correct) {
        scr++;
      }
    });
    setScore(scr);
    setisSubmitted(true);
  }

  function shuffleQuestions(allquestions) {
    const newQ = [...allquestions];
    for (let i = newQ.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newQ[i], newQ[j]] = [newQ[j], newQ[i]];
    }
    return newQ;
  }
  const handleTimeUp = () => {
    alert("Time's up!!!");
    let scr = 0;
    selectedOption.forEach((option, i) => {
      if (option === questions[i].correct) {
        scr++;
      }
    });
    setScore(scr);
    setisSubmitted(true);
  };

  return (
    <>
      <div>
        <h1 className="ass">
          <center>Quiz</center>
        </h1>
      </div>
      {!isSubmitted ? (
        <>
          <QuizTimer totalTime={1200} onTimeUp={handleTimeUp} />
          <div className="container">
            <Questions
              question={questions[currentQuestionIndex].question}
              qNum={currentQuestionIndex + 1}
              options={questions[currentQuestionIndex].options}
              selectedOption={selectedOption[currentQuestionIndex]}
              onOptionSelect={handleAnswer}
            />
            {/* back button */}
            {currentQuestionIndex > 0 && (
              <button
                className="back"
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                  }
                }}
              >
                BACK
              </button>
            )}
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
              </button>
            ) : (
              <button className="submit" onClick={handleSubmit}>
                SUBMIT
              </button>
            )}
          </div>
        </>
      ) : (
        <div>
          <div className="final">
            <h2>Quiz Completed!</h2>
            <p>
              Total Score : {score}/{questions.length}
            </p>
          </div>
          <h3 className="review">Review Your Answers:</h3>
          <div className="result-el">
            {questions.map((q, i) => {
              const ans = userAnswer[i];
              return (
                <div key={i} className="result-item">
                  <strong>
                    Q{i + 1}: {q.question}
                  </strong>
                  <br />
                  <span>
                    <b>Your Answer:</b>{" "}
                    <span
                      style={{
                        color:
                          ans && ans.userAnswer === q.correct
                            ? "limegreen"
                            : "red",
                      }}
                    >
                      {ans && ans.userAnswer ? (
                        ans.userAnswer
                      ) : (
                        <em>Not answered</em>
                      )}
                    </span>
                  </span>
                  <br />
                  <span>
                    <b>Correct Answer:</b> <span>{q.correct}</span>
                  </span>
                </div>
              );
            })}
          </div>
          
          <button className="home-el" onClick={onQuizEnd}>
            Back to home
          </button>
        </div>
      )}
    </>
  );
}

export default Quiz;
