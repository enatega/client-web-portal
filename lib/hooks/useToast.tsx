import { useContext } from 'react';
import { ToastContext } from '../context/toast.context';

const useToast = () => {
  return useContext(ToastContext);
};

export default useToast;
