'use client';
import RestaurantsForm from '@/lib/ui/screen-components/protected/restaurants/add-form';
import RestaurantsScreenHeader from '@/lib/ui/screen-components/protected/restaurants/view/header/screen-header';
import RestaurantsMain from '@/lib/ui/screen-components/protected/restaurants/view/main';

export default function RestaurantsScreen() {
  return (
    <div className="screen-container">
      <RestaurantsScreenHeader />
      <RestaurantsMain />

      <RestaurantsForm />
    </div>
  );
}
