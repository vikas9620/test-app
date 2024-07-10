import React, { useState, useEffect } from "react";

const TestPage = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [notes, setNotes] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleCompletion();
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (optionId) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: optionId,
    });
  };

  const handleCompletion = () => {
    onComplete(userAnswers, notes);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="test-page">
      <div className="left-section">
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{currentQuestion.question}</p>
        <ul>
          {currentQuestion.options.map((option) => (
            <li key={option.id}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  checked={userAnswer === option.id}
                  onChange={() => handleAnswerChange(option.id)}
                />
                {option.value}
              </label>
            </li>
          ))}
        </ul>
        <div>
          <button
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          >
            Previous
          </button>
          <button
            disabled={currentQuestionIndex === questions.length - 1}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          >
            Next
          </button>
          <button onClick={handleCompletion}>Submit</button>
        </div>
      </div>
      <div className="right-section">
        <h2>Notepad</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <h2>Timer: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</h2>
      </div>
    </div>
  );
};

export default TestPage;
