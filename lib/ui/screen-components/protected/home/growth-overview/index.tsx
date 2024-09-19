// Core
import { useEffect, useState } from 'react';

// Prime React
import { Chart } from 'primereact/chart';

// Dummy

export default function GrowthOverView() {
  // States
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  // Use Effect
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Restaurants',
          data: [1, 2, 3, 4, 5, 6, 7],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          backgroundColor: documentStyle.getPropertyValue('--pink-100'),
          tension: 0,
        },
        {
          label: 'Vendors',
          data: [8, 7, 6, 5, 4, 3, 2],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          backgroundColor: documentStyle.getPropertyValue('--blue-100'),
          tension: 0,
        },
        {
          label: 'Riders',
          data: [2, 4, 6, 8, 7, 4, 1],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          backgroundColor: documentStyle.getPropertyValue('--yellow-100'),
          tension: 0,
        },
        {
          label: 'Users',
          data: [9, 6, 4, 2, 3, 5, 7],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          backgroundColor: documentStyle.getPropertyValue('--green-100'),
          tension: 0,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,

      plugins: {
        legend: {
          marginBottom: '20px',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            backgroundColor: textColor,
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className={`w-full pb-2`}>
      <h2 className="text-lg font-semibold">Growth Overview</h2>
      <p className="text-gray-500">Tracking Growth Over the Year</p>
      <div className="mt-4">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
