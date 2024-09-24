'use client';
// Core
import { useState } from 'react';

// Components
import StaffHeader from '@/lib/ui/screen-components/protected/staff/view/header';
import StaffMain from '@/lib/ui/screen-components/protected/staff/view/main';

// Interfaces and Types
import StaffAddForm from '@/lib/ui/screen-components/protected/staff/add-form';
import { IStaffResponse } from '@/lib/utils/interfaces';

export default function StaffScreen() {
  // State
  const [isAddRiderVisible, setIsAddStaffVisible] = useState(false);
  const [staff, setStaff] = useState<null | IStaffResponse>(null);

  return (
    <div className="px-10 pt-5">
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
