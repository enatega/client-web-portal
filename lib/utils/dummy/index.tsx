import {
  faMotorcycle,
  faStore,
  faUsers,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import {
  IBannersResponse,
  ICategory,
  IDropdownSelectItem,
  IOptions,
  IRestaurantResponse,
  IStatsCardProps,
} from '../interfaces';
import { IRiderResponse } from '../interfaces/rider.interface';
import { IUserResponse } from '../interfaces/users.interface';

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

export const dummyCountriesData: IDropdownSelectItem[] = [
  { label: 'Australia', code: 'AU' },
  { label: 'Brazil', code: 'BR' },
  { label: 'China', code: 'CN' },
  { label: 'Egypt', code: 'EG' },
  { label: 'France', code: 'FR' },
  { label: 'Germany', code: 'DE' },
  { label: 'India', code: 'IN' },
  { label: 'Japan', code: 'JP' },
  { label: 'Spain', code: 'ES' },
  { label: 'United States', code: 'US' },
];

export const generateRandomUserCounts = () => {
  const randomNumbers = new Set();

  while (randomNumbers.size < 12) {
    randomNumbers.add(Math.floor(Math.random() * 101)); // Generates random integer between 0 and 100
  }

  return Array.from(randomNumbers);
};

export const generateDummyRestaurants = (
  count: number = 10
): IRestaurantResponse[] => {
  const restaurants: IRestaurantResponse[] = [];

  for (let i = 0; i < count; i++) {
    restaurants.push({
      _id: `restaurant_${i + 1}`,
      name: `Restaurant ${i + 1}`,
      username: `restaurant${i + 1}example`,
      owner: {
        _id: '',
        email: `vendor${i + 1}-something`,
        isActive: false,
        __typename: '',
      },
      address: `${i + 1} Main Street, City`,
      isActive: Math.random() > 0.5,
      image: `/images/restaurant${i + 1}.jpg`,
      orderPrefix: '',
      slug: '',
      deliveryTime: 0,
      minimumOrder: 0,
      commissionRate: 0,
      tax: 0,
      shopType: '',
      __typename: '',
    });
  }

  return restaurants;
};

export const generateDummyRiders = (count: number = 10): IRiderResponse[] => {
  const riders: IRiderResponse[] = [];

  for (let i = 0; i < count; i++) {
    riders.push({
      _id: `rider_${i + 1}`,
      name: `Rider ${i + 1}`,
      username: `rider${i + 1}`,
      password: `password${i + 1}`,
      phone: `+1234567890${i}`,
      zone: {
        title: `Zone ${(i % 5) + 1}`,
        _id: `zone_${(i % 5) + 1}`,
        __typename: 'Zone',
      },
      available: Math.random() > 0.5,
      __typename: 'Rider',
    });
  }

  return riders;
};

export const generateDummyCategories = (count: number = 10): ICategory[] => {
  const categories: ICategory[] = [];

  for (let i = 0; i < count; i++) {
    categories.push({
      _id: `category_${i + 1}`,
      title: `Category ${i + 1}`,
    });
  }

  return categories;
};
export const generateDummyOptions = (count: number = 10): IOptions[] => {
  const options: IOptions[] = [];

  for (let i = 0; i < count; i++) {
    options.push({
      _id: `option_${i + 1}`,
      title: `Option ${i + 1}`,
      description: `Description for Option ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
      __typename: '',
    });
  }

  return options;
};

export const generateDummyUsers = (count: number = 10): IUserResponse[] => {
  const users: IUserResponse[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      _id: `user_${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      addresses: [],

      createdAt: (
        Date.now() - Math.floor(Math.random() * 31536000000)
      ).toString(),
      __typename: 'User',
    });
  }

  return users;
};

export const generateDummyBanners = (
  count: number = 10
): IBannersResponse[] => {
  const banners: IBannersResponse[] = [];

  for (let i = 0; i < count; i++) {
    banners.push({
      _id: `banner_${i + 1}`,
      title: `Banner ${i + 1}`,
      description: `Description for Banner ${i + 1}`,
      file: `https://example.com/banner${i + 1}.jpg`,
      screen: `Screen ${(i % 3) + 1}`,
      action: 'navigate',
      parameters: '',
    });
  }

  return banners;
};
