'use client';

// Core
import React, { useState } from 'react';

// Interfaces
import { IZoneResponse } from '@/lib/utils/interfaces';

// Components
import ZoneAddForm from '@/lib/ui/screen-components/protected/zone/form';
import ZoneHeader from '@/lib/ui/screen-components/protected/zone/view/header/screen-header';
import ZoneMain from '@/lib/ui/screen-components/protected/zone/view/main';

export default function ZoneScreen() {
  // States
  const [isAddRiderVisible, setIsAddRiderVisible] = useState(false);
  const [zone, setZone] = useState<IZoneResponse | null>(null);

  return (
    <>
      <div className="flex flex-col p-3 h-screen overflow-hidden">
        <ZoneHeader setIsAddZoneVisible={setIsAddRiderVisible} />
        <div className="flex-grow overflow-y-auto">
          <ZoneMain
            setIsAddZoneVisible={setIsAddRiderVisible}
            setZone={setZone}
          />
        </div>

        <ZoneAddForm
          isAddZoneVisible={isAddRiderVisible}
          onHide={() => setIsAddRiderVisible(false)}
          zone={zone}
        />
      </div>
    </>
  );
}
