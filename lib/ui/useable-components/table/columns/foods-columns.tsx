import { /* IActionMenuProps, */ IFoodGridItem } from '@/lib/utils/interfaces';
// import ActionMenu from '../../action-menu';
import Image from 'next/image';

export const FOODS_TABLE_COLUMNS = (/* {
  menuItems,
}: {
  menuItems: IActionMenuProps<IFoodGridItem>['items'];
} */) => {
  return [
    { headerName: 'Title', propertyName: 'title' },
    { headerName: 'Description', propertyName: 'description' },
    {
      headerName: 'Category',
      propertyName: 'category.label',
      body: (item: IFoodGridItem) => <div>{item.category.label}</div>,
    },
    {
      headerName: 'Image',
      propertyName: 'image',
      body: (item: IFoodGridItem) => (
        <Image src={item.image} width={40} height={40} alt="item.png" />
      ),
    },
    /*  {
      propertyName: 'actions',
      body: (option: IFoodGridItem) => <ActionMenu items={menuItems} data={option} />,
    }, */
  ];
};
