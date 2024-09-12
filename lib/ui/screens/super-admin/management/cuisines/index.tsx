'use client';
import { getCuisines } from '@/lib/api/graphql/queries/queries';
import Loader from '@/lib/ui/screen-components/loader/Loader';
import CuisineTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisinesTable';
import GlobalButton from '@/lib/ui/useable-components/global-buttons/button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import {
  IGetCuisinesData,
  IGetCuisinesVariables,
} from '@/lib/utils/interfaces/cuisine.interface';
import { useLazyQueryGlobal } from '@/lib/utils/methods/hooks/screen-hooks/global';
import { gql } from '@apollo/client';
import { useEffect } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

export default function CuisinesScreen() {
  //query
  const GET_CUISINES = gql`
    ${getCuisines}
  `;
  const { data, executeLazyQuery, loading } = useLazyQueryGlobal<
    IGetCuisinesData,
    IGetCuisinesVariables
  >(GET_CUISINES, {
    onError: (err) => {
      console.log({
        err,
        msg: 'There was an error occured in the fetch query.',
      });
    },
  });
  useEffect(() => {
    executeLazyQuery();
  }, []);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Cuisines" className="mx-5" />
        <GlobalButton Icon={IoIosAddCircleOutline} title="Add Cuisine" />
      </div>
      {loading ? <Loader /> : <CuisineTable data={data} />}
    </div>
  );
}
