import { IGlobalComponentProps } from './global.interface';

interface ITabsItem {
  name: string;
  icon: string;
}

export interface IHeaderTabsItem extends ITabsItem {}

export interface ICustomTabProps extends IGlobalComponentProps {
  options: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}
