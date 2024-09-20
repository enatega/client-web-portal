import { gql } from '@apollo/client';

export const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant($restaurant: RestaurantInput!, $owner: ID!) {
    createRestaurant(restaurant: $restaurant, owner: $owner) {
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
      tax
      owner {
        _id
        email
        isActive
      }
      shopType
      orderId
      logo
      password
      location {
        coordinates
      }
      cuisines
    }
  }
`;
