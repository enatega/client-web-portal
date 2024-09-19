import { ApolloError } from '@apollo/client';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Dispatch, ReactNode, SetStateAction } from 'react';
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

export interface IGlobalButtonProps {
  Icon: IconDefinition;
  title: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
}
export interface ILazyQueryResult<T, V> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  fetch: (variables?: V) => void;
  isError: boolean;
  isSuccess: boolean;
}

export interface IQueryResult<T, V> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: (variables?: V) => void; // for useQuery
  isError: boolean;
  isSuccess: boolean;
}
export interface ITableColumn<T> {
  field?: string;
  header?: string;
  body?: (data: T) => ReactNode;
}
export interface INotificationComponentProps {
  type: 'success' | 'error' | 'warn' | 'info';
  title: string;
  message: string;
}
