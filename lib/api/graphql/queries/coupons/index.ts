import { gql } from '@apollo/client';

export const getCoupons = gql`
  query Coupons {
    coupons {
      _id
      title
      discount
      enabled
    }
  }
`;
