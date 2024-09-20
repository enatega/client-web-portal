// Core
import Image from 'next/image';

// Custom Components
import ActionMenu from '@/lib/ui/useable-components/action-menu';
import Toggle from '@/lib/ui/useable-components/toggle';

// Interfaces and Types
import { IActionMenuProps } from '@/lib/utils/interfaces/action-menu.interface';
import { IBannersResponse } from '@/lib/utils/interfaces/banner.interface';
import { IRiderResponse } from '@/lib/utils/interfaces/rider.interface';
import { IUserResponse } from '@/lib/utils/interfaces/users.interface';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Icons

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

export const BANNERS_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps<IBannersResponse>['items'];
}) => {
  return [
    {
      headerName: 'Image',
      propertyName: 'image',
      body: (product: IBannersResponse) => {
        return (
          <Image
            width={40}
            height={40}
            alt="Banner"
            src={
              product.file
                ? product.file
                : 'https://images.unsplash.com/photo-1595418917831-ef942bd9f9ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
          />
        );
      },
    },
    { headerName: 'Title', propertyName: 'title' },
    { headerName: 'Description', propertyName: 'description' },
    { headerName: 'Screen Name', propertyName: 'screen' },
    { headerName: 'Action', propertyName: 'action' },
    {
      propertyName: 'actions',
      body: (banner: IBannersResponse) => (
        <ActionMenu items={menuItems} data={banner} />
      ),
    },
  ];
};

export const USERS_TABLE_COLUMNS = [
  {
    headerName: 'Name',
    propertyName: 'name',
    body: (user: IUserResponse) => {
      return (
        <div className="flex gap-2 items-center">
          <div className="rounded-full h-5 w-5 flex justify-center items-center bg-slate-300">
            <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
          </div>
          <span>{user.name}</span>
        </div>
      );
    },
  },
  { headerName: 'Email', propertyName: 'email' },
  { headerName: 'Phone', propertyName: 'phone' },
  {
    headerName: 'Created At',
    propertyName: 'createdAt',
    body: (user: IUserResponse) => {
      const formattedDate = new Date(Number(user.createdAt)).toLocaleDateString(
        'en-GB'
      );
      return <div className="flex gap-2 items-center">{formattedDate}</div>;
    },
  },
];
