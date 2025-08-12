// src/DatabaseQuiz.jsx
import { useState, useEffect } from 'react';
import QuizUI from './QuizUI';

function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function DatabaseQuiz({ onQuizEnd }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions?limit=20', {
          cache: 'no-cache', 
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }

        const data = await response.json();

        // ✅ Check if the database returned any questions
        if (data.length === 0) {
          throw new Error("No questions found in the database. Please add some questions.");
        }

        // This will work correctly for any number of questions (1, 5, 20, etc.)
        setQuestions(shuffle(data));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []); // Empty array ensures this runs only once

  // The render logic remains the same
  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>Loading questions...</p>;
  }

  // This will now catch both fetch errors and the "No questions found" error
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>An Error Occurred</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  // This will only render if questions were successfully loaded
  return <QuizUI questions={questions} onQuizEnd={onQuizEnd} />;
}

export default DatabaseQuiz;