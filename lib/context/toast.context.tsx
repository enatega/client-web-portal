'use client';

// Core
import React, { useRef } from 'react';

// Interfaces
import {
  IToast,
  IToastContext,
  IToastProviderProps,
} from '@/lib/utils/interfaces';

// Prime React
import { Toast } from 'primereact/toast';

// Components
import CustomNotification from '../ui/useable-components/notification';

export const ToastContext = React.createContext<IToastContext>(
  {} as IToastContext
);

export const ToastProvider: React.FC<IToastProviderProps> = ({ children }) => {
  // Ref
  const toastRef = useRef<Toast>(null);

  // Handlers
  const onShowToast = (config: IToast) => {
    toastRef.current?.show({
      severity: config.type,
      life: config.duration,
      contentStyle: {
        margin: 0,
        padding: 0,
      },
      content: (
        <CustomNotification
          type={config.type}
          title={config.title}
          message={config.message}
        />
      ),
    });
  };

  const value: IToastContext = {
    showToast: onShowToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
};