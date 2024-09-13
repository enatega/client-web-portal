'use client';
import BannersMain from '@/lib/ui/screen-components/protected/banner/view/main';
import { useState } from 'react';

export default function BannerScreen() {
  //Hooks
  const [isAddBannerVisible, setIsAddBannerVisible] = useState(false);

  // to prevent lint error until the add feat is added
  console.log(isAddBannerVisible);

  return (
    <div className="px-6">
      <BannersMain setIsAddBannerVisible={setIsAddBannerVisible} />
    </div>
  );
}
