//graphQL
import { DELETE_CUISINE, GET_CUISINES } from '@/lib/api/graphql';

//intefaces
import { IEditState, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  ICuisine,
  ICuisineMainProps,
  IGetCuisinesData,
} from '@/lib/utils/interfaces/cuisine.interface';
import {
  IColumnConfig,
  IFilterType,
} from '@/lib/utils/interfaces/table.interface';
import { FilterMatchMode } from 'primereact/api';

//components
import CuisineForm from '../../form';

// hooks
import { ToastContext } from '@/lib/context/toast.context';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';
import { IEditPopupVal } from '@/lib/utils/interfaces/coupons.interface';
import { useMutation } from '@apollo/client';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

export default function CuisinesMain({
  visible,
  setVisible,
}: ICuisineMainProps) {
  //mutations
  const [deleteCuisine, { loading: deleteCuisineLoading }] =
    useMutation(DELETE_CUISINE);

  //toast
  const { showToast } = useContext(ToastContext);

  //refs
  const editDeletePopupRef = useRef<HTMLDivElement | null>(null);

  //states
  const [selectedData, setSelectedData] = useState<ICuisine[]>([]);
  const [isEditDeletePopupOpen, setIsEditDeletePopupOpen] =
    useState<IEditPopupVal>({
      _id: '',
      bool: false,
    });
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

  //columns
  const cuisineColumns: IColumnConfig<ICuisine>[] = [
    {
      headerName: 'Image',
      propertyName: 'image',
      body: (data: ICuisine) => (
        <Image
          src={
            'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt={data?.description ?? 'cuisine'}
          width={30}
          height={30}
          className="rounded-md"
        />
      ),
    },
    {
      headerName: 'Name',
      propertyName: 'name',
    },
    {
      headerName: 'Vendor',
      propertyName: 'description',
    },
    {
      headerName: 'Shop Type',
      propertyName: 'shopType',
    },
    {
      headerName: 'Action',
      propertyName: 'action',
      body: (rowData: ICuisine) => (
        <div className="three-dots">
          {isEditDeletePopupOpen._id === rowData?._id &&
          isEditDeletePopupOpen.bool ? (
            <div className="editdeletepoup-container" ref={editDeletePopupRef}>
              <EditDeletePopup
                setIsEditing={setIsEditing}
                setVisible={setVisible}
                setIsDeleting={setIsDeleting}
                data={rowData}
                visible={visible}
                setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
              />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="hover:scale-105 p-1 cursor-pointer"
              onClick={() =>
                setIsEditDeletePopupOpen({
                  _id: rowData?._id,
                  bool: true,
                })
              }
            />
          )}
        </div>
      ),
    },
  ];

  //handle final delete
  async function deleteItem() {
    try {
      await deleteCuisine({
        variables: {
          id: isDeleting?.data?._id,
        },
      });
      showToast({
        title: 'New Cuisine',
        type: 'success',
        message: 'Cuisine has been deleted successfully',
        duration: 2000,
      });
      let filteredCuisines = data?.cuisines?.filter(
        (cuisine) => cuisine._id !== isDeleting?.data?._id
      );
      if (filteredCuisines) {
        setCuisines(filteredCuisines);
      }
      setIsDeleting({
        bool: false,
        data: { ...isDeleting.data },
      });
    } catch (err) {
      console.log(err);
      showToast({
        title: 'Delete Cuisine',
        type: 'error',
        message: 'Cuisine Deletion Failed',
        duration: 2000,
      });
    }
  }

  //useEffects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editDeletePopupRef.current &&
        !editDeletePopupRef.current.contains(event.target as Node)
      ) {
        setIsEditDeletePopupOpen({ _id: '', bool: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsEditDeletePopupOpen]);
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
      <DeleteDialog
        onConfirm={deleteItem}
        onHide={() =>
          setIsDeleting({
            bool: false,
            data: {
              ...isDeleting.data,
            },
          })
        }
        visible={isDeleting.bool}
        loading={deleteCuisineLoading}
        message="Are you sure to delete the cuisine?"
      />
      <Table
        columns={cuisineColumns}
        data={cuisines}
        selectedData={selectedData}
        setSelectedData={(e) => setSelectedData(e as ICuisine[])}
        filters={filters}
        loading={loading ?? deleteCuisineLoading}
        header={
          <TableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            statusOptions={statusOptions}
          />
        }
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
