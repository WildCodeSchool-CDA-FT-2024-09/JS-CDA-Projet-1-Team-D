import { gql } from "@apollo/client";

export const GET_LIKED_AND_MATCHES_CATS = gql`
  query LikedCats($catId: Int!) {
    likedCats(catId: $catId) {
      id
      name
      birthday
      profile_picture
      surname
    }
    matchedCats(catId: $catId) {
      id
      name
      birthday
      profile_picture
      surname
    }
  }
`;

export const GET_CAT_BY_ID = gql`
  query GetCatById($getCatByIdId: Float!) {
    getCatById(id: $getCatByIdId) {
      id
      name
      surname
      description
      birthday
      profile_picture
      available
      city
      breed
      interests {
        id
        name
      }
    }
  }
`;

export const GET_MESSAGES_CATS = gql`
  query MessagesCats($catId: Int!) {
    matchedCats(catId: $catId) {
      id
      name
      profile_picture
    }
  }
`;

export const GET_CAT_FOR_HEADER = gql`
  query GetForHeader($getCatByIdId: Float!) {
    getCatById(id: $getCatByIdId) {
      id
      name
      surname
      profile_picture
    }
  }
`;
