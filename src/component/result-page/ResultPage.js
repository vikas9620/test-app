import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

const ResultPage = ({ questions, answers, notes }) => {
  const correctAnswers = questions.filter(
    (question, index) => answers[index] === question.correct_option
  ).length;

  const totalQuestions = questions.length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;

  const data = {
    labels: ["Correct Answers", "Wrong Answers"],
    datasets: [
      {
        label: "Results",
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ["#4CAF50", "#FF6384"],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    window.onpopstate = () => {
      window.history.go(1);
    };
  }, []);

  return (
    <div className="result-page">
      <h2>Results</h2>
      <Bar data={data} options={options} />
      <p>Total Score: {scorePercentage.toFixed(2)}%</p>
      <div>
        <h3>Scribbled Notes</h3>
        <p>{notes}</p>
      </div>
    </div>
  );
};

export default ResultPage;
