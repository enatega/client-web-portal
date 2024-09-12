import { CuisineType } from '@/app/types/global-types';

export interface ICuisineType {
  description: string;
  image: string;
  name: string;
  shopType: string;
  __typename: string;
  _id: string;
}
export interface ICuisinesData {
  data: {
    description: string;
    image: string;
    name: string;
    shopType: string;
    __typename: string;
    _id: string;
  }[];
}
export interface IGetCuisinesData {
  cuisines: CuisineType[];
}

export interface IGetCuisinesVariables {
  onError: () => {};
}
