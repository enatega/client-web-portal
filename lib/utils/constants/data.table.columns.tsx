import ActionMenu from '@/lib/ui/useable-components/action-menu';
import Toggle from '@/lib/ui/useable-components/toggle';
import { IActionMenuProps } from '../interfaces/action-menu.interface';
import { IRiderResponse } from '../interfaces/rider.interface';

export const RIDER_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps['items'];
}) => {
  return [
    // { headerName: 'ID', propertyName: '_id' },
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
      headerName: 'Actions',
      propertyName: 'actions',
      body: (rider: IRiderResponse) => (
        <ActionMenu items={menuItems} itemId={rider._id} />
      ),
    },
  ];
};
