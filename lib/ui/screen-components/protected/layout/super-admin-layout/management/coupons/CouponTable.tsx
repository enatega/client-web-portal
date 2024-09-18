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
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import GenericTable from '../../../../../../useable-components/global-table';

//prime react
import { InputSwitch } from 'primereact/inputswitch';

//queries
import { DELETE_COUPON, EDIT_COUPON } from '@/lib/api/graphql';

//hooks
import { ToastContext } from '@/lib/context/toast.context';
import { useMutation } from '@apollo/client';
import { debounce } from 'lodash';
import { useContext, useState } from 'react';

export default function CouponTable({
  data,
  loading,
  filters,
}: ICouponsTableProps) {
  //filters

  //delete queries
  const [
    deleteCoupon,
    {
      error: deleteCouponError,
      data: deleteCouponData,
      loading: deleteCouponLoading,
    },
  ] = useMutation(DELETE_COUPON);
  //temporary console
  console.log(
    deleteCoupon,
    deleteCouponData,
    deleteCouponError,
    deleteCouponLoading
  );
  const [
    editCoupon,
    {
      data: editCouponData,
      loading: editCouponLoading,
      error: editCouponError,
    },
  ] = useMutation(EDIT_COUPON);

  //states
  const [isEditPopupOpen, setIsEditDeletePopupOpen] = useState<IEditPopupVal>({
    _id: '',
    bool: false,
  });
  const [sortedData, setSortedData] = useState<ICoupon[] | null | undefined>(
    data
  );
  const [selectedData, setSelectedData] = useState<ICoupon[]>([]);

  //toast
  const { showToast } = useContext(ToastContext);

  // handle enabled toggle
  function handleEnableField(rowData: ICoupon) {
    const coupon = sortedData?.find((d) => d._id === rowData._id);
    const filteredData = sortedData?.filter((d) => d._id !== rowData._id);
    const updatedCoupon = { ...rowData, enabled: !coupon?.enabled };
    if (filteredData) {
      setSortedData(() => [updatedCoupon, ...filteredData]);
    }
  }
  //handle toggle mutation (edit)
  async function handleSubmitToggleState(rowData: ICoupon) {
    try {
      const updatedCoupon = {
        _id: rowData._id,
        title: rowData.title,
        discount: rowData.discount,
        enabled: !rowData.enabled,
      };
      await editCoupon({
        variables: {
          couponInput: updatedCoupon,
        },
      });
      showToast({
        type: 'info',
        message: 'Operation successfull!',
      });
    } catch (err) {
      showToast({
        type: 'error',
        message:
          editCouponError?.message ||
          editCouponError?.graphQLErrors[0].message ||
          'Something went wrong please try again',
      });
    }
  }

  //debounce toggle state
  const optimizedToggleFunction = debounce(handleSubmitToggleState, 2000);

  //handle final delete
  // async function deleteItem() {
  //   try {
  //     await deleteCoupon({
  //       variables: {
  //         id: deleteCouponData?._id,
  //       },
  //     });
  //     showToast({
  //       type: 'success',
  //       message: 'Coupon deletion was successfull',
  //       life: 2000,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     showToast({
  //       type: 'error',
  //       message:
  //         'An unknown error occured, please try again' ||
  //         deleteCouponError?.graphQLErrors[0].message ||
  //         deleteCouponError?.message,
  //       life: 2000,
  //     });
  //   }
  // }
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
            checked={rowData.enabled}
            disabled={
              editCouponLoading &&
              editCouponData?.editCoupon?._id === rowData?._id
            }
            className={rowData.enabled ? 'p-inputswitch-checked' : ''}
            onChange={() => handleEnableField(rowData)}
            onClick={() => optimizedToggleFunction(rowData)}
          />
          {isEditPopupOpen._id === rowData._id && isEditPopupOpen.bool ? (
            <EditDeletePopup
              setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
              data={rowData}
              type="coupon"
            />
          ) : (
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="hover:scale-105 p-1"
              onClick={() =>
                setIsEditDeletePopupOpen({
                  _id: rowData._id,
                  bool: true,
                })
              }
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <GenericTable
      columns={columns}
      data={sortedData}
      onSelectionChange={(e) => setSelectedData(e as ICoupon[])}
      selection={selectedData}
      loading={loading}
      filters={filters}
    />
  );
}
