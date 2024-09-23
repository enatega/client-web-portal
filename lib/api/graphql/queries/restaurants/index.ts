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

export const GET_RESTAURANT_DELIVERY_ZONE_INFO = gql`
  query RestaurantDeliveryZoneInfo($id: ID!) {
    getRestaurantDeliveryZoneInfo(id: $id) {
      boundType
      deliveryBounds {
        coordinates
      }
      location {
        coordinates
      }

      circleBounds {
        radius
      }

      address
      city
      postCode
    }
  }
`;

export const GET_RESTAURANT_PROFILE = gql`
  query Restaurant($id: String) {
    restaurant(id: $id) {
      _id
      orderId
      orderPrefix
      slug
      name
      image
      logo
      address
      location {
        coordinates
      }
      deliveryBounds {
        coordinates
      }
      username
      password
      deliveryTime
      minimumOrder
      tax
      isAvailable
      stripeDetailsSubmitted
      openingTimes {
        day
        times {
          startTime
          endTime
        }
      }
      owner {
        _id
        email
      }
      shopType
      cuisines
    }
  }
`;
