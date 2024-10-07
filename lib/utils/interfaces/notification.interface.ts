import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IFilterType } from './table.interface';

export interface INotification {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface INotificationFormProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}

export interface INotificationTableProps {
  onGlobalFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filters: IFilterType | undefined;
  globalFilterValue: string;
}

export interface INotificationHeaderProps {
  handleButtonClick: () => void;
}

export interface IGetNotifications {
  notifications: INotification[];
}
