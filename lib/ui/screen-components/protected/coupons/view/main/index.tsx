// CSS
import './index.module.css';

// GraphQL
import { DELETE_COUPON, EDIT_COUPON, GET_COUPONS } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';

// Interfaces
import { IEditState, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  ICoupon,
  ICouponMainProps,
  IEditPopupVal,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';
import {
  IColumnConfig,
  IFilterType,
} from '@/lib/utils/interfaces/table.interface';

// Prime react
import { FilterMatchMode } from 'primereact/api';

// Hooks
import { useContext, useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';

// Components
import { ToastContext } from '@/lib/context/toast.context';
import CustomInputSwitch from '@/lib/ui/useable-components/custom-input-switch';
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import Table from '@/lib/ui/useable-components/table';
import CouponTableHeader from '../header/table-header';

// Icons
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CouponsMain({
  setVisible,
  visible,
  isEditing,
  setIsEditing,
}: ICouponMainProps) {
  // Toast
  const { showToast } = useContext(ToastContext);

  // Refs
  const editDeletePopupRef = useRef<HTMLDivElement | null>(null);

  // States
  const [isEditDeletePopupOpen, setIsEditDeletePopupOpen] =
    useState<IEditPopupVal>({
      _id: '',
      bool: false,
    });
  const [editCouponLoading, setEditCouponLoading] = useState({
    _id: '',
    bool: false,
  });
  const [selectedData, setSelectedData] = useState<ICoupon[]>([]);
  const [isDeleting, setIsDeleting] = useState<IEditState<ICoupon>>({
    bool: false,
    data: {
      __typename: '',
      _id: '',
      discount: 0,
      enabled: false,
      title: '',
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  // Filters
  const filters: IFilterType = {
    global: { value: globalFilterValue, matchMode: FilterMatchMode.CONTAINS },

    enabled: {
      value: selectedActions.length > 0 ? selectedActions : null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  };

  // Queries
  const { data, fetch, loading } = useLazyQueryQL(
    GET_COUPONS
  ) as ILazyQueryResult<IGetCouponsData | undefined, undefined>;

  // Mutations
  const [deleteCoupon, { loading: deleteCouponLoading }] = useMutation(
    DELETE_COUPON,
    {
      refetchQueries: [{ query: GET_COUPONS }],
      onCompleted: () => {
        showToast({
          title: 'Delete Coupon',
          type: 'success',
          message: 'Coupon has been deleted successfully',
          duration: 2000,
        });
      },
      onError: (err) => {
        showToast({
          title: 'Delete Coupon',
          type: 'error',
          message: err.message || 'An unknown error occured, please try again',
          duration: 2000,
        });
      },
    }
  );
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
        message: err.message || 'Something went wrong please try again',
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

  async function deleteItem() {
    await deleteCoupon({
      variables: {
        id: isDeleting?.data?._id,
      },
    });
    setIsDeleting({
      bool: false,
      data: { ...isDeleting.data },
    });
  }

  // Columns
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
              className="cursor-pointer p-1 hover:scale-105"
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

  // UseEffects
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
    if (isEditing.bool) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [data, isEditing.bool]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-3">
      <Table
        columns={columns}
        data={data?.coupons ?? []}
        selectedData={selectedData}
        setSelectedData={(e) => setSelectedData(e)}
        loading={loading}
        header={
          <CouponTableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={(e) => setGlobalFilterValue(e.target.value)}
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
          />
        }
        filters={filters}
      />
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
    </div>
  );
}
