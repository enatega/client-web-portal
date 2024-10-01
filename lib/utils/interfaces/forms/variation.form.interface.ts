export interface IVariationForm {
  _id?: string;
  title: string;
  price: number;
  discount: number;
}

export interface IVariationErrors {
  _id?: string[];
  title: string[];
  discount: string[];
  price: string[];
}
