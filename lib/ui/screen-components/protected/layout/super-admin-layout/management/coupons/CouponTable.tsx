//css
import './index.css';

//interfaces
import { ITableColumn } from '@/lib/utils/interfaces';
import {
  ICoupon,
  ICouponsTableProps,
  IEditPopupVal,
} from '@/lib/utils/interfaces/coupons.interface';

//icons
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import GenericTable from '../../../../../../useable-components/global-table';

//prime react
import { InputSwitch } from 'primereact/inputswitch';

//queries
import { DELETE_COUPON, EDIT_COUPON } from '@/lib/api/graphql';

//contexts
import { ToastContext } from '@/lib/context/toast.context';

//lodash
import { debounce } from 'lodash';

//hooks
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useRef, useState } from 'react';

export default function CouponTable({
  data,
  loading,
  filters,
  setIsEditing,
  setIsDeleting,
  setVisible,
  visible,
  isDeleting,
}: ICouponsTableProps) {
  //refs
  const editDeletePopupRef = useRef<HTMLDivElement | null>(null);

  //delete queries
  const [
    deleteCoupon,
    { data: deleteCouponData, loading: deleteCouponLoading },
  ] = useMutation(DELETE_COUPON);

  const [editCoupon, { data: editCouponData, loading: editCouponLoading }] =
    useMutation(EDIT_COUPON);

  //states
  const [isEditPopupOpen, setIsEditDeletePopupOpen] = useState<IEditPopupVal>({
    _id: '',
    bool: false,
  });
  const [sortedData, setSortedData] = useState<ICoupon[] | null | undefined>();
  const [selectedData, setSelectedData] = useState<ICoupon[]>([]);

  //toast
  const { showToast } = useContext(ToastContext);

  // handle enabled toggle
  function handleEnableField(rowData: ICoupon) {
    const coupon = sortedData?.find((d) => d._id === rowData?._id);
    const filteredData = sortedData?.filter((d) => d._id !== rowData?._id);
    const updatedCoupon = { ...rowData, enabled: !coupon?.enabled };
    if (filteredData) {
      setSortedData(() => [updatedCoupon, ...filteredData]);
    }
  }

  //handle toggle mutation (edit)
  async function handleSubmitToggleState(rowData: ICoupon) {
    try {
      const updatedCoupon = {
        _id: rowData?._id,
        title: rowData?.title,
        discount: rowData?.discount,
        enabled: !rowData?.enabled,
      };
      await editCoupon({
        variables: {
          couponInput: updatedCoupon,
        },
      });
      showToast({
        title: 'Info',
        type: 'info',
        message: 'Operation successfull!',
        duration: 2500,
      });
    } catch (err) {
      showToast({
        title: 'Error',
        type: 'error',
        message: 'Something went wrong please try again',
        duration: 2500,
      });
    }
  }

  //debounce toggle state
  const optimizedToggleFunction = debounce(handleSubmitToggleState, 2000);

  //handle final delete
  async function deleteItem() {
    try {
      await deleteCoupon({
        variables: {
          id: deleteCouponData?.data?._id,
        },
      });
      showToast({
        title: 'Success',
        type: 'success',
        message: 'Coupon deletion was successfull',
        duration: 2000,
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

  //column
  const columns: ITableColumn<ICoupon>[] = [
    {
      header: 'Name',
      field: '__typename',
    },
    {
      header: 'Code',
      field: 'title',
    },
    {
      header: 'Discount',
      field: 'discount',
    },
    {
      header: 'Status',
      field: 'enabled',
      body: (rowData: ICoupon) => (
        <div className="flex gap-2 items-center w-full justify-between">
          <InputSwitch
            checked={rowData?.enabled}
            disabled={
              editCouponLoading &&
              editCouponData?.editCoupon?._id === rowData?._id
            }
            className={rowData?.enabled ? 'p-inputswitch-checked' : ''}
            onChange={() => handleEnableField(rowData)}
            onClick={() => optimizedToggleFunction(rowData)}
          />
          {isEditPopupOpen._id === rowData?._id && isEditPopupOpen.bool ? (
            <div className="editdeletepoup-container" ref={editDeletePopupRef}>
              <EditDeletePopup
                setIsEditing={setIsEditing}
                data={rowData}
                setVisible={setVisible}
                setIsDeleting={setIsDeleting}
                visible={visible}
              />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="hover:scale-105 p-1"
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

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <>
      <DeleteDialog
        onConfirm={deleteItem}
        onHide={() =>
          setIsDeleting({
            bool: false,
            data: {
              __typename: '',
              _id: '',
              discount: 0,
              enabled: false,
              title: '',
            },
          })
        }
        visible={isDeleting.bool}
        loading={deleteCouponLoading}
        message="Are you sure to delete the coupon?"
      />
      <GenericTable
        columns={columns}
        data={sortedData}
        onSelectionChange={(e) => setSelectedData(e as ICoupon[])}
        selection={selectedData}
        loading={loading ?? deleteCouponLoading}
        filters={filters}
      />
    </>
  );
}
