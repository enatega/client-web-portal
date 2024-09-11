import { ApolloError } from '@apollo/client';

export interface QueryState {
  data: any[];
  loading: boolean;
  error?: ApolloError;
}
