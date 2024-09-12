'use client';
import { QueryContext } from '@/lib/context/query-context';
import { gql, QueryResult, useQuery } from '@apollo/client';
import { ReactNode } from 'react';
import { getCoupons, getCuisines } from '../graphql/queries';

//queries
const GET_COUPONS = gql`
  ${getCoupons}
`;
const GET_CUISINES = gql`
  ${getCuisines}
`;

export default function QueryProvidor({ children }: { children: ReactNode }) {
  //coupons query
  const {
    data: couponsData,
    loading: couponsLoading,
    error: couponsError,
  }: QueryResult = useQuery(GET_COUPONS);

  const coupons = {
    data: couponsData ? couponsData.coupons : [],
    loading: couponsLoading,
    error: couponsError,
  };

  //cuisines query
  const {
    data: cusininesData,
    loading: cuisinesLoading,
    error: cuisinesError,
  }: QueryResult = useQuery(GET_CUISINES);

  const cuisines = {
    data: cusininesData ? cusininesData.cuisines : [],
    loading: cuisinesLoading,
    error: cuisinesError,
  };

  //errors
  if (couponsError || cuisinesError)
    console.log({ couponsError, cuisinesError });
  return (
    <QueryContext.Provider value={{ coupons, cuisines }}>
      {children}
    </QueryContext.Provider>
  );
}
