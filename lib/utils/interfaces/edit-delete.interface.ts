import { Dispatch, SetStateAction } from 'react';
import { IEditPopupVal, IEditState } from './coupons.interface';

export interface IEditDeleteInterface<T> {
  setIsEditing: Dispatch<SetStateAction<IEditState<T>>>;
  setIsDeleting: Dispatch<SetStateAction<IEditState<T>>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setIsEditDeletePopupOpen: Dispatch<SetStateAction<IEditPopupVal>>;
  visible: boolean;
  data: T;
}
export interface IEditDeleteProps {
  _id: string;
}
