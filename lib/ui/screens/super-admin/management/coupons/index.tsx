import { getCoupons } from '@/lib/api/graphql';
import AddCoupon from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/AddCoupon';
import CouponTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/CouponTable';
import GlobalButton from '@/lib/ui/useable-components/global-buttons/button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import {
  IGetCouponsData,
  IGetCouponsVariables,
} from '@/lib/utils/interfaces/coupons.interface';
import { useLazyQueryGlobal } from '@/lib/utils/methods/hooks/screen-hooks/global/useLazyQuery.hook';
import { gql } from '@apollo/client';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
export default function CouponsScreen() {
  //toast ref
  const toast = useRef<Toast>(null);
  //states
  const [visible, setVisible] = useState(false);
  //query
  const GET_COUPONS = gql`
    ${getCoupons}
  `;
  const { data, executeLazyQuery, loading } = useLazyQueryGlobal<
    IGetCouponsData,
    IGetCouponsVariables
  >(GET_COUPONS, {});

  useEffect(() => {
    executeLazyQuery();
  }, []);

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
          executeLazyQuery={executeLazyQuery}
        />
      </Sidebar>
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Coupons" className="mx-5" />
        <GlobalButton
          Icon={faCirclePlus}
          title="Add Coupon"
          setVisible={setVisible}
        />
      </div>
      <CouponTable data={data} loading={loading} />
    </div>
  );
}
