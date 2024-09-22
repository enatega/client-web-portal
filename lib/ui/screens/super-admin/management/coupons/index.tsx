//components
import CouponTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/CouponTable';

//interfaces
import { IEditState, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  ICoupon,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';

//icons

//prime react
import { FilterMatchMode } from 'primereact/api';

//queries
import { GET_COUPONS } from '@/lib/api/graphql';

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import CouponScreenHeader from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/CouponScreenHeader';
import { IFilterType } from '@/lib/utils/interfaces/table.interface';
import { ChangeEvent, useEffect, useState } from 'react';

export default function CouponsScreen() {
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

  //states
  const [visible, setVisible] = useState(false);
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

  //toggle visibility
  const handleButtonClick = () => {
    setVisible(true);
  };

  //handle add cuisine locally to append child in the cuisine array
  const handleAddCouponLocally = (coupon: ICoupon) => {
    setCoupons((prevCoupons) => [
      coupon,
      ...prevCoupons.filter((c) => c._id !== coupon._id),
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

  //useEffects
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
        (status) => status === 'enabled'
      );
      const disabledSelected = selectedStatuses.some(
        (status) => status === 'disabled'
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
      setCoupons(filteredCoupons);
    } else {
      if (data?.coupons) {
        setCoupons(data.coupons);
      }
    }
  }, [selectedStatuses]);

  return (
    <div className="flex flex-col mb-3 gap-6 overflow-y-auto h-full">
      <CouponScreenHeader
        visible={visible}
        coupons={coupons}
        isEditing={isEditing}
        handleButtonClick={handleButtonClick}
        handleAddCouponLocally={handleAddCouponLocally}
        setCoupons={setCoupons}
        setIsEditing={setIsEditing}
        setVisible={setVisible}
      />

      <CouponTable
        data={coupons}
        loading={loading}
        filters={filters}
        visible={visible}
        isDeleting={isDeleting}
        globalFilterValue={globalFilterValue}
        statusOptions={statusOptions}
        selectedStatuses={selectedStatuses}
        setCoupons={setCoupons}
        onGlobalFilterChange={onGlobalFilterChange}
        setIsEditing={setIsEditing}
        setSelectedStatuses={setSelectedStatuses}
        setIsDeleting={setIsDeleting}
        setVisible={setVisible}
      />
    </div>
  );
}
