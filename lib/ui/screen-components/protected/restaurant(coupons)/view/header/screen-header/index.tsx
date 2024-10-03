// Interface and Types
import { ICouponRestaurantHeaderProps } from '@/lib/utils/interfaces/coupons-restaurant.interface';

// Components
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const CouponsHeader = ({
  setIsAddCouponVisible,
}: ICouponRestaurantHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 w-full flex-shrink-0 bg-white p-3 shadow-sm">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Coupons" />
        <TextIconClickable
          className="rounded border-gray-300 bg-black text-white sm:w-auto"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Coupon"
          onClick={() => setIsAddCouponVisible(true)}
        />
      </div>
    </div>
  );
};

export default CouponsHeader;
