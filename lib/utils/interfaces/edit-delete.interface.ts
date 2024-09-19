import { Dispatch, SetStateAction } from 'react';

export default interface IEditDeleteInterface {
  setIsEditing: () => void;
  setIsDeleting: () => void;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}
export interface IEditDeleteProps {
  _id: string;
}
