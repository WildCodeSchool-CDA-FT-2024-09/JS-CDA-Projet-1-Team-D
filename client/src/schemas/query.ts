import { gql } from "@apollo/client";

export const GET_LIKED_CATS = gql`
  query LikedCats($catId: Int!) {
    likedCats(catId: $catId) {
      id
      name
      birthday
      profile_picture
      surname
    }
  }
`;
