import { Dispatch, SetStateAction } from 'react';

export default interface IEditDeleteInterface<T> {
  setIsEditing: Dispatch<
    SetStateAction<{
      bool: boolean;
      data: T;
    }>
  >;
  setIsDeleting: Dispatch<
    SetStateAction<{
      _id: string;
      bool: boolean;
    }>
  >;
  setIsEditDeletePopupOpen: Dispatch<
    SetStateAction<{
      _id: string;
      bool: boolean;
    }>
  >;
  data: T;
}
