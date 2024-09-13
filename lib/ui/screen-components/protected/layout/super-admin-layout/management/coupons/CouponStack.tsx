import { ICoupon } from '@/lib/utils/interfaces/coupons.interface';
import { InputSwitch } from 'primereact/inputswitch';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function CouponStack({ coupon }: { coupon: ICoupon }) {
  // function toggleCouponState() {}
  return (
    <tr className="flex w-full justify-between items-center text-start p-3">
      <td className="min-w-auto max-w-32">
        <input type="checkbox" name="selectOne" className="mr-3" />
        {coupon?.__typename}
      </td>
      <td className="min-w-auto max-w-32">{coupon?.title}</td>
      <td className="min-w-auto max-w-32">{coupon?.discount}</td>
      <td className="min-w-auto max-w-32">
        <span className="flex items-center gap-1">
          {/* toggle  */}
          <InputSwitch checked={coupon?.enabled} />
          {/* three dots menu button  */}
          <BsThreeDotsVertical color="gray" size={20} />
        </span>
      </td>
    </tr>
  );
}
