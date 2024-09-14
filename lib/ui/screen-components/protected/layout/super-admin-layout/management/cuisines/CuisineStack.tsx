import { ICuisine } from '@/lib/utils/interfaces/cuisine.interface';

export default function CuisineStack({ cuisine }: { cuisine: ICuisine }) {
  return (
    <tr className="flex w-full justify-between items-center text-start p-3">
      <td className="min-w-auto max-w-52 text-wrap h-auto text-left flex gap-1">
        <input type="checkbox" name="selectOne" className="mr-3" />
        <div className="w-12 h-12 rounded-lg overflow-hidden justify-self-start self-center">
          <img
            src="https://res.cloudinary.com/do1ia4vzf/image/upload/v1714642876/food/zm3dg3hoxfarudgbqyzg.jpg"
            alt={cuisine?.description}
            className="w-full object-cover"
          />
        </div>
      </td>
      <td className="min-w-auto max-w-96 h-12">{cuisine?.name}</td>
      <td
        className="min-w-auto max-w-96 h-12 text-wrap"
        title={cuisine?.description}
      >
        {cuisine?.description.slice(0, 10).concat('..')}
      </td>
      <td className="min-w-auto max-w-96 h-12">{cuisine?.shopType}</td>
    </tr>
  );
}
