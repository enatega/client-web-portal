// Core
import { useState } from 'react';

// Components
import PaymentMain from '@/lib/ui/screen-components/protected/payment/main';
import PaymentHeader from '@/lib/ui/screen-components/protected/payment/header/screen-header';

export default function PaymentScreen() {
  const [, setIsAddPaymentVisible] = useState(false);

  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <PaymentHeader setIsAddPaymentVisible={setIsAddPaymentVisible} />
      <div className="flex-grow overflow-y-auto">
        <PaymentMain />
      </div>
    </div>
  );
}
