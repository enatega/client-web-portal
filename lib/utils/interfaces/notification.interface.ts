import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IFilterType } from './table.interface';

export interface INotification {
  title: '';
  description: '';
  createdAt: '';
}

export interface INotificationFormProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}

export interface INotificationMainProps {

}

export interface INotificationTableProps {
  onGlobalFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filters: IFilterType | undefined;
  globalFilterValue: string;
}
export interface INotificationHeaderProps {
  handleButtonClick: () => void;
}
