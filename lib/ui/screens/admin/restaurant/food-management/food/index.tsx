import FoodForm from '@/lib/ui/screen-components/protected/restaurant/food/form/add-form';
import FoodHeader from '@/lib/ui/screen-components/protected/restaurant/food/view/header/screen-header';
import FoodsMain from '@/lib/ui/screen-components/protected/restaurant/food/view/main';

export default function FoodScreen() {
  return (
    <div className="screen-container">
      <FoodHeader />
      <FoodsMain />
      <FoodForm />
    </div>
  );
}
