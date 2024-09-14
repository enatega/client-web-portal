import { getCoupons } from '@/lib/api/graphql';
import CouponTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/coupons/CouponTable';
import GlobalButton from '@/lib/ui/useable-components/global-buttons/button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import {
  IGetCouponsData,
  IGetCouponsVariables,
} from '@/lib/utils/interfaces/coupons.interface';
import { useLazyQueryGlobal } from '@/lib/utils/methods/hooks/screen-hooks/global/useLazyQuery.hook';
import { gql } from '@apollo/client';
import { Sidebar } from 'primereact/sidebar';
import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
export default function CouponsScreen() {
  const [visible, setVisible] = useState(false);
  //query
  const GET_CUISINES = gql`
    ${getCoupons}
  `;
  const { data, executeLazyQuery, loading } = useLazyQueryGlobal<
    IGetCouponsData,
    IGetCouponsVariables
  >(GET_CUISINES, {});

  useEffect(() => {
    executeLazyQuery();
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-auto">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        Hello World
      </Sidebar>
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Coupons" className="mx-5" />
        <GlobalButton
          Icon={IoIosAddCircleOutline}
          title="Add Coupon"
          setVisible={setVisible}
        />
      </div>
      <CouponTable data={data} loading={loading} />
    </div>
  );
}
