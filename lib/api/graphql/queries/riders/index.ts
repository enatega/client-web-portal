import { gql } from '@apollo/client';

export const GET_RIDERS = gql`
  query riders {
    riders {
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
export const GET_RIDERS_L = gql`
  query riders {
    riders {
      _id
    }
  }
`;
