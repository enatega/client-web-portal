export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignInFormErrors {
  email: string[];
  password: string[];
}

export interface ISignInOwnerRestaurants {
  _id: string;
  orderId: string;
  name: string;
  image: string;
  address: string;
}

export interface ILoginResponse {
  userId: string;
  token: string;
  email: string;
  userType: 'ADMIN' | 'STAFF' | 'VENDOR' | 'RESTAURANT';
  restaurants: ISignInOwnerRestaurants[];
  permissions?: String[];
  __typename: string;
}

export interface IOwnerLoginDataResponse {
  ownerLogin: ILoginResponse;
}
