import { gql } from '@apollo/client';

export const GET_RESTAURANTS = gql`
  query restaurants {
    restaurants {
      _id
      name
      image
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
      }
      shopType
    }
  }
`;

export const GET_RESTAURANTS_L = gql`
  query restaurants {
    restaurants {
      _id
    }
  }
`;
