import { gql } from '@apollo/client';

export const GET_VENDORS = gql`
  query vendors {
    vendors {
      _id
      email
      userType
      restaurants {
        _id
        orderId
        orderPrefix
        slug
        name
        image
        address
        location {
          coordinates
        }
        zone {
          _id
          title
        }
        shopType
      }
    }
  }
`;
export const GET_VENDORS_L = gql`
  query vendors {
    vendors {
      _id
    }
  }
`;
