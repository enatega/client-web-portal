import { gql } from '@apollo/client';

export const GET_VENDORS = gql`
  query vendors {
    vendors {
      _id
      email
      userType
      restaurants {
        _id
      }
    }
    vendorCount @client
  }
`;

export const GET_VENDORS_L = gql`
  query vendors {
    vendors {
      _id
    }
  }
`;
