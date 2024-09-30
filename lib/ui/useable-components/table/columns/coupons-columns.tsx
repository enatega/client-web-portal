// Interfaces
import { IActionMenuProps } from '@/lib/utils/interfaces';
import { ICoupon } from '@/lib/utils/interfaces/coupons.interface';

// Components
import CustomInputSwitch from '../../custom-input-switch';
import ActionMenu from '../../action-menu';

// Hooks
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';

//GraphQL
import { EDIT_COUPON, GET_COUPONS } from '@/lib/api/graphql';

// Contexts
import { ToastContext } from '@/lib/context/toast.context';

export const COUPONS_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps<ICoupon>['items'];
}) => {
  // Toast
  const { showToast } = useContext(ToastContext);

  // States
  const [editCouponLoading, setEditCouponLoading] = useState({
    _id: '',
    bool: false,
  });

  // Mutations
  const [editCoupon] = useMutation(EDIT_COUPON, {
    refetchQueries: [{ query: GET_COUPONS }],
    onCompleted: () => {
      showToast({
        title: 'Edit Coupon',
        type: 'success',
        message: 'Coupon Status has been edited successfully',
        duration: 2500,
      });
    },
    onError: (err) => {
      showToast({
        title: 'Edit Coupon',
        type: 'error',
        message: err.message || err?.cause?.message || 'Something went wrong please try again',
        duration: 2500,
      });
      setEditCouponLoading({
        bool: false,
        _id: '',
      });
    },
  });

  // Handlers
  async function handleEnableField(rowData: ICoupon) {
    setEditCouponLoading({
      bool: true,
      _id: rowData._id,
    });
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
  }

  return [
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
        <div className="flex w-full cursor-pointer items-center justify-between gap-2">
          <div className="flex w-20 items-start">
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
          <ActionMenu data={rowData} items={menuItems} />
        </div>
      ),
    },
  ];
};
