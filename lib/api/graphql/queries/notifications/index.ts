import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query GetNotfications {
    notifications {
      body
      title
      createdAt
    }
  }
`;
