import { gql } from "@apollo/client";

export const UPDATE_CAT_PROFILE = gql`
  mutation UpdateCatProfile(
    $updateCatProfileId: Int!
    $data: UpdateProfileInput!
  ) {
    updateCatProfile(id: $updateCatProfileId, data: $data) {
      id
      name
      description
      birthday
      sexe
      hair_color
      profile_picture
      available
      city
      breed
      surname
      interests {
        id
        name
      }
    }
  }
`;
