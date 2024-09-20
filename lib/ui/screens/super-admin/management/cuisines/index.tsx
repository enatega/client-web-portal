'use client';
//graphql
import { GET_CUISINES } from '@/lib/api/graphql';
//components
import AddCuisine from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/AddCuisine';
import CuisineTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisinesTable';
import CustomActionActionButton from '@/lib/ui/useable-components/custom-action-button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// PrimeReact components
import { FilterMatchMode } from 'primereact/api';
import { Sidebar } from 'primereact/sidebar';

//interfaces
import { ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  ICuisine,
  IGetCuisinesData,
} from '@/lib/utils/interfaces/cuisine.interface';

// Icons
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { ChangeEvent, useEffect, useState } from 'react';

export default function CuisinesScreen() {
  const [visible, setVisible] = useState(false);
  const [cuisinesData, setCuisinesData] = useState<ICuisine[]>([]);
  const { data, loading, fetch } = useLazyQueryQL(
    GET_CUISINES,
    {}
  ) as ILazyQueryResult<IGetCuisinesData | undefined, undefined>;

  //filters
  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  //global filters change
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  //toggle visibility
  const handleButtonClick = () => {
    setVisible(true);
  };

  //handle add cuisine locally to append child in the cuisine array
  const addCuisineLocally = (cuisine: ICuisine) => {
    setCuisinesData((prevCuisines) => [cuisine, ...prevCuisines]);
  };

  //useEffects
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
      <div className="self-start flex items-center justify-center gap-x-3">
        <CustomTextField
          name="searchQuery"
          onChange={onGlobalFilterChange}
          value={globalFilterValue}
          showLabel={false}
          placeholder="Seach here..."
          type="text"
          className="w-96"
        />
        <CustomActionActionButton Icon={faPlus} title="Action" />
      </div>
      <CuisineTable data={cuisinesData} loading={loading} filters={filters} />
    </div>
  );
}
