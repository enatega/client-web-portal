'use client';

// Styles
import StatsCard from '@/lib/ui/useable-components/stats-card';
import { dummyStatsData } from '@/lib/utils/dummy';
import { IStatsCardProps } from '@/lib/utils/interfaces';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import classes from './home.module.css';

export default function Home() {
  // States
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const renderStatsCard = (data: IStatsCardProps, index: number) => (
    <StatsCard {...data} key={index} />
  );

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
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
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
    <div className="space-y-6 w-full">
      <div className="grid  items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {dummyStatsData.map(renderStatsCard)}
      </div>
      <div className={`${classes['card']} w-full`}>
        <h2 className="text-lg font-semibold">Progress Graph</h2>
        <p className="text-gray-500">Secondary text</p>
        <div className="mt-4">
          <Chart type="line" data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
