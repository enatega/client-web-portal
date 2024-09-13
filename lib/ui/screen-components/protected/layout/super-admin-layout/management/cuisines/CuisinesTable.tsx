import {
  ICuisine,
  IGetCuisinesData,
} from '@/lib/utils/interfaces/cuisine.interface';
import CuisineStack from './CuisineStack';
export default function CuisineTable({
  data,
  loading,
}: {
  data: IGetCuisinesData | undefined;
  loading: boolean;
}) {
  return (
    <table className="flex flex-col mx-auto w-[95%] gap-1 my-1">
      <thead>
        <tr className="flex w-full justify-between items-center text-start bg-gray-100 rounded-md p-3 text-gray-600">
          <td className="flex">
            <input type="checkbox" name="selectAll" className="mr-3" />
            Image
          </td>
          <td className="">Name</td>
          <td className="">Vendor</td>
          <td className="">Store Type</td>
        </tr>
      </thead>
      <tbody>
        {data?.cuisines.map((cuisine: ICuisine) => {
          return <CuisineStack cuisine={cuisine} key={cuisine?._id} />;
        })}
        {!loading && !data?.cuisines && (
          <tr className="w-ful text-center">
            <td className="w-ful text-center">No Cuisines Found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
