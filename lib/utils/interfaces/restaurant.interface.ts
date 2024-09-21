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
  username: string;
  owner: {
    _id: string;
    email: string;
    isActive: boolean;
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

interface ICreateRestaurant {
  _id: string;
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
  deliveryTime: number;
  isActive: boolean;
  commissionRate: number;
  owner: {
    _id: string;
    email: string;
    isActive: boolean;
    __typename: string;
  };
}

// The two interfaces are identical. There are no differences between them.
export interface ICreateRestaurantResponse {
  data?: {
    createRestaurant?: ICreateRestaurant;
  };
}

/* Get Restaurant By ID Profile */
export interface IRestaurantProfile {
  _id: string;
  orderId: number;
  orderPrefix: string;
  slug: string;
  name: string;
  image: string;
  logo: string;
  address: string;
  location: {
    coordinates: string[];
    __typename: string;
  };
  deliveryBounds: {
    coordinates: number[][][];
    __typename: string;
  };
  username: string;
  password: string;
  deliveryTime: number;
  minimumOrder: number;
  tax: number;
  isAvailable: boolean;
  stripeDetailsSubmitted: boolean;
  openingTimes: {
    day: string;
    times: {
      startTime: string[];
      endTime: string[];
      __typename: string;
    }[];
    __typename: string;
  }[];
  owner: {
    _id: string;
    email: string;
    __typename: string;
  };
  shopType: string;
  cuisines: string[];
  __typename: string;
}
export interface IRestaurantProfileResponse {
  data: {
    restaurant: IRestaurantProfile;
  };
}

export interface IRestaurantDeliveryZoneInfo {
  boundType: string;
  deliveryBounds: {
    coordinates: number[][][];
    __typename: string;
  };
  location: {
    coordinates: number[];
    __typename: string;
  };
  circleBounds: {
    radius: number;
    __typename: string;
  };
  address: string;
  city: string;
  postCode: string;
  __typename: string;
}

export interface IRestaurantDeliveryZoneInfoResponse {
  data: {
    getRestaurantDeliveryZoneInfo: IRestaurantDeliveryZoneInfo;
  };
}
