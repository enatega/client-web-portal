import { useEffect, useState } from 'react';

import { Chart } from 'primereact/chart';

// Dummy
import { generateRandomUserCounts } from '@/lib/utils/dummy';

// Styles

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
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Total Users',
          data: generateRandomUserCounts(),
          fill: true,
          borderColor: 'rgba(90, 193, 47, 1)',
          backgroundColor: 'rgba(201, 232, 189, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Total Vendors',
          data: generateRandomUserCounts(),
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          backgroundColor: documentStyle.getPropertyValue('--blue-100'),
          tension: 0.4,
        },
        {
          label: 'Total Restaurants',
          data: generateRandomUserCounts(),
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          backgroundColor: documentStyle.getPropertyValue('--pink-100'),
          tension: 0.4,
        },
        {
          label: 'Total Users',
          data: generateRandomUserCounts(),
          fill: false,
          borderColor: documentStyle.getPropertyValue('--gray-500'),
          backgroundColor: documentStyle.getPropertyValue('--gray-100'),
          tension: 0.4,
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
    <div className={`card w-full`}>
      <h2 className="text-lg font-semibold">Growth Overview</h2>
      <p className="text-gray-500">Tracking Growth Over the Year</p>
      <div className="mt-4">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
