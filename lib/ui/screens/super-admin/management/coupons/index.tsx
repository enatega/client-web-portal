//components
import AddCoupon from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/AddCoupon';
import CouponTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/CouponTable';
import CustomActionActionButton from '@/lib/ui/useable-components/custom-action-button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

//interfaces
import {
  ICoupon,
  IEditState,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';

//icons
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';

//prime react
import { FilterMatchMode } from 'primereact/api';
import { Sidebar } from 'primereact/sidebar';

//queries
import { GET_COUPONS } from '@/lib/api/graphql';

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { ILazyQueryResult } from '@/lib/utils/interfaces';
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
  const [filters, setFilters] = useState({
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
  return (
    <div className="flex flex-col items-center w-full h-auto">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <AddCoupon
          setVisible={setVisible}
          setCoupons={setCoupons}
          handleAddCouponLocally={handleAddCouponLocally}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          coupons={coupons}
        />
      </Sidebar>
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Coupons" className="mx-5" />
        <TextIconClickable
          icon={faCirclePlus}
          iconStyles={{ color: 'white' }}
          onClick={handleButtonClick}
          title="Add Coupon"
          className="bg-black text-white p-2 rounded-md"
        />
      </div>
      <div className="self-start flex items-center justify-center gap-x-3">
        <CustomTextField
          name="searchQuery"
          onChange={onGlobalFilterChange}
          value={globalFilterValue}
          showLabel={false}
          placeholder="Filter tasks..."
          type="text"
          className="w-96"
        />
        <CustomActionActionButton Icon={faPlus} title="Action" />
      </div>
      <CouponTable
        data={coupons}
        loading={loading}
        filters={filters}
        setIsEditing={setIsEditing}
        setIsDeleting={setIsDeleting}
        setVisible={setVisible}
        visible={visible}
        isDeleting={isDeleting}
        setCoupons={setCoupons}
      />
    </div>
  );
}
