import { QueryState } from '@/app/types/global-types';
import CouponStack from './CouponStack';
export default function CouponTable({ coupons }: { coupons: QueryState }) {
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
        {coupons.data.map((coupon: any) => {
          return <CouponStack coupon={coupon} key={coupon?._id} />;
        })}
      </tbody>
    </table>
  );
}
