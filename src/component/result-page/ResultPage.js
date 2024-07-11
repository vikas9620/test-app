import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import 'tailwindcss/tailwind.css';

const ResultPage = ({ questions, answers, notes }) => {
  const correctAnswers = questions.filter(
    (question, index) => answers[index] === question.correct_option
  ).length;

  const totalQuestions = questions.length;
  const wrongAnswers = questions.filter(
    (question, index) => answers[index] && answers[index] !== question.correct_option
  ).length;
  
  const skippedAnswers = totalQuestions - (correctAnswers + wrongAnswers);
  const scorePercentage = (correctAnswers / totalQuestions) * 100;

  const data = {
    labels: ["Correct Answers", "Wrong Answers", "Skipped Questions"],
    datasets: [
      {
        label: "Results",
        data: [correctAnswers, wrongAnswers, skippedAnswers],
        backgroundColor: ["#4CAF50", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  useEffect(() => {
    window.onpopstate = () => {
      window.history.go(1);
    };
  }, []);

  return (
    <div className="result-page p-4 lg:p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <div className="w-full lg:w-1/2" style={{ height: '300px' }}>
        <Doughnut data={data} options={options} />
      </div>
      <p className="mt-4 text-lg">Total Score: {scorePercentage.toFixed(2)}%</p>
      <div className="mt-6 w-full lg:w-1/2">
        <h3 className="text-xl font-bold mb-2">Scribbled Notes</h3>
        <p className="p-2 bg-gray-100 border rounded">{notes}</p>
      </div>
    </div>
  );
};

export default ResultPage;
