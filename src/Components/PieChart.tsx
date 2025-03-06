import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }: { data: { labels: string[]; values: number[]; colors: string[]; borderColors: string[] } }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
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
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
