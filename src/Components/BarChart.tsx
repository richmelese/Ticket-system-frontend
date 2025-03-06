import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }: { data: { labels: string[]; values: number[]; colors: string[]; borderColors: string[] } }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Count',
        data: data.values,
        backgroundColor: data.colors,
        borderColor: data.borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutBounce',
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
