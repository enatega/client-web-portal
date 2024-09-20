//interfaces
import { ITableColumn } from '@/lib/utils/interfaces';
import {
  ICuisine,
  ICuisineTableProps,
} from '@/lib/utils/interfaces/cuisine.interface';

//icons
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import GenericTable from '@/lib/ui/useable-components/global-table';

//hooks
import { ToastContext } from '@/lib/context/toast.context';
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import { IEditPopupVal } from '@/lib/utils/interfaces/coupons.interface';

//queries
import { DELETE_CUISINE } from '@/lib/api/graphql';

//hooks
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import { useMutation } from '@apollo/client';
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
        title: 'Success',
        type: 'success',
        message: 'Cuisine deletion was successfull',
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
        title: 'Error',
        type: 'error',
        message: 'An unknown error occured, please try again',
        duration: 2000,
      });
    }
  }

  //columns
  const cuisineColums: ITableColumn<ICuisine>[] = [
    {
      header: 'Image',
      field: 'image',
      body: (data: ICuisine) => (
        <img
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
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Vendor',
      field: 'description',
    },
    {
      header: 'Shop Type',
      field: 'shopType',
    },
    {
      header: 'Action',
      field: 'action',
      body: (rowData: ICuisine) => (
        <div className="three-dots">
          {isEditDeletePopupOpen._id === rowData?._id &&
          isEditDeletePopupOpen.bool ? (
            <div className="editdeletepoup-container" ref={editDeletePopupRef}>
              <EditDeletePopup
                setIsEditing={setIsEditing}
                data={rowData}
                setVisible={setVisible}
                setIsDeleting={setIsDeleting}
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
    <>
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
      <GenericTable
        columns={cuisineColums}
        data={data ?? []}
        onSelectionChange={(e) => setSelectedData(e as ICuisine[])}
        selection={selectedData}
        loading={loading}
        filters={filters}
      />
    </>
  );
}
