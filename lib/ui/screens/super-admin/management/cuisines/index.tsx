'use client';
//graphql
import { GET_CUISINES } from '@/lib/api/graphql';
//components
import CuisineTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisinesTable';

// PrimeReact components
import { FilterMatchMode } from 'primereact/api';

//interfaces
import { ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  ICuisine,
  IGetCuisinesData,
} from '@/lib/utils/interfaces/cuisine.interface';
import { IEditState } from '@/lib/utils/interfaces/global.interface';

// Icons

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import CuisineScreenHeader from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisineScreenHeader';
import { IFilterType } from '@/lib/utils/interfaces/table.interface';
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
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const { data, loading, fetch } = useLazyQueryQL(
    GET_CUISINES,
    {}
  ) as ILazyQueryResult<IGetCuisinesData | undefined, undefined>;

  //filters
  const [filters, setFilters] = useState<IFilterType>({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  //options
  let statusOptions = [
    {
      label: '',
      code: '',
    },
  ];

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
    <div className="flex flex-col mb-3 gap-6 overflow-y-auto h-full">
      <CuisineScreenHeader
        cuisines={cuisines}
        handleAddCuisineLocally={addCuisineLocally}
        handleButtonClick={handleButtonClick}
        isEditing={isEditing}
        setCuisines={setCuisines}
        setIsEditing={setIsEditing}
        setVisible={setVisible}
        visible={visible}
      />
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
        globalFilterValue={globalFilterValue}
        onGlobalFilterChange={onGlobalFilterChange}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
        statusOptions={statusOptions}
      />
    </div>
  );
}
