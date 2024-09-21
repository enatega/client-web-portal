'use client';
//graphql
import { GET_CUISINES } from '@/lib/api/graphql';
//components
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
import { IEditState } from '@/lib/utils/interfaces/global.interface';

// Icons
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import CuisineForm from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisineForm';
import { ChangeEvent, useEffect, useState } from 'react';

export default function CuisinesScreen() {
  // edit/delete states which are to be circulated in the whole cuisines module
  const [isEditing, setIsEditing] = useState<IEditState<ICuisine>>({
    bool: false,
    data: {
      _id: '',
      __typename: '',
      description: '',
      name: '',
      shopType: '',
      image: '',
    },
  });
  const [isDeleting, setIsDeleting] = useState<IEditState<ICuisine>>({
    bool: false,
    data: {
      _id: '',
      __typename: '',
      description: '',
      name: '',
      shopType: '',
      image: '',
    },
  });

  //states
  const [visible, setVisible] = useState(false);
  const [cuisines, setCuisines] = useState<ICuisine[]>([]);
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
    setCuisines((prevCuisines) => [
      cuisine,
      ...prevCuisines.filter((c) => c._id !== cuisine._id),
    ]);
    setIsEditing({
      bool: false,
      data: { ...isEditing.data },
    });
    setIsDeleting({
      bool: false,
      data: { ...isEditing.data },
    });
  };
  //useEffects
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (data) {
      setCuisines(data.cuisines);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setCuisines(data.cuisines);
    }
    if (isEditing.bool) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [data, isEditing.bool]);
  return (
    <div className="flex flex-col items-center w-full">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <CuisineForm
          setVisible={setVisible}
          setCuisines={setCuisines}
          addCuisineLocally={addCuisineLocally}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          cuisines={cuisines}
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
      <div className="self-start flex items-center justify-center gap-x-3 m-3">
        <CustomTextField
          name="searchQuery"
          onChange={onGlobalFilterChange}
          value={globalFilterValue}
          showLabel={false}
          placeholder="Filter tasks..."
          type="text"
          className="w-72 h-custom-button"
        />
        <CustomActionActionButton
          Icon={faPlus}
          title="Action"
          handleOptionChange={() => {}}
          selectedOption={null}
          statusOptions={[{ label: '', code: '' }]}
        />
      </div>
      <CuisineTable
        data={cuisines}
        loading={loading}
        filters={filters}
        isDeleting={isDeleting}
        setCuisines={setCuisines}
        setIsDeleting={setIsDeleting}
        setIsEditing={setIsEditing}
        setVisible={setVisible}
        visible={visible}
      />
    </div>
  );
}
