import { gql } from '@apollo/client';

export const createCuisine = gql`
  mutation CreateCuisine($cuisineInput: CuisineInput!) {
    createCuisine(cuisineInput: $cuisineInput) {
      _id
      name
      description
      image
      shopType
    }
  }
`;
export const editCuisine = gql`
  mutation editCuisine($cuisineInput: CuisineInput!) {
    editCuisine(cuisineInput: $cuisineInput) {
      _id
      name
      description
      image
      shopType
    }
  }
`;
export const deleteCuisine = gql`
  mutation DeleteCuisine($id: String!) {
    deleteCuisine(id: $id)
  }
`;
