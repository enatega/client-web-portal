import { gql } from '@apollo/client';

export const GET_RESTAURANTS_L = gql`
  query restaurants {
    restaurants {
      _id
    }
  }
`;

export const GET_RESTAURANTS = gql`
  query restaurants {
    restaurants {
      _id
      name
      image
      username
      orderPrefix
      slug
      address
      deliveryTime
      minimumOrder
      isActive
      commissionRate
      username
      tax
      owner {
        _id
        email
        isActive
      }
      shopType
    }
  }
`;

export const GET_RESTAURANTS_BY_OWNER = gql`
  query RestaurantByOwner($id: String) {
    restaurantByOwner(id: $id) {
      _id
      email
      userType
      restaurants {
        _id
        orderId
        orderPrefix
        name
        slug
        image
        address
        isActive
        username
        password
        location {
          coordinates
        }
        shopType
      }
    }
  }
`;

// Delete
export const DELETE_RESTAURANT = gql`
  mutation DeleteRestaurant($id: String!) {
    deleteRestaurant(id: $id) {
      _id
      isActive
    }
  }
`;
