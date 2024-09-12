import { IGlobalComponentProps } from './global.interface';

export interface IRestaurantCardProps extends IGlobalComponentProps {
  index: number;
}

export interface IRestaurantContextProps {
  restaurantFormVisible: boolean;
  onSetRestaurantFormVisible: (status: boolean) => void;
  restaurantId: number | null;
  onSetRestaurantId: (val: number) => void;
}
