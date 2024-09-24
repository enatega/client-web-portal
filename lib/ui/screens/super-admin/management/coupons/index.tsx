//screen components
import CouponScreenHeader from '@/lib/ui/screen-components/protected/coupons/view/header';
import CouponsMain from '@/lib/ui/screen-components/protected/coupons/view/main';
//hooks
import { useState } from 'react';

export default function CouponsScreen() {
  //states
  const [visible, setVisible] = useState(false);

  //toggle visibility
  const handleButtonClick = () => {
    setVisible(true);
  };

  return (
    <div className="flex flex-col mb-3 gap-6 overflow-y-auto h-full">
      <CouponScreenHeader handleButtonClick={handleButtonClick} />
      <CouponsMain setVisible={setVisible} visible={visible} />
    </div>
  );
}
