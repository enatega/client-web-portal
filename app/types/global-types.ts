import { ApolloError } from '@apollo/client';
import { IconType } from 'react-icons';
export interface IQueryResponse {
  coupons: CouponsData[] | undefined;
  cuisines: CuisinesData[] | undefined;
}

export interface CouponsData {
  data: {
    discount: number;
    enabled: boolean;
    title: string;
    __typename: string;
    _id: string;
  }[];
}

export interface CuisinesData {
  data: {
    description: string;
    image: string;
    name: string;
    shopType: string;
    __typename: string;
    _id: string;
  }[];
}

//fetch query types
export interface CouponType {
  discount: number;
  enabled: boolean;
  title: string;
  __typename: string;
  _id: string;
}
export interface CuisineType {
  description: string;
  image: string;
  name: string;
  shopType: string;
  __typename: string;
  _id: string;
}
//others
export interface QueryState {
  data: {}[];
  loading: boolean;
  error?: ApolloError;
}
export interface GlobalButtonPropsType {
  Icon: IconType;
  title: string;
}
