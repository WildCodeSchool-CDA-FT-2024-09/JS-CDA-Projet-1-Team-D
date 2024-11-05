import { gql } from "@apollo/client";

// SWIPE PAGE
export const GET_SWIPE_LIST = gql`
  query SwipeList($catId: Int!) {
    swipeList(catId: $catId) {
      id
      name
      birthday
      profile_picture
      surname
    }
  }
`;

export const SENDLIKE = gql`
  mutation SendLike($catId1: Int!, $catId2: Int!) {
    sendLike(catId1: $catId1, catId2: $catId2) {
      id
      isMatch
      cat_id1 {
        id
        name
      }
      cat_id2 {
        id
        name
      }
    }
  }
`;

export const SENDDISLIKE = gql`
  mutation SendDislike($catId1: Int!, $catId2: Int!) {
    sendDislike(catId1: $catId1, catId2: $catId2) {
      id
      cat_id1 {
        id
        name
      }
      cat_id2 {
        id
        name
      }
    }
  }
`;
