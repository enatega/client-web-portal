'use client';
import { QueryContext } from '@/lib/context/query-context.jsx';
import { gql, QueryResult, useQuery } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
import { getCoupons } from '../graphql/queries.js';

export default function QueryProvidor({ children }: { children: ReactNode }) {
  const [coupons, setCoupons] = useState<any>({});
  const GET_COUPONS = gql`
    ${getCoupons}
  `;
  async function fetchCoupons() {
    try {
      const { data, loading }: QueryResult = useQuery(GET_COUPONS);
      console.log({ data: await data.json() });
      setCoupons({
        data,
        loading,
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCoupons();
  }, []);
  return (
    <QueryContext.Provider value={coupons}>{children}</QueryContext.Provider>
  );
}
