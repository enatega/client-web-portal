// Components
import { INotification } from '@/lib/utils/interfaces/notification.interface';
import CustomButton from '../../button';

// Hooks
import { useContext, useMemo } from 'react';
import { useMutation } from '@apollo/client';

//GraphQL
import { GET_NOTIFICATIONS, SEND_NOTIFICATION_USER } from '@/lib/api/graphql';

// Contexts
import { ToastContext } from '@/lib/context/toast.context';

export const NOTIFICATIONS_TABLE_COLUMNS = () => {
  // Toast
  const { showToast } = useContext(ToastContext);

  // Mutations
  const [sendNotification, { loading }] = useMutation(SEND_NOTIFICATION_USER, {
    fetchPolicy: 'network-only',
    refetchQueries: [{ query: GET_NOTIFICATIONS }],
    onCompleted: () => {
      showToast({
        message: 'Resent the notification successfully',
        title: 'Resend Notification',
        type: 'success',
      });
    },
    onError: (err) => {
      showToast({
        message:
          err.cause?.message ??
          'An error occured while re-sending the notification',
        title: 'Resend Notification',
        type: 'error',
      });
      console.log(err);
    },
  });
  const notification_columns = useMemo(
    () => [
      {
        propertyName: 'title',
        headerName: 'Title',
      },
      {
        propertyName: 'body',
        headerName: 'description',
      },
      {
        propertyName: 'createdAt',
        headerName: 'Date',
        body: (rowData: INotification) => (
          <div>{new Date(rowData.createdAt).toDateString()}</div>
        ),
      },
      {
        propertyName: 'status',
        headerName: 'Change Status',
        body: (rowData: INotification) => {
          return (
            <CustomButton
              onClick={() => {
                sendNotification({
                  variables: {
                    title: rowData.title,
                    body: rowData.body,
                    createdAt: rowData.createdAt,
                    _id: rowData._id,
                  },
                });
              }}
              label="Resend"
              loading={loading}
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
