import {
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ISeverityStyles } from '../interfaces/toast.interface';

export const MIN_PRICE = 0.00000001;
export const MAX_PRICE = 99999;

export const SEVERITY_STYLES: ISeverityStyles = {
  error: {
    bgColor: '#FFC5C5',
    textColor: '#FF0000',
    icon: faXmarkCircle,
    iconBg: '#FFC5C5',
  },
  success: {
    bgColor: '#C6F7D0',
    textColor: '#34C759',
    icon: faCheck,
    iconBg: '#C6F7D0',
  },
  info: {
    bgColor: '#B2E2FC',
    textColor: '#2196F3',
    icon: faInfoCircle,
    iconBg: '#B2E2FC',
  },
  warn: {
    bgColor: '#F7DC6F',
    textColor: '#F7DC6F',
    icon: faExclamationTriangle,
    iconBg: '#F7DC6F',
  },
};
