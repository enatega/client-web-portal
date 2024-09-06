import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { MenuItem } from 'primereact/menuitem';
import { MouseEventHandler } from 'react';

export interface IItem extends MenuItem {
  // label?: string;
  icon?: IconDefinition;
  isExpandable?: boolean;
  isParent?: boolean;
  url?: string;
  route?: string;
}

export interface IPanelItem extends IItem {
  items: IItem[];
}

export interface IMenuOption {
  active?: boolean;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}
