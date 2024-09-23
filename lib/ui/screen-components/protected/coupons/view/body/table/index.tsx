//css
import './index.css';

//interfaces
import {
  ICoupon,
  ICouponsTableProps,
  IEditPopupVal,
} from '@/lib/utils/interfaces/coupons.interface';

//icons
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//queries
import { DELETE_COUPON, EDIT_COUPON } from '@/lib/api/graphql';

//contexts
import { ToastContext } from '@/lib/context/toast.context';

//hooks
import CustomInputSwitch from '@/lib/ui/useable-components/custom-input-switch';
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useRef, useState } from 'react';

export default function CouponTable({
  data,
  loading,
  filters,
  setIsEditing,
  setCoupons,
  setIsDeleting,
  setVisible,
  visible,
  isDeleting,
  globalFilterValue,
  onGlobalFilterChange,
  statusOptions,
  setSelectedStatuses,
  selectedStatuses,
}: ICouponsTableProps) {
  //refs
  const editDeletePopupRef = useRef<HTMLDivElement | null>(null);

  //queries
  const [deleteCoupon, { loading: deleteCouponLoading }] =
    useMutation(DELETE_COUPON);
  const [editCoupon] = useMutation(EDIT_COUPON);

  //states
  const [isEditDeletePopupOpen, setIsEditDeletePopupOpen] =
    useState<IEditPopupVal>({
      _id: '',
      bool: false,
    });
  const [editCouponLoading, setEditCouponLoading] = useState({
    _id: '',
    bool: false,
  });
  const [sortedData, setSortedData] = useState<ICoupon[] | null | undefined>();
  const [selectedData, setSelectedData] = useState<ICoupon[]>([]);

  //toast
  const { showToast } = useContext(ToastContext);

  // handle enabled toggle (locally)
  async function handleEnableField(rowData: ICoupon) {
    setEditCouponLoading({
      bool: true,
      _id: rowData._id,
    });
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
      setEditCouponLoading({
        bool: false,
        _id: '',
      });
      showToast({
        title: 'Edit Coupon',
        type: 'info',
        message: 'Coupon Status has been edited successfully',
        duration: 2500,
      });
      const coupon = sortedData?.find((coupon) => coupon._id === rowData?._id);
      const filteredData = sortedData?.filter(
        (coupon) => coupon._id !== rowData?._id
      );
      const newUpdatedCoupon = { ...rowData, enabled: !coupon?.enabled };
      if (filteredData) {
        setSortedData(() => [newUpdatedCoupon, ...filteredData]);
      }
    } catch (err) {
      showToast({
        title: 'Edit Coupon',
        type: 'error',
        message: 'Something went wrong please try again',
        duration: 2500,
      });
      setEditCouponLoading({
        bool: false,
        _id: '',
      });
    }
  }

  //handle final delete
  async function deleteItem() {
    try {
      await deleteCoupon({
        variables: {
          id: isDeleting?.data?._id,
        },
      });
      showToast({
        title: 'Delete Coupon',
        type: 'success',
        message: 'Coupon has been deleted successfully',
        duration: 2000,
      });
      let filteredCoupons = data?.filter(
        (coupon) => coupon._id !== isDeleting?.data?._id
      );
      if (filteredCoupons) {
        setCoupons(filteredCoupons);
      }
      setIsDeleting({
        bool: false,
        data: { ...isDeleting.data },
      });
    } catch (err) {
      console.log(err);
      showToast({
        title: 'Delete Coupon',
        type: 'error',
        message: 'An unknown error occured, please try again',
        duration: 2000,
      });
    }
  }

  //column
  const columns: IColumnConfig<ICoupon>[] = [
    {
      headerName: 'Name',
      propertyName: '__typename',
    },
    {
      headerName: 'Code',
      propertyName: 'title',
    },
    {
      headerName: 'Discount',
      propertyName: 'discount',
    },
    {
      headerName: 'Status',
      propertyName: 'enabled',
      body: (rowData: ICoupon) => (
        <div className="flex gap-2 items-center w-full justify-between cursor-pointer">
          <div className="w-20 flex items-start">
            <CustomInputSwitch
              isActive={rowData.enabled}
              className={
                rowData?.enabled ? 'p-inputswitch-checked absolute' : 'absolute'
              }
              onChange={() => handleEnableField(rowData)}
              loading={
                editCouponLoading.bool && rowData._id === editCouponLoading._id
              }
            />
          </div>
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

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <div className="ml-2">
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
      {sortedData && (
        <Table
          columns={columns}
          data={sortedData}
          selectedData={selectedData}
          setSelectedData={(e) => setSelectedData(e)}
          loading={loading ?? deleteCouponLoading}
          header={
            <TableHeader
              globalFilterValue={globalFilterValue}
              onGlobalFilterChange={onGlobalFilterChange}
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
              statusOptions={statusOptions}
            />
          }
          filters={filters}
        />
      )}
    </div>
  );
}