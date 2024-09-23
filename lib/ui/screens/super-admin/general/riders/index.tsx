// Core
import { useState } from 'react';

// Components
import RiderAddForm from '@/lib/ui/screen-components/protected/riders/add-form';
import RidersMain from '@/lib/ui/screen-components/protected/riders/view/main';

// Interfaces and Types

import RiderHeader from '@/lib/ui/screen-components/protected/riders/view/header/screen-header';
import { IRiderResponse } from '@/lib/utils/interfaces/rider.interface';

export default function RidersScreen() {
  // State
  const [isAddRiderVisible, setIsAddRiderVisible] = useState(false);
  const [rider, setRider] = useState<null | IRiderResponse>(null);

  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <RiderHeader setIsAddRiderVisible={setIsAddRiderVisible} />
      <div className="flex-grow overflow-y-auto">
        <RidersMain
          setIsAddRiderVisible={setIsAddRiderVisible}
          setRider={setRider}
        />
      </div>

      <RiderAddForm
        rider={rider}
        onHide={() => {
          setIsAddRiderVisible(false);
          setRider(null);
        }}
        isAddRiderVisible={isAddRiderVisible}
      />
    </div>
  );
}
