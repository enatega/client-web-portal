'use client';
import RiderAddForm from '@/lib/ui/screen-components/protected/riders/add-form';
import RidersMain from '@/lib/ui/screen-components/protected/riders/view/main';
import { useState } from 'react';

export default function RidersScreen() {
  //Add rider state
  const [isAddRiderVisible, setIsAddRiderVisible] = useState(false);

  return (
    <div className="px-6">
      <RidersMain setIsAddRiderVisible={setIsAddRiderVisible} />
      <RiderAddForm
        setIsAddRiderVisible={setIsAddRiderVisible}
        isAddRiderVisible={isAddRiderVisible}
      />
    </div>
  );
}
