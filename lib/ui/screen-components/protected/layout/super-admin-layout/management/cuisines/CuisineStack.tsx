import { ICuisine } from '@/lib/utils/interfaces/cuisine.interface';

export default function CuisineStack({ cuisine }: { cuisine: ICuisine }) {
  console.log({ imgCuisine: cuisine?.image });
  return (
    <tr className="flex w-full justify-between items-center text-sm p-3 text-left">
      <td className="min-w-auto max-w-32 text-left flex gap-1">
        <input type="checkbox" name="selectOne" className="mr-3" />
        <div className="w-12 h-12 rounded-lg overflow-hidden justify-self-start self-center">
          <img
            src="https://res.cloudinary.com/do1ia4vzf/image/upload/v1714642876/food/zm3dg3hoxfarudgbqyzg.jpg"
            alt={cuisine?.description}
            className="w-full object-cover"
          />
        </div>
      </td>
      <td className="min-w-auto max-w-32 text-left">{cuisine?.name}</td>
      <td className="min-w-auto max-w-32 text-left">{cuisine?.shopType}</td>
      <td className="min-w-auto max-w-32 text-left">{cuisine?.description}</td>
    </tr>
  );
}
