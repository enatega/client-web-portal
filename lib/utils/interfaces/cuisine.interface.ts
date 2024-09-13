export interface ICuisine {
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
  cuisines: ICuisine[];
}

export interface IGetCuisinesVariables {}
