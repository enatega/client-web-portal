// Core
import { useState } from 'react';

// Components
import CommissionRateMain from '@/lib/ui/screen-components/protected/commissionRate/view/main';
import CommissionRateHeader from '@/lib/ui/screen-components/protected/commissionRate/view/header/screen-header';

export default function CommissionRateScreen() {
  const [, setIsAddCommissionVisible] = useState(false);
  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <CommissionRateHeader
        setIsAddCommissionRateVisible={setIsAddCommissionVisible}
      />
      <div className="flex-grow overflow-y-auto">
        <CommissionRateMain />
      </div>
    </div>
  );
}
