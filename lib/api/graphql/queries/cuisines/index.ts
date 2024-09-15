import { gql } from '@apollo/client';

export const getCuisines = gql`
  query Cuisines {
    cuisines {
      _id
      name
      description
      image
      shopType
    }
  }
`;
