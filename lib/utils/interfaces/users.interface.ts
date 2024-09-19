import { IGlobalComponentProps } from './global.interface';

export interface IUsersHeaderProps extends IGlobalComponentProps {
  globalFilterValue: string;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IAddress {
  __typename: 'Address';
  location: IPoint;
  deliveryAddress: string;
}

interface IPoint {
  __typename: 'Point';
  coordinates: [string, string];
}

export interface IUserResponse {
  __typename: 'User';
  _id: string;
  name: string;
  email: string;
  phone: string;
  addresses: IAddress[];
}

export interface IUsersDataResponse {
  users: IUserResponse[];
}
