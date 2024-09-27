import { gql } from '@apollo/client';

export const GET_ACTIVE_ORDERS = gql`
  query GetActiveOrders($restaurantId: ID) {
    getActiveOrders(restaurantId: $restaurantId) {
      _id
      zone {
        _id
      }
      orderId
      restaurant {
        _id
        name
        image
        address
        location {
          coordinates
        }
      }
      deliveryAddress {
        location {
          coordinates
        }
        deliveryAddress
      }

      paymentMethod
      orderStatus
      isPickedUp
      status
      isActive
      createdAt
      rider {
        _id
        name
        username
        available
      }
    }
  }
`;
