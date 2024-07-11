import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import 'tailwindcss/tailwind.css';

const ResultPage = ({ questions, answers, notes }) => {
  const correctAnswers = questions.filter(
    (question, index) => answers[index] === question.correct_option
  ).length;

  const totalQuestions = 10;
  const wrongAnswers = questions.filter(
    (question, index) => answers[index] && answers[index] !== question.correct_option
  ).length;
  
  const skippedAnswers = totalQuestions - (correctAnswers + wrongAnswers);
  const scorePercentage = (correctAnswers / totalQuestions) * 100;

  const overallData = {
    labels: ["Correct Answers", "Wrong Answers", "Skipped Questions"],
    datasets: [
      {
        label: "Overall Results",
        data: [correctAnswers, wrongAnswers, skippedAnswers],
        backgroundColor: ["#4CAF50", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const correctData = {
    labels: ["Correct Answers", "unknown answers"],
    datasets: [
      {
        label: "Correct Answers",
        data: [correctAnswers,totalQuestions-correctAnswers],
        backgroundColor: ["#4CAF50","black"],
      },
    ],
  };

  const wrongData = {
    labels: ["Wrong Answers", "unknown answers"],
    datasets: [
      {
        label: "Wrong Answers",
        data: [wrongAnswers, totalQuestions-wrongAnswers],
        backgroundColor: ["#FF6384", "black"],
      },
    ],
  };

  const skippedData = {
    labels: ["Skipped Questions", "unskipped Questions"],
    datasets: [
      {
        label: "Skipped Questions",
        data: [skippedAnswers, totalQuestions- skippedAnswers],
        backgroundColor: ["#FFCE56", "black"],
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
      <h2 className="text-2xl font-bold mb-4">Overall Results</h2>
      
      <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-center h-80">
          <h2 className="text-xl font-bold mb-2">Correct Answers</h2>
          <div className="w-full h-full">
            <Doughnut data={correctData} options={options} />
          </div>
        </div>
        <div className="flex flex-col items-center h-80">
          <h2 className="text-xl font-bold mb-2">Wrong Answers</h2>
          <div className="w-full h-full">
            <Doughnut data={wrongData} options={options} />
          </div>
        </div>
        <div className="flex flex-col items-center h-80">
          <h2 className="text-xl font-bold mb-2">Skipped Questions</h2>
          <div className="w-full h-full">
            <Doughnut data={skippedData} options={options} />
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 h-80 mb-8">
        <Doughnut data={overallData} options={options} />
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
