import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IDropdownSelectItem, IEditState } from './global.interface';
import { IFilterType } from './table.interface';

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
  filters?: IFilterType | undefined;
  setIsEditing: Dispatch<SetStateAction<IEditState<ICuisine>>>;
  setIsDeleting: Dispatch<SetStateAction<IEditState<ICuisine>>>;
  isDeleting: IEditState<ICuisine>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  setCuisines: Dispatch<SetStateAction<ICuisine[]>>;
  globalFilterValue: string;
  onGlobalFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  statusOptions: IDropdownSelectItem[];
  setSelectedStatuses: Dispatch<SetStateAction<string[]>>;
  selectedStatuses: string[];
}
export interface ICuisineScreenHeaderProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  setCuisines: Dispatch<SetStateAction<ICuisine[]>>;
  handleAddCuisineLocally: (cuisine: ICuisine) => void;
  setIsEditing: Dispatch<SetStateAction<IEditState<ICuisine>>>;
  visible: boolean;
  isEditing: IEditState<ICuisine>;
  cuisines: ICuisine[];
  handleButtonClick: () => void;
}
