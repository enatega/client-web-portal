'use client';
// Core
import { useState } from 'react';

//Components
import BannersAddForm from '@/lib/ui/screen-components/protected/banner/add-form';
import BannersHeader from '@/lib/ui/screen-components/protected/banner/view/header';
import BannersMain from '@/lib/ui/screen-components/protected/banner/view/main';

// Interface
import { IBannersResponse } from '@/lib/utils/interfaces/banner.interface';

export default function BannerScreen() {
  // State
  const [isAddBannerVisible, setIsAddBannerVisible] = useState(false);
  const [banner, setBanner] = useState<IBannersResponse | null>(null);

  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <BannersHeader setIsAddBannerVisible={setIsAddBannerVisible} />
      <div className="flex-grow overflow-y-auto">
        <BannersMain
          setIsAddBannerVisible={setIsAddBannerVisible}
          setBanner={setBanner}
        />
      </div>
      <BannersAddForm
        banner={banner}
        onHide={() => {
          setIsAddBannerVisible(false);
          setBanner(null);
        }}
        isAddBannerVisible={isAddBannerVisible}
      />
    </div>
  );
}
