'use client';
import RiderAddForm from '@/lib/ui/screen-components/protected/riders/add-form/add-form';
import RidersHeader from '@/lib/ui/screen-components/protected/riders/header/header';
import RidersMain from '@/lib/ui/screen-components/protected/riders/main/main';
import { useState } from 'react';

export default function RidersScreen() {
  //Add rider state
  const [isAddRiderVisible, setIsAddRiderVisible] = useState(false);

  return (
    <div className="card">
      <RiderAddForm
        setIsAddRiderVisible={setIsAddRiderVisible}
        isAddRiderVisible={isAddRiderVisible}
      />
      <RidersHeader setIsAddRiderVisible={setIsAddRiderVisible} />
      <RidersMain />
    </div>
  );
}
