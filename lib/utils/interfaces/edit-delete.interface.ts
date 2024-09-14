import { Dispatch, SetStateAction } from 'react';

export default interface IEditDeleteInterface {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  setIsEditDeletePopupOpen: Dispatch<
    SetStateAction<{ id: string; bool: boolean }>
  >;
}
