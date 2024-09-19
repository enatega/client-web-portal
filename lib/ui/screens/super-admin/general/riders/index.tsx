// Core
import { useState } from 'react';

// Components
import RiderAddForm from '@/lib/ui/screen-components/protected/riders/add-form';
import RidersMain from '@/lib/ui/screen-components/protected/riders/view/main';
import { IRiderResponse } from '@/lib/utils/interfaces/rider.interface';

export default function RidersScreen() {
  // State
  const [isAddRiderVisible, setIsAddRiderVisible] = useState(false);
  const [rider, setRider] = useState<null | IRiderResponse>(null);

  return (
    <div className="px-6">
      <RidersMain
        setIsAddRiderVisible={setIsAddRiderVisible}
        setRider={setRider}
      />
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
