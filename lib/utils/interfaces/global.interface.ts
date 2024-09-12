export interface IGlobalProps {
  children?: React.ReactNode;
}

export interface IGlobalComponentProps extends IGlobalProps {
  className?: string;
}

export interface IDropdownSelectItem {
  label: string;
  code: string;
}

import { ApolloError } from '@apollo/client';
import { IconType } from 'react-icons';
import { ICouponsData } from './coupons.interface';
import { ICuisinesData } from './cuisine.interface';

export interface IQueryResponse {
  coupons: ICouponsData[] | undefined;
  cuisines: ICuisinesData[] | undefined;
}
export interface QueryState {
  data: {}[];
  loading: boolean;
  error?: ApolloError;
}
export interface GlobalButtonPropsType {
  Icon: IconType;
  title: string;
}
