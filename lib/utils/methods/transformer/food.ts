import {
  IFood,
  IFoodByRestaurantResponse,
  IFoodCategory,
  IFoodGridItem,
} from '../../interfaces';

export const onTransformRetaurantsByIdToFoods = ({
  restaurant,
}: IFoodByRestaurantResponse): IFoodGridItem[] => {
<<<<<<< HEAD
  let foods: IFoodGridItem[] = [];
=======
  const foods: IFoodGridItem[] = [];

>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
  restaurant.categories.map((category: IFoodCategory) => {
    return category.foods.map((food: IFood) => {
      foods.push({
        _id: food._id,
        title: food.title,
        description: food.description,
        category: { label: category.title, code: category._id },
        image: food.image,
      });
    });
  });

  return foods;
};
