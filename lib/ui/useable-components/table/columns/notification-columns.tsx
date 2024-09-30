// Components
import CustomButton from '../../button';

export const NOTIFICATIONS_TABLE_COLUMNS = () => {
  return [
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
  ];
};
