import { CSSProperties } from 'react';
import { IDropdownSelectItem, IGlobalComponentProps } from './global.interface';

interface ISelectionComponentProps extends IGlobalComponentProps {
  style?: CSSProperties;
  isLoading?: boolean;
}

export interface IMultiSelectComponentProps extends ISelectionComponentProps {
  name: string;
  optionLabel?: string;
  optionValue?: string;
  placeholder: string;
  showLabel?: boolean;
  selectedItems: IDropdownSelectItem[] | null;
  setSelectedItems: (key: string, items: IDropdownSelectItem[]) => void;
  options: IDropdownSelectItem[];
}

export interface IDropdownComponentProps extends ISelectionComponentProps {
  name: string;
  optionLabel?: string;
  optionValue?: string;
  placeholder: string;
  showLabel?: boolean;
  invalid?: boolean;
  filter?: boolean;
  loading?: boolean;
  selectedItem: IDropdownSelectItem | null;
  setSelectedItem: (key: string, item: IDropdownSelectItem) => void;
  options: IDropdownSelectItem[];
}
