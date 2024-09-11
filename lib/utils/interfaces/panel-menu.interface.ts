import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { MouseEventHandler } from 'react';

export interface ISidebarMenuItem {
  text: string;
  key?: number;
  icon?: IconDefinition;
  isExpandable?: boolean;
  isParent?: boolean;
  isClickable?: boolean;
  url?: string;
  route?: string;
  expanded?: boolean;
  subMenu?: ISidebarMenuItem[] | null;
  isLastItem?: boolean;
}

export interface IMenuOption {
  active?: boolean;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}
