import { IActionMenuProps, ICategory } from '@/lib/utils/interfaces';
import ActionMenu from '../../action-menu';

export const CATEGORY_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps<ICategory>['items'];
}) => {
  return [
    { headerName: 'Title', propertyName: 'title' },
    {
      propertyName: 'actions',
      body: (rider: ICategory) => <ActionMenu items={menuItems} data={rider} />,
    },
  ];
};
