export interface ICouponType {
  discount: number;
  enabled: boolean;
  title: string;
  __typename: string;
  _id: string;
}
export interface ICouponsData {
  data: {
    discount: number;
    enabled: boolean;
    title: string;
    __typename: string;
    _id: string;
  }[];
}
export interface IGetCouponsData {
  coupons: ICouponType[];
}
export interface IGetCouponsVariables {}
