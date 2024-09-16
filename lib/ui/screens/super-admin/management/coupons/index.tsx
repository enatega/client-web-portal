import { GET_COUPONS } from '@/lib/api/graphql/query/coupons';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import AddCoupon from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/AddCoupon';
import CouponTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/CouponTable';
// import GlobalButton from '@/lib/ui/useable-components/global-buttons/button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { IQueryResult } from '@/lib/utils/interfaces';
import { IGetCouponsData } from '@/lib/utils/interfaces/coupons.interface';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
export default function CouponsScreen() {
  //toast ref
  const toast = useRef<Toast>(null);
  //states
  const [visible, setVisible] = useState(false);

  const { data, fetch, loading } = useLazyQueryQL(
    GET_COUPONS,
    {}
  ) as IQueryResult<IGetCouponsData | undefined, undefined>;
  useEffect(() => {
    fetch();
  }, []);
  const handleButtonClick = () => {
    setVisible(true);
  };
  return (
    <div className="flex flex-col items-center w-full h-auto">
      <Toast ref={toast} position="top-left" />
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <AddCoupon
          setVisible={setVisible}
          toast={toast}
          executeLazyQuery={fetch}
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
      <CouponTable data={data?.coupons} loading={loading} />
    </div>
  );
}
