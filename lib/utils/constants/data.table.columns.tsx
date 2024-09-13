import Toggle from '@/lib/ui/useable-components/toggle';
import {
  IActionMenuProps,
  IRiderDataComponentProps,
} from '../interfaces/rider.interface';
import ActionMenu from '@/lib/ui/useable-components/action-menu';

export const RIDER_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps['items'];
}) => {
  return [
    { headerName: 'ID', propertyName: 'id' },
    { headerName: 'Name', propertyName: 'name' },
    { headerName: 'Email', propertyName: 'email' },
    { headerName: 'Password', propertyName: 'password' },
    { headerName: 'Phone', propertyName: 'phone' },
    { headerName: 'Zone', propertyName: 'zone' },
    {
      headerName: 'Available',
      propertyName: 'available',
      body: (product: IRiderDataComponentProps) => (
        <Toggle checked={product.available} />
      ),
    },
    {
      headerName: 'Actions',
      propertyName: 'actions',
      body: (product: IRiderDataComponentProps) => (
        <ActionMenu items={menuItems} itemId={product.id} />
      ),
    },
  ];
};
