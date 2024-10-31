import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: LogginInfosInput!) {
    login(data: $data) {
      id
    }
  }
`;
