import { gql } from '@apollo/client';

export const CREATE_VENDOR = gql`
  mutation CreateVendor($vendorInput: VendorInput) {
    createVendor(vendorInput: $vendorInput) {
      _id
      email
      userType
    }
  }
`;

export const EDIT_VENDOR = gql`
  mutation EditVendor($vendorInput: VendorInput) {
    editVendor(vendorInput: $vendorInput) {
      _id
      email
    }
  }
`;
