import { GET_COUPONS } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { IEditState, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  ICoupon,
  ICouponMainProps,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';
import { IFilterType } from '@/lib/utils/interfaces/table.interface';
import { FilterMatchMode } from 'primereact/api';
import { ChangeEvent, useEffect, useState } from 'react';
import CouponForm from '../../form';
import CouponTable from '../body/table';

export default function CouponsMain({ setVisible, visible }: ICouponMainProps) {
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
    setCoupons((prevCoupons: ICoupon[]) => [
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
      setCoupons(filteredCoupons);
    } else {
      if (data?.coupons) {
        setCoupons(data.coupons);
      }
    }
  }, [selectedStatuses]);
  return (
    <div className="p-3">
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
