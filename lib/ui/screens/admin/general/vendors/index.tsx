'use client';

import VendorAddForm from '@/lib/ui/screen-components/protected/vendor/add-form';
import VendorHeader from '@/lib/ui/screen-components/protected/vendor/view/header';
import VendorMain from '@/lib/ui/screen-components/protected/vendor/view/main';
import VendorMobilesTabs from '@/lib/ui/screen-components/protected/vendor/view/mobile-tabs';
import { options } from '@/lib/utils/constants';
import { TVendorMobileTabs } from '@/lib/utils/types';
import { useState } from 'react';

export default function VendorsScreen() {
  // States
  const [selectedVendorFilter, setSelectedVendorFilter] = useState<string>(
    options[1]
  );
  const [selectedRestaurantFilter, setSelectedResturantFilter] =
    useState<string>(options[1]);
  const [activeTab, setActiveTab] = useState<TVendorMobileTabs>('vendors');

  // Context

  return (
    <div className="flex flex-col h-screen">
      <VendorHeader
        selectedVendorFilter={selectedVendorFilter}
        setSelectedVendorFilter={setSelectedVendorFilter}
      />

      <VendorMobilesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <VendorMain
        // States
        activeTab={activeTab}
        selectedVendorFilter={selectedVendorFilter}
        selectedRestaurantFilter={selectedRestaurantFilter}
        // State Function
        setActiveTab={setActiveTab}
        setSelectedResturantFilter={setSelectedResturantFilter}
        setSelectedVendorFilter={setSelectedVendorFilter}
      />

      <VendorAddForm />
    </div>
  );
}
