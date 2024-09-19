import { IGlobalComponentProps, IQueryResult } from './global.interface';

export interface IRestaurantCardProps extends IGlobalComponentProps {
  restaurant: IRestaurantByOwner;
}

export interface IRestaurantContextProps {
  vendorId: string | null;
  restaurantFormVisible: boolean;
  onSetRestaurantFormVisible: (status: boolean) => void;
  restaurantId: string | null;
  onSetRestaurantId: (id: string) => void;
  restaurantByOwnerResponse: IQueryResult<
    IRestaurantsByOwnerResponseGraphQL | undefined,
    undefined
  >;
  restaurantGlobalFilter: string;
  onSetRestaurantGlobalFilter: (filter: string) => void;
  restaurantFiltered?: IRestaurantByOwner[];
  // Editing,
  isEditingRestaurant: boolean;
  onSetEditingRestaurant: (status: boolean) => void;
}

export interface IRestaurantResponse {
  _id: string;
  name: string;
  image: string;
  orderPrefix: string;
  slug: string;
  address: string;
  deliveryTime: number;
  minimumOrder: number;
  isActive: boolean;
  commissionRate: number;
  tax: number;
  owner: {
    _id: string;
    email: string;
    __typename: string;
  };
  shopType: string;
  __typename: string;
}

export interface IRestaurantsResponseGraphQL {
  restaurants: IRestaurantResponse[];
}

// By OWner
export interface IRestaurantByOwner {
  _id: string;
  orderId: string;
  orderPrefix: string;
  name: string;
  slug: string;
  image: string;
  address: string;
  isActive: boolean;
  username: string;
  password: string;
  location: {
    coordinates: number[];
  };
  shopType: string;
}

export interface IRestaurantsByOwnerResponseGraphQL {
  restaurantByOwner: {
    _id: string;
    email: string;
    userType: string;
    restaurants: IRestaurantByOwner[];
  };
}

// Create
interface ICreateRestaurant {
  address: string;
  cuisines: string[];
  image: string;
  location: {
    __typename: string;
    coordinates: number[];
  };
  logo: string;
  minimumOrder: number;
  name: string;
  orderId: number;
  orderPrefix: string;
  password: string;
  shopType: string;
  slug: string;
  tax: number;
  username: string;
  __typename: string;
  _id: string;
}

export interface ICreateRestaurantResponse {
  data?: {
    createRestaurant?: ICreateRestaurant;
  };
}
