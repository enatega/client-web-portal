import { Dispatch, SetStateAction } from 'react';

export interface ICuisine {
  _id: string;
  description: string;
  image?: string;
  name: string;
  shopType: string;
  __typename: string;
}

export interface IGetCuisinesData {
  cuisines: ICuisine[];
}

export interface IGetCuisinesVariables {}

export interface IAddCuisineProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  setCuisinesData: (cuisine: ICuisine) => void;
}
