import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ElectionResults = () => {
  // Hardcoded data for the top 3 parties
  const topParties = [
    { name: "Party A", voteCount: 1500, percentage: 45.0 },
    { name: "Party B", voteCount: 1200, percentage: 35.0 },
    { name: "Party C", voteCount: 800, percentage: 20.0 },
  ];

  // Prepare data for Chart.js
  const data = {
    labels: topParties.map((party) => party.name),
    datasets: [
      {
        label: "Percentage of Votes",
        data: topParties.map((party) => party.percentage),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}% of total votes`,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Top 3 Parties by Percentage
      </h2>
      <Bar data={data} options={options} />
      <div className="mt-6 w-full">
        {topParties.map((party, index) => (
          <div
            key={index}
            className="flex justify-between p-3 mb-2 bg-white rounded-lg shadow-sm"
          >
            <strong className="text-gray-700">{party.name}</strong>
            <span className="text-gray-600">
              {party.voteCount} votes ({party.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionResults;
