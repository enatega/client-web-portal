'use client';

// Components
import { INotification } from '@/lib/utils/interfaces/notification.interface';
import CustomButton from '../../button';

// Hooks
import { useMemo } from 'react';

export const NOTIFICATIONS_TABLE_COLUMNS = () => {
  // Handlers
  async function handleResendNotification(rowData: INotification) {
    console.log({
      rowData,
    });
  }

  const notification_columns = useMemo(
    () => [
      {
        propertyName: 'title',
        headerName: 'Title',
      },
      {
        propertyName: 'description',
        headerName: 'description',
      },
      {
        propertyName: 'createdAt',
        headerName: 'Date',
      },
      {
        propertyName: 'status',
        headerName: 'Change Status',
        body: (rowData: INotification) => {
          return (
            <CustomButton
              onClick={() => handleResendNotification(rowData)}
              label="Resend"
              loading={false}
              type="button"
              className="block self-end"
            />
          );
        },
      },
    ],
    []
  );
  return notification_columns;
};
