import { gql } from '@apollo/client';

export const GET_RIDERS_BY_ZONE = gql`
  query RidersByZone($id: String!) {
    ridersByZone(id: $id) {
      _id
      name
      username
      password
      phone
      available
      zone {
        _id
        title
      }
    }
  }
`;

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
        details
        label
      }
      items {
        _id
        title
        description
        image
        quantity
        variation {
          _id
          title
          price
          discounted
        }
        addons {
          _id
          options {
            _id
            title
            description
            price
          }
          description
          title
          quantityMinimum
          quantityMaximum
        }
        specialInstructions
        isActive
        createdAt
        updatedAt
      }
      user {
        _id
        name
        phone
        email
      }
      paymentMethod
      paidAmount
      orderAmount
      orderStatus
      isPickedUp
      status
      paymentStatus
      reason
      isActive
      createdAt
      deliveryCharges
      rider {
        _id
        name
        username
        available
      }
    }
  }
`;
