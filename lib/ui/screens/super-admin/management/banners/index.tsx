'use client';
import BannersMain from '@/lib/ui/screen-components/protected/banner/view/main';
import { useState } from 'react';

export default function BannerScreen() {
  //Add rider state
  const [isAddBannerVisible, setIsAddBannerVisible] = useState(false);
  console.log(isAddBannerVisible);
  return (
    <div className="px-6">
      <BannersMain setIsAddBannerVisible={setIsAddBannerVisible} />
      {/* <BannerAddForm
        setIsAddBannerVisible={setIsAddBannerVisible}
        isAddBannerVisible={isAddBannerVisible}
      /> */}
    </div>
  );
}
