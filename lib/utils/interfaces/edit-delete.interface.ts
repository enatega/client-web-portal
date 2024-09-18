import { Dispatch, SetStateAction } from 'react';

export default interface IEditDeleteInterface<T> {
  setIsEditDeletePopupOpen: Dispatch<
    SetStateAction<{
      _id: string;
      bool: boolean;
    }>
  >;
  data: T;
  type: 'coupon' | 'cuisine' | T;
}
export interface IEditDeleteProps {
  _id: string;
}
