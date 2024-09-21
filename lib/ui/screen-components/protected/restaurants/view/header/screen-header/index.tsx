import { RestaurantsContext } from '@/lib/context/restaurants.context';
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

export default function RestaurantsScreenHeader() {
  // Context
  const { onRestaurantsFormVisible } = useContext(RestaurantsContext);
  return (
    <div className="w-full flex-shrink-0 sm:block hidden">
      <div className="flex w-full justify-between">
        <HeaderText text="Restaurants" />
        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Restaurant"
          onClick={() => onRestaurantsFormVisible(true)}
        />
      </div>
    </div>
  );
}
