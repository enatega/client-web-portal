import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { ICouponScreenHeaderProps } from '@/lib/utils/interfaces/coupons.interface';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

export default function CouponScreenHeader({
  handleButtonClick,
}: ICouponScreenHeaderProps) {
  return (
  
      <div className="w-full flex-shrink-0 sticky top-0 bg-white z-10 shadow-sm p-3">
      <div className="flex w-full justify-between">
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
