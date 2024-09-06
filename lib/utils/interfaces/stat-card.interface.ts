import { IGlobalComponentProps } from './global.interface';

export interface IStatsCardProps extends IGlobalComponentProps {
  label: string;
  total: number;
  description: string;
}
