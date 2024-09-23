export interface ICategoryForm {
  restaurantId: string;
  _id?: string;
  title: string;
}

export interface ICategoryErrors {
  restaurantId: string[];
  _id?: string[];
  title: string[];
}
