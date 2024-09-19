import { gql } from '@apollo/client';

export const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant($restaurant: RestaurantInput!, $owner: ID!) {
    createRestaurant(restaurant: $restaurant, owner: $owner) {
      _id
      orderId
      orderPrefix
      name
      slug
      image
      logo
      address
      username
      password
      minimumOrder
      tax
      location {
        coordinates
      }
      shopType
      cuisines
    }
  }
`;
