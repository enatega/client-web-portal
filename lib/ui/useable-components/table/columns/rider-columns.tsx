// Custom Components
import ActionMenu from '@/lib/ui/useable-components/action-menu';
import Toggle from '@/lib/ui/useable-components/toggle';

// Interfaces and Types
import { IActionMenuProps } from '@/lib/utils/interfaces/action-menu.interface';
import { IRiderResponse } from '@/lib/utils/interfaces/rider.interface';

export const RIDER_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps<IRiderResponse>['items'];
}) => {
  return [
    { headerName: 'Name', propertyName: 'name' },
    { headerName: 'Username', propertyName: 'username' },
    { headerName: 'Password', propertyName: 'password' },
    { headerName: 'Phone', propertyName: 'phone' },
    {
      headerName: 'Zone',
      propertyName: 'zone',
      body: (rider: IRiderResponse) => {
        return rider.zone.title;
      },
    },
    {
      headerName: 'Available',
      propertyName: 'available',
      body: (rider: IRiderResponse) => <Toggle checked={rider.available} />,
    },
    {
      propertyName: 'actions',
      body: (rider: IRiderResponse) => (
        <ActionMenu items={menuItems} data={rider} />
      ),
    },
  ];
};
