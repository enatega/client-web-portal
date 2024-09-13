'use client';
import { getCuisines } from '@/lib/api/graphql/queries/queries';
import Loader from '@/lib/ui/screen-components/loader/Loader';
import AddCuisine from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/AddCuisine';
import CuisineTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisinesTable';
import GlobalButton from '@/lib/ui/useable-components/global-buttons/button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import {
  IGetCuisinesData,
  IGetCuisinesVariables,
} from '@/lib/utils/interfaces/cuisine.interface';
import { useLazyQueryGlobal } from '@/lib/utils/methods/hooks/screen-hooks/global';
import { gql } from '@apollo/client';
import { Sidebar } from 'primereact/sidebar';
import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

export default function CuisinesScreen() {
  const [visible, setVisible] = useState(false);

  //get query
  const GET_CUISINES = gql`
    ${getCuisines}
  `;
  const { data, executeLazyQuery, loading } = useLazyQueryGlobal<
    IGetCuisinesData,
    IGetCuisinesVariables
  >(GET_CUISINES, {});
  useEffect(() => {
    executeLazyQuery();
  }, []);
  return (
    <div className="flex flex-col items-center w-full">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <AddCuisine />
      </Sidebar>
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Cuisines" className="mx-5" />
        <GlobalButton
          Icon={IoIosAddCircleOutline}
          title="Add Cuisine"
          setVisible={setVisible}
        />
      </div>
      {loading ? <Loader /> : <CuisineTable data={data} loading={loading} />}
    </div>
  );
}
