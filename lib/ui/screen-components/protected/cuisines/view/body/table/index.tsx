//interfaces
import {
  ICuisine,
  ICuisineTableProps,
} from '@/lib/utils/interfaces/cuisine.interface';

//icons
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components

//hooks
import { ToastContext } from '@/lib/context/toast.context';
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import { IEditPopupVal } from '@/lib/utils/interfaces/coupons.interface';

//queries
import { DELETE_CUISINE } from '@/lib/api/graphql';

//hooks
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';
import { useMutation } from '@apollo/client';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';

export default function CuisineTable({
  data,
  loading,
  filters,
  setIsEditing,
  setCuisines,
  setIsDeleting,
  setVisible,
  visible,
  isDeleting,
  globalFilterValue,
  onGlobalFilterChange,
  selectedStatuses,
  setSelectedStatuses,
  statusOptions,
}: ICuisineTableProps) {
  //mutations
  const [deleteCuisine, { loading: deleteCuisineLoading }] =
    useMutation(DELETE_CUISINE);

  //toast
  const { showToast } = useContext(ToastContext);

  //refs
  const editDeletePopupRef = useRef<HTMLDivElement | null>(null);

  //states
  const [isEditDeletePopupOpen, setIsEditDeletePopupOpen] =
    useState<IEditPopupVal>({
      _id: '',
      bool: false,
    });
  const [selectedData, setSelectedData] = useState<ICuisine[]>([]);

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
      let filteredCuisines = data?.filter(
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
        data={data ?? []}
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
    </div>
  );
}
