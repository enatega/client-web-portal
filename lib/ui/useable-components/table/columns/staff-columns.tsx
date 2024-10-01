// Custom Components
import ActionMenu from '@/lib/ui/useable-components/action-menu';
import Toggle from '../../toggle';

// Interfaces and Types
import { IStaffResponse } from '@/lib/utils/interfaces';
import { IActionMenuProps } from '@/lib/utils/interfaces/action-menu.interface';

export const STAFF_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps<IStaffResponse>['items'];
}) => {
  return [
    { headerName: 'Name', propertyName: 'name' },
    { headerName: 'Email', propertyName: 'email' },
    { headerName: 'Password', propertyName: 'plainPassword' },
    { headerName: 'Phone', propertyName: 'phone' },
    // ? Should this be added as it will make table overflow on normal screens
    // {
    //   headerName: 'Permissions',
    //   propertyName: 'permissions',
    //   body: (staff: IStaffResponse) => {
    //     return staff.permissions.map((v) => v + ', ');
    //   },
    // },
    {
      headerName: 'Status',
      propertyName: 'status',
      body: (staff: IStaffResponse) => {
        return <Toggle checked={staff.isActive} />;
      },
    },
    {
      propertyName: 'actions',
      body: (staff: IStaffResponse) => (
        <ActionMenu items={menuItems} data={staff} />
      ),
    },
  ];
};
