'use client';
// Core
import { useState } from 'react';

// Components
import StaffAddForm from '@/lib/ui/screen-components/protected/staff/add-form';
import StaffHeader from '@/lib/ui/screen-components/protected/staff/view/header/screen-header';
import StaffMain from '@/lib/ui/screen-components/protected/staff/view/main';

// Interfaces and Types
import { IStaffResponse } from '@/lib/utils/interfaces';

export default function StaffScreen() {
  // State
  const [isAddRiderVisible, setIsAddStaffVisible] = useState(false);
  const [staff, setStaff] = useState<null | IStaffResponse>(null);

  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <StaffHeader setIsAddStaffVisible={setIsAddStaffVisible} />
      <StaffMain
        setIsAddStaffVisible={setIsAddStaffVisible}
        setStaff={setStaff}
      />
      <StaffAddForm
        staff={staff}
        onHide={() => {
          setIsAddStaffVisible(false);
          setStaff(null);
        }}
        isAddStaffVisible={isAddRiderVisible}
      />
    </div>
  );
}
