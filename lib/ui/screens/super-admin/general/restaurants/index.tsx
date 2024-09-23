'use client';
import RestaurantsForm from '@/lib/ui/screen-components/protected/restaurants/add-form';
import RestaurantsScreenHeader from '@/lib/ui/screen-components/protected/restaurants/view/header/screen-header';
import RestaurantsMain from '@/lib/ui/screen-components/protected/restaurants/view/main';

export default function RestaurantsScreen() {
  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <RestaurantsScreenHeader />
      <div className="flex-grow overflow-y-auto">
        <RestaurantsMain />
      </div>
      <RestaurantsForm />
    </div>
  );
}
