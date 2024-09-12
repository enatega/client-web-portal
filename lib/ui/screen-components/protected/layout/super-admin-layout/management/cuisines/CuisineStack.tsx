import { CuisineType } from '@/app/types/global-types';

export default function CuisineStack({ cuisine }: { cuisine: CuisineType }) {
  return (
    <tr className="flex w-full justify-between items-center text-start p-3">
      <td className="min-w-auto max-w-32">
        <span className="w-12 h-12 rounded-lg overflow-hidden justify-self-start self-center">
          {/* <Image
            src={cuisine?.image}
            alt={cuisine?.description}
            width={100}
            height={100}
          /> */}
          <img
            src={
              'https://res.cloudinary.com/do1ia4vzf/image/upload/v1714642819/food/z1m0vq7yeurkznbypmm9.jpg'
            }
            alt={cuisine?.description}
            className="w-full object-cover"
          />
        </span>
      </td>
      <td className="min-w-auto max-w-32">
        <input type="checkbox" name="selectOne" className="mr-3" />
        {cuisine?.name}
      </td>
      <td className="min-w-auto max-w-32">{cuisine?.shopType}</td>
      <td className="min-w-auto max-w-32">{cuisine?.description}</td>
    </tr>
  );
}
