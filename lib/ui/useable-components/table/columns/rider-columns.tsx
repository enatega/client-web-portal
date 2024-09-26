// Core
import { useState } from 'react';

// Custom Components
import ActionMenu from '@/lib/ui/useable-components/action-menu';
import CustomInputSwitch from '../../custom-input-switch';

// Interfaces and Types
import { IActionMenuProps } from '@/lib/utils/interfaces/action-menu.interface';
import { IRiderResponse } from '@/lib/utils/interfaces/rider.interface';

// GraphQL
import { GET_RIDERS, TOGGLE_RIDER } from '@/lib/api/graphql';
import { useMutation } from '@apollo/client';

export const RIDER_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps<IRiderResponse>['items'];
}) => {
  const [selectedRider, setSelectedRider] = useState<{
    id: string;
    isActive: boolean;
  }>({ id: '', isActive: false });

  // GraphQL mutation hook
  const [mutateToggle, { loading }] = useMutation(TOGGLE_RIDER, {
    refetchQueries: [{ query: GET_RIDERS }],
    awaitRefetchQueries: true,
  });

  // Handle availability toggle
  const onHandleBannerStatusChange = async (isActive: boolean, id: string) => {
    try {
      setSelectedRider({ id, isActive });
      await mutateToggle({ variables: { id } });
    } catch (error) {
      console.error('Error toggling availability:', error);
    } finally {
      setSelectedRider({ id: '', isActive: false });
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
          loading={rider._id === selectedRider.id && loading}
          isActive={rider.available}
          onChange={async () => {
            await onHandleBannerStatusChange(!rider.available, rider._id);
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
