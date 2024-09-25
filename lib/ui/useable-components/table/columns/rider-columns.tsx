import { GET_RIDERS } from '@/lib/api/graphql';
import ActionMenu from '@/lib/ui/useable-components/action-menu';
import { IActionMenuProps } from '@/lib/utils/interfaces/action-menu.interface';
import { IRiderResponse } from '@/lib/utils/interfaces/rider.interface';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import CustomInputSwitch from '../../custom-input-switch';

// Define the GraphQL mutation
const TOGGLE_RIDER = gql`
  mutation ToggleRider($id: String) {
    toggleAvailablity(id: $id) {
      _id
      name
      username
      phone
      available
      zone {
        title
      }
    }
  }
`;

export const RIDER_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps<IRiderResponse>['items'];
}) => {
  const [deletingRestaurant, setDeletingRestaurant] = useState<{
    id: string;
    isActive: boolean;
  }>({ id: '', isActive: false });

  const [isRefetching, setIsRefetching] = useState(false);

  // GraphQL mutation hook
  const [mutateToggle, { loading }] = useMutation(TOGGLE_RIDER, {
    refetchQueries: [{ query: GET_RIDERS }],
    awaitRefetchQueries: true,
  });

  // Handle availability toggle
  const onHandleRestaurantStatusChange = async (
    isActive: boolean,
    id: string
  ) => {
    try {
      setDeletingRestaurant({ id, isActive });
      setIsRefetching(true);
      await mutateToggle({ variables: { id } });
    } catch (error) {
      console.error('Error toggling availability:', error);
    } finally {
      setIsRefetching(false);
      setDeletingRestaurant({ id: '', isActive: false });
    }
  };

  return [
    { headerName: 'Name', propertyName: 'name' },
    { headerName: 'Username', propertyName: 'username' },
    { headerName: 'Phone', propertyName: 'phone' },
    {
      headerName: 'Zone',
      propertyName: 'zone',
      body: (rider: IRiderResponse) => rider.zone.title,
    },
    {
      headerName: 'Available',
      propertyName: 'available',
      body: (rider: IRiderResponse) => (
        <CustomInputSwitch
          loading={rider._id === deletingRestaurant.id && loading}
          isActive={rider.available}
          onChange={async () => {
            await onHandleRestaurantStatusChange(!rider.available, rider._id);
          }}
        />
      ),
    },
    {
      propertyName: 'actions',
      body: (rider: IRiderResponse) => (
        <ActionMenu items={menuItems} data={rider} />
      ),
    },
  ];
};
