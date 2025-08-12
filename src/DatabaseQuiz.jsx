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

// ✅ 1. Add 'user' to the list of props
function DatabaseQuiz({ user, onQuizEnd }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveResult = async (score, totalQuestions) => {
    try {
      // ✅ 2. Declare 'response' with 'const'
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name: user.name,
          rollno: user.rollno,
          score: score,
          total: totalQuestions,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to save result:', errorData.message);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/questions?limit=20`, {
          cache: 'no-cache',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length === 0) {
          throw new Error("No questions found in the database. Please add some questions.");
        }

        setQuestions(shuffle(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>Loading questions...</p>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>An Error Occurred</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return <QuizUI questions={questions} onQuizEnd={onQuizEnd} onSaveResult={saveResult} />;
}

export default DatabaseQuiz;