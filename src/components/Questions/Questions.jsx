import { useState } from "react";
import "../Quiz/Quiz.css";

function Questions(props) {
  return (
    <div className="ques">
      <h2>{props.question}</h2>
      <div className="op">
        {props.options.map((option, index) => (
          <button
            className={option === props.selectedOption ? "el-option" : "un-option"}
           
            key={index}
            onClick={() => props.onOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Questions;
