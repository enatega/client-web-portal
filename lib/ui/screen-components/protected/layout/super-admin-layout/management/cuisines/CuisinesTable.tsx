import { QueryState } from '@/app/types/global-types';
import CuisineStack from './CuisineStack';
export default function CuisineTable({ cuisines }: { cuisines: QueryState }) {
  return (
    <table className="flex flex-col mx-auto w-[95%] gap-1 my-1">
      <thead>
        <tr className="flex w-full justify-between items-center text-start bg-gray-100 rounded-md p-3 text-gray-600">
          <td className="">Image</td>
          <td className="flex">
            <input type="checkbox" name="selectAll" className="mr-3" />
            Name
          </td>
          <td className="">Vendor</td>
          <td className="">Store Type</td>
        </tr>
      </thead>
      <tbody>
        {cuisines.data.map((cuisine: any) => {
          return <CuisineStack cuisine={cuisine} key={cuisine?._id} />;
        })}
      </tbody>
    </table>
  );
}
