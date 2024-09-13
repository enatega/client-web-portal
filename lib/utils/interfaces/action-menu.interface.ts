import { MenuItemCommandEvent } from 'primereact/menuitem';
import { IGlobalComponentProps } from './global.interface';

export interface IActionMenuItem extends IGlobalComponentProps {
  label: string;
  command?: (event: MenuItemCommandEvent) => void;
  id?: number;
}

export interface IActionMenuProps extends IGlobalComponentProps {
  items: IActionMenuItem[];
  itemId: number;
}
