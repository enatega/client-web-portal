import { DataTableFilterMeta } from 'primereact/datatable';
import { Dispatch, SetStateAction } from 'react';
import { IEditState } from './coupons.interface';

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
  setCuisines: Dispatch<SetStateAction<ICuisine[]>>;
  cuisines: ICuisine[];
  isEditing: IEditState<ICuisine>;
  setIsEditing: Dispatch<
    SetStateAction<{
      bool: boolean;
      data: ICuisine;
    }>
  >;
  addCuisineLocally: (cuisine: ICuisine) => void;
}

export interface ICuisineTableProps {
  data: ICuisine[] | undefined | null;
  loading: boolean;
  filters?: DataTableFilterMeta;
  setIsEditing: Dispatch<SetStateAction<IEditState<ICuisine>>>;
  setIsDeleting: Dispatch<SetStateAction<IEditState<ICuisine>>>;
  isDeleting: IEditState<ICuisine>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  setCuisines: Dispatch<SetStateAction<ICuisine[]>>;
}
