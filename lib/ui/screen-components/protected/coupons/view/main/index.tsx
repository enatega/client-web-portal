//css
import './index.css';

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
import CouponForm from '../../form';

export default function CouponsMain({ setVisible, visible }: ICouponMainProps) {
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
  // edit/delete states which are to be circulated in the whole coupons module
  const [isEditing, setIsEditing] = useState<IEditState<ICoupon>>({
    bool: false,
    data: {
      __typename: '',
      _id: '',
      discount: 0,
      enabled: false,
      title: '',
    },
  });
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
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  //global filters change
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [coupons, setCoupons] = useState<ICoupon[]>([]);
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

  //handle add cuisine locally to append child in the cuisine array
  const handleAddCouponLocally = (coupon: ICoupon) => {
    setSortedData(
      (prevCoupons: ICoupon[] | null | undefined) =>
        prevCoupons && [
          coupon,
          ...prevCoupons.filter((c) => c._id !== coupon._id),
        ]
    );
    setIsEditing({
      bool: false,
      data: { ...isEditing.data },
    });
    setIsDeleting({
      bool: false,
      data: { ...isEditing.data },
    });
  };

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
      let filteredCoupons = data?.coupons.filter(
        (coupon) => coupon._id !== isDeleting?.data?._id
      );
      if (filteredCoupons) {
        setSortedData(filteredCoupons);
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
    setSortedData(data?.coupons);
  }, [data]);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (data) {
      setCoupons(data.coupons);
    }
    if (isEditing.bool) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [data, isEditing.bool]);

  useEffect(() => {
    let filteredCoupons: ICoupon[];

    if (selectedStatuses.length > 0) {
      const enabledSelected = selectedStatuses.some(
        (status: string) => status === 'enabled'
      );
      const disabledSelected = selectedStatuses.some(
        (status: string) => status === 'disabled'
      );
      const bothEnabledAndDisabled = enabledSelected && disabledSelected;

      filteredCoupons = coupons.filter((coupon) =>
        selectedStatuses.some((status) =>
          status === 'all'
            ? true
            : enabledSelected
              ? coupon.enabled
              : disabledSelected
                ? !coupon.enabled
                : bothEnabledAndDisabled
        )
      );
      setSortedData(filteredCoupons);
    } else {
      if (data?.coupons) {
        setSortedData(data.coupons);
      }
    }
  }, [selectedStatuses]);
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
      {sortedData && (
        <Table
          columns={columns}
          data={sortedData}
          selectedData={selectedData}
          setSelectedData={(e) => setSelectedData(e)}
          loading={loading}
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
      <CouponForm
        coupons={coupons}
        isEditing={isEditing}
        visible={visible}
        handleAddCouponLocally={handleAddCouponLocally}
        setCoupons={setCoupons}
        setIsEditing={setIsEditing}
        setVisible={setVisible}
      />
    </div>
  );
}
