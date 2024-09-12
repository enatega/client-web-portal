import { IDropdownSelectItem, IGlobalComponentProps } from './global.interface';

export interface IMultiSelectComponentProps extends IGlobalComponentProps {
  name: string;
  optionLabel?: string;
  optionValue?: string;
  placeholder: string;
  showLabel?: boolean;
  selectedItems: IDropdownSelectItem[] | null;
  setSelectedItems: (key: string, items: IDropdownSelectItem[]) => void;
  options: IDropdownSelectItem[];
}

export interface IDropdownComponentProps extends IGlobalComponentProps {
  name: string;
  optionLabel?: string;
  optionValue?: string;
  placeholder: string;
  showLabel?: boolean;
  selectedItem: IDropdownSelectItem | null;
  setSelectedItem: (key: string, item: IDropdownSelectItem) => void;
  options: IDropdownSelectItem[];
}
