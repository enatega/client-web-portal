'use client';
import { GET_CUISINES } from '@/lib/api/graphql/query/cuisines';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import AddCuisine from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/AddCuisine';
import CuisineTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisinesTable';
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { IQueryResult } from '@/lib/utils/interfaces';
import {
  IGetCuisinesData,
  IGetCuisinesVariables,
} from '@/lib/utils/interfaces/cuisine.interface';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { DocumentNode } from 'graphql';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';

export default function CuisinesScreen() {
  const [visible, setVisible] = useState(false);

  const { data, fetch, loading } = useLazyQueryQL<
    DocumentNode,
    IGetCuisinesVariables
  >(GET_CUISINES, {}) as IQueryResult<IGetCuisinesData | undefined, undefined>;
  useEffect(() => {
    fetch();
  }, []);
  //toast ref
  const toast = useRef<Toast>(null);
  //button click
  const handleButtonClick = () => {
    setVisible(true);
  };
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
        <TextIconClickable
          icon={faCirclePlus}
          iconStyles={{ color: 'white' }}
          onClick={handleButtonClick}
          title="Add Coupon"
          className="bg-black text-white p-2 rounded-md"
        />
      </div>
      <CuisineTable data={data?.cuisines} loading={loading} />
    </div>
  );
}
