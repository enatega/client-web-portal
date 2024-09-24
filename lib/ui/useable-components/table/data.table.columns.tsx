// Core
import Image from 'next/image';

// Custom Components
import ActionMenu from '@/lib/ui/useable-components/action-menu';
import Toggle from '@/lib/ui/useable-components/toggle';

// Interfaces and Types
import { DELETE_RESTAURANT } from '@/lib/api/graphql';
import { ToastContext } from '@/lib/context/toast.context';
import {
  ICategory,
  IOptions,
  IRestaurantResponse,
} from '@/lib/utils/interfaces';
import { IActionMenuProps } from '@/lib/utils/interfaces/action-menu.interface';
import { IBannersResponse } from '@/lib/utils/interfaces/banner.interface';
import { IRiderResponse } from '@/lib/utils/interfaces/rider.interface';
import { IUserResponse } from '@/lib/utils/interfaces/users.interface';
import { ApolloError, useMutation } from '@apollo/client';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import CustomInputSwitch from '../custom-input-switch';

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

export const RESTAURANT_TABLE_COLUMNS = () => {
  // Context
  const { showToast } = useContext(ToastContext);

  // State
  const [deletingRestaurant, setDeletingRestaurant] = useState<{
    id: string;
    isActive: boolean;
  }>({ id: '', isActive: false });

  // API
  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT, {
    onCompleted: () => {
      showToast({
        type: 'error',
        title: 'Restaurant Status',
        message: `Restaurant has been marked as ${deletingRestaurant.isActive ? 'in-active' : 'active'}`,
        duration: 2000,
      });
    },
    onError,
  });

  // Handle checkbox change
  const onHandleRestaurantStatusChange = async (
    isActive: boolean,
    id: string
  ) => {
    try {
      setDeletingRestaurant({
        id,
        isActive,
      });
      await deleteRestaurant({ variables: { id: id } });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Restaurant Status',
        message: `Restaurant marked as ${isActive ? 'in-active' : 'active'} failed`,
        duration: 2000,
      });
    } finally {
      setDeletingRestaurant({
        ...deletingRestaurant,
        id: '',
      });
    }
  };

  function onError({ graphQLErrors, networkError }: ApolloError) {
    showToast({
      type: 'error',
      title: 'Restaurant Status Change',
      message:
        graphQLErrors[0]?.message ??
        networkError?.message ??
        'Restaurant Status Change Failed',
      duration: 2500,
    });

    setDeletingRestaurant({
      ...deletingRestaurant,
      id: '',
    });
  }

  return [
    {
      headerName: 'Image',
      propertyName: 'image',
      body: (restaurant: IRestaurantResponse) => {
        return (
          <Image
            width={30}
            height={30}
            alt="Restaurant"
            src={
              restaurant.image
                ? restaurant.image
                : 'https://images.unsplash.com/photo-1595418917831-ef942bd9f9ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
          />
        );
      },
    },
    { headerName: 'ID', propertyName: '_id' },
    { headerName: 'Name', propertyName: 'name' },
    { headerName: 'Email', propertyName: 'username' },
    {
      headerName: 'Vendor',
      propertyName: 'owner.email',
    },
    { headerName: 'Address', propertyName: 'address' },
    {
      headerName: 'Status',
      propertyName: 'status',
      body: (rowData: IRestaurantResponse) => {
        return (
          <CustomInputSwitch
            loading={rowData?._id === deletingRestaurant?.id}
            isActive={rowData.isActive}
            onChange={async () => {
              await onHandleRestaurantStatusChange(
                rowData.isActive,
                rowData._id
              );
            }}
          />
        );
      },
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

export const OPTION_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps<IOptions>['items'];
}) => {
  return [
    { headerName: 'Title', propertyName: 'title' },
    { headerName: 'Price', propertyName: 'price' },
    { headerName: 'Description', propertyName: 'description' },
    {
      propertyName: 'actions',
      body: (option: IOptions) => (
        <ActionMenu items={menuItems} data={option} />
      ),
    },
  ];
};
