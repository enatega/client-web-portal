'use client';
import BannersAddForm from '@/lib/ui/screen-components/protected/banner/add-form';
import BannersMain from '@/lib/ui/screen-components/protected/banner/view/main';
import { IBannersResponse } from '@/lib/utils/interfaces/banner.interface';
import { useState } from 'react';

export default function BannerScreen() {
  //Hooks
  const [isAddBannerVisible, setIsAddBannerVisible] = useState(false);
  const [banner, setBanner] = useState<null | IBannersResponse>(null);

  // to prevent lint error until the add feat is added
  console.log(isAddBannerVisible);

  return (
    <div className="px-6">
      <BannersMain
        setIsAddBannerVisible={setIsAddBannerVisible}
        setBanner={setBanner}
      />
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
