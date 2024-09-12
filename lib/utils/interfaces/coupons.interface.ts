import { CouponType } from '@/app/types/global-types';

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
  cuisines: CouponType[];
}
