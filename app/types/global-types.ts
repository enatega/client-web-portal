import { ApolloError, QueryResult } from '@apollo/client';
import { IconType } from 'react-icons';
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

//query context type
export interface QueryContextType {
  coupons: QueryResult<{ coupons: CouponType[] }, any>;
  cuisines: QueryResult<{ cuisines: CuisineType[] }, any>;
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
