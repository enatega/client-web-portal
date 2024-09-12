import { QueryContext } from '@/lib/context/query-context';
import CouponTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/CouponTable';
import GlobalButton from '@/lib/ui/useable-components/global-buttons/button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import { useContext } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
export default function CouponsScreen() {
  const { coupons } = useContext(QueryContext);
  return (
    <div className="flex flex-col items-center w-full h-auto">
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Coupons" className="mx-5" />
        <GlobalButton Icon={IoIosAddCircleOutline} title="Add Coupon" />
      </div>
      {/* {coupons.loading ? <Loader /> : <CouponTable coupons={coupons} />} */}
      {<CouponTable coupons={coupons} />}
    </div>
  );
}
