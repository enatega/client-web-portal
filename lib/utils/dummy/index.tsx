import {
  faMotorcycle,
  faStore,
  faUsers,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { IStatsCardProps } from '../interfaces';

export const dummyStatsData: IStatsCardProps[] = [
  {
    label: 'Total User',
    total: 40987,
    description: '8.5% up from yesterday',
    icon: faUsers,
    route: '/general/users',
  },
  {
    label: 'Total Vendors',
    total: 7689,
    description: '2.4% up from yesterday',
    icon: faStore,
    route: '/general/vendors',
  },
  {
    label: 'Total Restaurants',
    total: 20689,
    description: '6.1% down from yesterday',
    icon: faUtensils,
    route: '/general/restaurants',
  },
  {
    label: 'Total Riders',
    total: 12689,
    description: '1.9% up from yesterday',
    icon: faMotorcycle,
    route: '/general/riders',
  },
];

export const dummyOrderStatsData: IStatsCardProps[] = [
  {
    label: 'Total Orders',
    total: 40987,
    description: '8.5% up from yesterday',

    route: '/general/users',
  },
  {
    label: 'COD Orders',
    total: 7689,
    description: '2.4% up from yesterday',

    route: '#',
  },
  {
    label: 'Total Sales',
    total: 20689,
    description: '6.1% down from yesterday',

    route: '#',
  },
  {
    label: 'COD Sales',
    total: 12689,
    description: '1.9% up from yesterday',

    route: '#',
  },
];

export const generateRandomUserCounts = () => {
  const randomNumbers = new Set();

  while (randomNumbers.size < 12) {
    randomNumbers.add(Math.floor(Math.random() * 101)); // Generates random integer between 0 and 100
  }

  return Array.from(randomNumbers);
};
