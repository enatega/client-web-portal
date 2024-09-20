import { gql } from '@apollo/client';

export const CREATE_RIDER = gql`
  mutation CreateRider($riderInput: RiderInput!) {
    createRider(riderInput: $riderInput) {
      _id
      name
      username
      password
      phone
      available
      zone {
        _id
      }
    }
  }
`;

export const EDIT_RIDER = gql`
  mutation EditRider($riderInput: RiderInput!) {
    editRider(riderInput: $riderInput) {
      _id
      name
      username
      phone
      zone {
        _id
      }
    }
  }
`;

export const DELETE_RIDER = gql`
  mutation DeleteRider($id: String!) {
    deleteRider(id: $id) {
      _id
    }
  }
`;
