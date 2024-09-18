'use client';
//graphql
import { DocumentNode } from 'graphql';
//components
import AddCuisine from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/AddCuisine';
import CuisineTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisinesTable';
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
//prime react components
import { Sidebar } from 'primereact/sidebar';
//interfaces
import { IQueryResult } from '@/lib/utils/interfaces';
import {
  ICuisine,
  IGetCuisinesData,
  IGetCuisinesVariables,
} from '@/lib/utils/interfaces/cuisine.interface';
//icons
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
//hooks
import { GET_CUISINES } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { useEffect, useState } from 'react';

export default function CuisinesScreen() {
  const [visible, setVisible] = useState(false);
  const [cuisinesData, setCuisinesData] = useState<ICuisine[]>([]);
  const { data, fetch, loading } = useLazyQueryQL<
    DocumentNode,
    IGetCuisinesVariables
  >(GET_CUISINES, {}) as IQueryResult<IGetCuisinesData | undefined, undefined>;

  //toggle visibility
  const handleButtonClick = () => {
    setVisible(true);
  };

  //handle add cuisine locally to append child in the cuisine array
  const addCuisineLocally = (cuisine: ICuisine) => {
    setCuisinesData((prevCuisines) => [cuisine, ...prevCuisines]);
  };

  //fetch
  useEffect(() => {
    fetch();
  }, []);

  //appending cuisines
  useEffect(() => {
    if (data) {
      setCuisinesData(data.cuisines);
    }
  }, [data]);
  return (
    <div className="flex flex-col items-center w-full">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <AddCuisine
          setVisible={setVisible}
          setCuisinesData={addCuisineLocally}
        />
      </Sidebar>
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Cuisines" className="mx-5" />
        <TextIconClickable
          icon={faCirclePlus}
          iconStyles={{ color: 'white' }}
          onClick={handleButtonClick}
          title="Add Cuisine"
          className="bg-black text-white p-2 rounded-md"
        />
      </div>
      <CuisineTable data={cuisinesData} loading={loading} />
    </div>
  );
}
