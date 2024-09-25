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
    <div className="flex flex-col mb-3 ml-2 gap-2 overflow-y-auto h-full">
      <CouponScreenHeader handleButtonClick={handleButtonClick} />
      <div className="flex-grow overflow-y-auto">
        <CouponsMain setVisible={setVisible} visible={visible} />
      </div>
    </div>
  );
}
