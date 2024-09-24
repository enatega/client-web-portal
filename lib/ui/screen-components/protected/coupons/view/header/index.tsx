import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { ICouponScreenHeaderProps } from '@/lib/utils/interfaces/coupons.interface';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

export default function CouponScreenHeader({
  handleButtonClick,
}: ICouponScreenHeaderProps) {
  return (
    <div>
      <div className="flex justify-between items-center p-2 w-full">
        <HeaderText text="Coupons" />
        <TextIconClickable
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          onClick={handleButtonClick}
          title="Add Coupon"
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
        />
      </div>
    </div>
  );
}
