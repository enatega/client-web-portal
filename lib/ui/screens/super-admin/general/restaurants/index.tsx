'use client';
import RestaurantsForm from '@/lib/ui/screen-components/protected/restaurants/add-form';
import RestaurantsScreenHeader from '@/lib/ui/screen-components/protected/restaurants/view/header/screen-header';
import RestaurantsMain from '@/lib/ui/screen-components/protected/restaurants/view/main';

export default function RestaurantsScreen() {
  return (
    <div className="flex flex-col h-screen p-3 overflow-y-auto pd-16">
      <RestaurantsScreenHeader />
      <RestaurantsMain />

      <RestaurantsForm />
    </div>
  );
}
