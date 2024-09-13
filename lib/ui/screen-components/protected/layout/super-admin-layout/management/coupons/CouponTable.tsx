import {
  ICouponType,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';
import CouponStack from './CouponStack';
export default function CouponTable({
  data,
}: {
  data: IGetCouponsData | undefined;
}) {
  return (
    <table className="flex flex-col mx-auto w-[95%] gap-1 my-1">
      <thead>
        <tr className="flex w-full justify-between items-center text-start bg-gray-100 rounded-md p-3 text-gray-600">
          <td className="">
            <input type="checkbox" name="selectAll" className="mr-3" />
            Name
          </td>
          <td className="">Code</td>
          <td className="">Discount</td>
          <td className="">Status</td>
        </tr>
      </thead>
      <tbody>
        {data?.coupons.map((coupon: ICouponType) => {
          return <CouponStack coupon={coupon} key={coupon?._id} />;
        })}
      </tbody>
    </table>
  );
}
