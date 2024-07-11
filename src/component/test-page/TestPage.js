import React, { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';

const TestPage = ({ questions, onComplete }) => {
  const maxQuestions = 10;
  const limitedQuestions = questions.slice(0, maxQuestions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [notes, setNotes] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [showResult, setShowResult] = useState(false);

 
  const [answeredQuestions, setAnsweredQuestions] = useState({});

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

    setAnsweredQuestions({
      ...answeredQuestions,
      [currentQuestionIndex]: true,
    });
  };

  const handleCompletion = () => {
    onComplete(userAnswers, notes);
    setShowResult(true); 
  };

  const currentQuestion = limitedQuestions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < limitedQuestions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

 

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-2/3 p-6 bg-gray-100 flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            Timer: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </h2>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Question {currentQuestionIndex + 1}/10</h2>
          <p className="text-lg">{currentQuestion.question}</p>
        </div>
        <ul className="mb-4">
          {currentQuestion.options.map((option) => (
            <li key={option.id} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="answer"
                  checked={userAnswer === option.id}
                  onChange={() => handleAnswerChange(option.id)}
                  className="mr-2"
                />
                {option.value}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={handlePreviousQuestion}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${
              currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            Previous
          </button>
          <button
            disabled={currentQuestionIndex === limitedQuestions.length - 1}
            onClick={handleNextQuestion}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${
              currentQuestionIndex === limitedQuestions.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            Next
          </button>
          <button
            onClick={handleCompletion}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="lg:w-1/3 p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-300 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Notepad</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded resize-none"
          placeholder="Write your notes here..."
        ></textarea>
      </div>
    </div>
  );
};

export default TestPage;
