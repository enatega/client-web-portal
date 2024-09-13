import { ApolloError } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';
import { ICouponsData } from './coupons.interface';
import { ICuisinesData } from './cuisine.interface';

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
export interface IGlobalButtonProps {
  Icon: IconType;
  title: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
}
export interface IQueryResult<T, V> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  fetch: (variables?: V) => void; // for useLazyQuery
  isError: boolean;
  isSuccess: boolean;
}
