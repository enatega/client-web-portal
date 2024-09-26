'use client';

// Core
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

// Context
import { ToastContext } from '@/lib/context/toast.context';

// Apollo Client
import { ApolloError, useMutation } from '@apollo/client';

// Custom Components
import CustomInputSwitch from '../../custom-input-switch';

// Interfaces
import { IRestaurantResponse } from '@/lib/utils/interfaces';

// Utils and Constants 
import { onUseLocalStorage } from '@/lib/utils/methods';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

// GraphQL Queries and Mutations
import { DELETE_RESTAURANT } from '@/lib/api/graphql';

export const RESTAURANT_TABLE_COLUMNS = () => {
  // Context
  const { showToast } = useContext(ToastContext);
  // Hooks
  const router = useRouter();

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
      propertyName: 'actions',
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
    {
      headerName: 'Actions',
      propertyName: 'actions',
      body: (rowData: IRestaurantResponse) => {
        return (
          <FontAwesomeIcon
            icon={faEye}
            className="ml-5 cursor-pointer"
            onClick={() => {
              onUseLocalStorage('save', 'restaurantId', rowData?._id);
              router.push(`/admin/restaurant/`);
            }}
          />
        );
      },
    },
  ];
};
