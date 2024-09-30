// Components
import CustomButton from '../../button';

// Hooks
import { useMemo } from 'react';

export const NOTIFICATIONS_TABLE_COLUMNS = () => {
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
        body: () => {
          return (
            <CustomButton
              onClick={() => {}}
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
