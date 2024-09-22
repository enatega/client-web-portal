import { GET_CUISINES } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { IEditState, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  ICuisine,
  ICuisineMainProps,
  IGetCuisinesData,
} from '@/lib/utils/interfaces/cuisine.interface';
import { IFilterType } from '@/lib/utils/interfaces/table.interface';
import { FilterMatchMode } from 'primereact/api';
import { ChangeEvent, useEffect, useState } from 'react';
import CuisineForm from '../../form';
import CuisineTable from '../../table';

export default function CuisinesMain({
  visible,
  setVisible,
}: ICuisineMainProps) {
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
  const [cuisines, setCuisines] = useState<ICuisine[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  //queries
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

  //handle add cuisine locally to append child in the cuisine array
  const addCuisineLocally = (cuisine: ICuisine) => {
    setCuisines((prevCuisines: ICuisine[]) => [
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
    <div>
      <CuisineTable
        data={cuisines}
        globalFilterValue={globalFilterValue}
        isDeleting={isDeleting}
        loading={loading}
        onGlobalFilterChange={onGlobalFilterChange}
        selectedStatuses={selectedStatuses}
        setCuisines={setCuisines}
        setIsDeleting={setIsDeleting}
        setIsEditing={setIsEditing}
        setSelectedStatuses={setSelectedStatuses}
        setVisible={setVisible}
        statusOptions={statusOptions}
        visible={visible}
        filters={filters}
      />
      <CuisineForm
        addCuisineLocally={addCuisineLocally}
        cuisines={cuisines}
        isEditing={isEditing}
        setCuisines={setCuisines}
        setIsEditing={setIsEditing}
        setVisible={setVisible}
        visible={visible}
      />
    </div>
  );
}
