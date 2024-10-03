// Core
import { useContext, useState } from 'react';

// Custom Components
import ActionMenu from '@/lib/ui/useable-components/action-menu';
import CustomInputSwitch from '../../custom-input-switch';

// Interfaces and Types
import { IActionMenuProps } from '@/lib/utils/interfaces/action-menu.interface';
import { ICouponRestaurantResponse } from '@/lib/utils/interfaces/coupons-restaurant.interface';

// GraphQL
import { GET_RIDERS, TOGGLE_RIDER } from '@/lib/api/graphql';
import { useMutation } from '@apollo/client';
import { EDIT_RESTAURANT_COUPON } from '@/lib/api/graphql/mutations/coupons-restaurant';
import { GET_RESTAURANT_COUPONS } from '@/lib/api/graphql/queries/coupons-restaurant';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { title } from 'process';

export const COUPONS_RESTAURANT_TABLE_COLUMNS = ({
  menuItems,
}: {
  menuItems: IActionMenuProps<ICouponRestaurantResponse>['items'];
}) => {
  // Context
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);
  const restaurantId = restaurantLayoutContextData?.restaurantId || '';

  // For showing loader to appropriate coupon
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);

  // GraphQL mutation hook
  const [mutateToggle, { loading }] = useMutation(EDIT_RESTAURANT_COUPON, {
    refetchQueries: [{ query: GET_RESTAURANT_COUPONS }],
    awaitRefetchQueries: true,
  });

  // Handle availability toggle
  const onHandleBannerStatusChange = async (
    enabled: boolean,
    coupon: ICouponRestaurantResponse
  ) => {
    try {
      setSelectedCouponId(coupon._id);
      await mutateToggle({
        variables: {
          restaurantId: restaurantId,
          couponInput: {
            _id: coupon._id,
            title: coupon.title,
            discount: coupon.discount,
            enabled,
          },
        },
      });
    } catch (error) {
      console.error('Error toggling availability:', error);
    } finally {
      setSelectedCouponId(null);
    }
  };

  return [
    { headerName: 'Name', propertyName: '__typename' },
    { headerName: 'Code', propertyName: 'title' },
    { headerName: 'Discount', propertyName: 'discount' },
    {
      headerName: 'Enabled',
      propertyName: 'enabled',
      body: (coupon: ICouponRestaurantResponse) => (
        <CustomInputSwitch
          loading={coupon._id === selectedCouponId && loading}
          isActive={coupon.enabled}
          onChange={async () => {
            await onHandleBannerStatusChange(!coupon.enabled, coupon);
          }}
        />
      ),
    },
    {
      propertyName: 'actions',
      body: (coupon: ICouponRestaurantResponse) => (
        <ActionMenu items={menuItems} data={coupon} />
      ),
    },
  ];
};
