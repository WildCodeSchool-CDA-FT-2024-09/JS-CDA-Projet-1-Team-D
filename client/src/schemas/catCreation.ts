import { gql } from "@apollo/client";

export const CAT_CREATION = gql`
  mutation CatCreation($data: catCreationInput!) {
    catCreation(data: $data)
  }
`;
