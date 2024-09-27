//css
import './index.module.css';

//graphQL
import { DELETE_COUPON, EDIT_COUPON, GET_COUPONS } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';

//interfaces
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

//prime react
import { FilterMatchMode } from 'primereact/api';

//hooks
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

//components
import { ToastContext } from '@/lib/context/toast.context';
import CustomInputSwitch from '@/lib/ui/useable-components/custom-input-switch';
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';
import { useMutation } from '@apollo/client';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CouponsMain({
  setVisible,
  visible,
  isEditing,
  setIsEditing,
}: ICouponMainProps) {
  //refs
  const editDeletePopupRef = useRef<HTMLDivElement | null>(null);

  //queries
  const [deleteCoupon, { loading: deleteCouponLoading }] = useMutation(
    DELETE_COUPON,
    {
      refetchQueries: [{ query: GET_COUPONS }],
    }
  );
  const [editCoupon] = useMutation(EDIT_COUPON, {
    refetchQueries: [{ query: GET_COUPONS }],
  });

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

  //filters
  const [filters, setFilters] = useState<IFilterType>({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
    status: { value: '', matchMode: FilterMatchMode.EQUALS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  //global filters change
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;
    // fetch({ variables: { filter: { ...filters, global: { value } } } });
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  //options
  let statusOptions = [
    {
      label: 'Enabled',
      code: 'enabled',
    },
    {
      label: 'Disabled',
      code: 'disabled',
    },
    {
      label: 'All',
      code: 'all',
    },
  ];

  //query
  const { data, fetch, loading } = useLazyQueryQL(
    GET_COUPONS,
    {}
  ) as ILazyQueryResult<IGetCouponsData | undefined, undefined>;
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
        type: 'success',
        message: 'Coupon Status has been edited successfully',
        duration: 2500,
      });
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
    fetch();
  }, []);

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

  return (
    <div>
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
      <Table
        columns={columns}
        data={data?.coupons ?? []}
        selectedData={selectedData}
        setSelectedData={(e) => setSelectedData(e)}
        loading={loading}
        header={
          <TableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            selectedStatuses={selectedStatuses}
            setFilters={setFilters}
            setSelectedStatuses={setSelectedStatuses}
            statusOptions={statusOptions}
          />
        }
        filters={filters}
      />
    </div>
  );
}
