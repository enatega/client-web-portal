import { GET_COUPONS } from '@/lib/api/graphql/query/coupons';
import AddCoupon from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/AddCoupon';
import CouponTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/CouponTable';
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  ICoupon,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { Sidebar } from 'primereact/sidebar';

import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { useEffect, useState } from 'react';
export default function CouponsScreen() {
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
    setCoupons((prevCoupons) => [coupon, ...prevCoupons]);
  };
  //fetch
  useEffect(() => {
    fetch();
  }, []);

  //appending coupons
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
      <CouponTable data={coupons} loading={loading} />
    </div>
  );
}
