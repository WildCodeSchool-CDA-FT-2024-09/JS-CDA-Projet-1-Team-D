import { gql } from "@apollo/client";

export const GET_CAT_BY_ID = gql`
  mutation RemoveLike($catId2: Int!, $catId1: Int!) {
    removeLike(catId2: $catId2, catId1: $catId1)
  }
`;
