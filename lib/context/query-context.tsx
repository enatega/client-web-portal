'use client';
import { createContext } from 'react';
//query param type to be resolved later

export const QueryContext = createContext<IQueryResponse>({
  coupons: [],
  cuisines: [],
});

import { getCoupons } from '@/app/graphql';
import { getCuisines } from '@/app/graphql/queries/queries';
import { IQueryResponse } from '@/app/types/global-types';
import { gql, useQuery } from '@apollo/client';
import { ReactNode } from 'react';

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
    // loading: couponsLoading,
    // error: couponsError,
  } = useQuery(GET_COUPONS);

  //   const coupons = {
  //     data: couponsData ? couponsData.coupons : [],
  //     // loading: couponsLoading,
  //     // error: couponsError,
  //   };

  //cuisines query
  const {
    data: cusininesData,
    // loading: cuisinesLoading,
    // error: cuisinesError,
  } = useQuery(GET_CUISINES);

  //   const cuisines = {
  //     data: cusininesData ? cusininesData.cuisines : [],
  //     // loading: cuisinesLoading,
  //     // error: cuisinesError,
  //   };

  //errors
  //   if (couponsError || cuisinesError)
  //     console.log({ couponsError, cuisinesError });
  return (
    <QueryContext.Provider
      value={{ coupons: couponsData, cuisines: cusininesData }}
    >
      {children}
    </QueryContext.Provider>
  );
}
