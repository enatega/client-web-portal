import {
  IFood,
  IFoodByRestaurantResponse,
  IFoodCategory,
  IFoodGridItem,
} from '../../interfaces';

export const onTransformRetaurantsByIdToFoods = ({
  restaurant,
}: IFoodByRestaurantResponse): IFoodGridItem[] => {
  const foods: IFoodGridItem[] = [];

  restaurant.categories.map((category: IFoodCategory) => {
    return category.foods.map((food: IFood) => {
      foods.push({
        _id: food._id,
        title: food.title,
        description: food.description,
        category: { label: category.title, code: category._id },
        image: food.image,
        variations: food.variations ?? [],
      });
    });
  });

  return foods;
};
