//components
import AddCoupon from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/AddCoupon';
import CouponTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/CouponTable';
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

//interfaces
import { IQueryResult } from '@/lib/utils/interfaces';
import {
  ICoupon,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';

//icons
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

//prime react
import { Sidebar } from 'primereact/sidebar';

//queries
import { GET_COUPONS } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import CustomActionActionButton from '@/lib/ui/useable-components/custom-action-button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import { FilterMatchMode } from 'primereact/api';
import { ChangeEvent, useEffect, useState } from 'react';

export default function CouponsScreen() {
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
  const [editData, setEditData] = useState<ICoupon>();
  const [isEditing, setIsEditing] = useState(false);

  //query
  const { data, fetch, loading } = useLazyQueryQL(
    GET_COUPONS,
    {}
  ) as IQueryResult<IGetCouponsData | undefined, undefined>;

  //toggle visibility
  const handleButtonClick = () => {
    setVisible(true);
  };
  //handle add cuisine locally to append child in the cuisine array
  const handleAddCouponLocally = (coupon: ICoupon) => {
    setCoupons((prevCoupons) => [coupon, ...prevCoupons]);
  };

  //useEffects
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    if (data) {
      setCoupons(data.coupons);
    }
  }, [data]);
  return (
    <div className="flex flex-col items-center w-full h-auto">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <AddCoupon
          setVisible={setVisible}
          setCoupons={handleAddCouponLocally}
          editData={editData}
          setEditData={setEditData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
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
        <CustomActionActionButton Icon={faCirclePlus} title="Action" />
      </div>
      <CouponTable data={coupons} loading={loading} filters={filters} />
    </div>
  );
}
