import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Login from "./component/auth/Login";
import TestPage from "./component/test-page/TestPage";
import ResultPage from "./component/result-page/ResultPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([{"category":"physics","question":"viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac","options":[{"id":9285,"value":"Tetracerus quadricornis"},{"id":931,"value":"Halcyon smyrnesis"},{"id":9868,"value":"Dendrohyrax brucel"},{"id":1222,"value":"Sciurus niger"}],"correct_option":931},
    {"category":"physics","question":"luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet","options":[{"id":3745,"value":"Macaca radiata"},{"id":7262,"value":"Uraeginthus angolensis"},{"id":2601,"value":"Branta canadensis"},{"id":2010,"value":"Sylvicapra grimma"}],"correct_option":2010}]);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState("");

  const handleLogin = (selectedCategory) => {
    setIsLoggedIn(true);
    setCategory(selectedCategory);
  };

  const handleTestCompletion = (userAnswers, userNotes) => {
    setIsTestCompleted(true);
    setAnswers(userAnswers);
    setNotes(userNotes);
  };

  useEffect(() => {
    console.log("useEffect: ", { isLoggedIn, category });
    if (isLoggedIn && category) {
      axios
        .get("/sampleData.json")
        .then((response) => {
          const filteredQuestions = response.data.filter(
            (question) => question.category === category
          );
          setQuestions(filteredQuestions);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [isLoggedIn, category]);

  useEffect(() => {
    console.log("State updated: ", { isLoggedIn, category });
  }, [isLoggedIn, category]);

  console.log("Render: ", { isLoggedIn, category });

  return (
    <div className="App">
      {isLoggedIn ? (
        isTestCompleted ? (
          <ResultPage questions={questions} answers={answers} notes={notes} />
        ) : (
          <TestPage questions={questions} onComplete={handleTestCompletion} />
        )
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
