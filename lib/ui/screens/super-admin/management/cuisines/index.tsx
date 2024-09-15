'use client';
import { getCuisines } from '@/lib/api/graphql';
import AddCuisine from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/AddCuisine';
import CuisineTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisinesTable';
import GlobalButton from '@/lib/ui/useable-components/global-buttons/button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import {
  IGetCuisinesData,
  IGetCuisinesVariables,
} from '@/lib/utils/interfaces/cuisine.interface';
import { useLazyQueryGlobal } from '@/lib/utils/methods/hooks/screen-hooks/global/useLazyQuery.hook';
import { gql } from '@apollo/client';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';

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
  //toast ref
  const toast = useRef<Toast>(null);
  return (
    <div className="flex flex-col items-center w-full">
      <Toast ref={toast} position="top-left" />
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <AddCuisine setVisible={setVisible} toast={toast} />
      </Sidebar>
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Cuisines" className="mx-5" />
        <GlobalButton
          Icon={faCirclePlus}
          title="Add Cuisine"
          setVisible={setVisible}
        />
      </div>
      <CuisineTable data={data} loading={loading} />
    </div>
  );
}
