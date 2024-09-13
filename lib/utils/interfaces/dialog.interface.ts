import { IGlobalComponentProps } from './global.interface';

export interface IDeleteDialogProps extends IGlobalComponentProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  message?: string;
}
