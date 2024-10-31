import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTimeISO: { input: Date; output: Date };
};

export type Cat = {
  __typename?: "Cat";
  available: Scalars["String"]["output"];
  birthday: Scalars["DateTimeISO"]["output"];
  breed: Scalars["String"]["output"];
  city: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  hair_color: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  interests?: Maybe<Array<Interest>>;
  likedBy: Array<Like>;
  likedCats: Array<Like>;
  name: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
  profile_picture: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
  sexe: Scalars["String"]["output"];
  surname: Scalars["String"]["output"];
};

export type Interest = {
  __typename?: "Interest";
  cats: Array<Cat>;
  id: Scalars["Float"]["output"];
  name: Scalars["String"]["output"];
};

export type Like = {
  __typename?: "Like";
  cat_id1: Cat;
  cat_id2: Cat;
  id: Scalars["Float"]["output"];
  isMatch: Scalars["Boolean"]["output"];
};

export type Query = {
  __typename?: "Query";
  fullcats?: Maybe<Array<Cat>>;
  likedCats?: Maybe<Array<Cat>>;
};

export type QueryLikedCatsArgs = {
  catId: Scalars["Int"]["input"];
};

export type LikedCatsQueryVariables = Exact<{
  catId: Scalars["Int"]["input"];
}>;

export type LikedCatsQuery = {
  __typename?: "Query";
  likedCats?: Array<{
    __typename?: "Cat";
    id: number;
    name: string;
    birthday: Date;
    profile_picture: string;
    surname: string;
  }> | null;
};

export const LikedCatsDocument = gql`
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
export type Query = {
  __typename?: "Query";
  getCatById?: Maybe<Cat>;
  getCatResolvers: Array<Cat>;
};

export type QueryGetCatByIdArgs = {
  id: Scalars["Float"]["input"];
};

export type GetCatByIdQueryVariables = Exact<{
  getCatByIdId: Scalars["Float"]["input"];
}>;

export type GetCatByIdQuery = {
  __typename?: "Query";
  getCatById?: {
    __typename?: "Cat";
    id: number;
    name: string;
    description: string;
    birthday: Date;
    sexe: string;
    hair_color: string;
    profile_picture: string;
    available: string;
    city: string;
    breed: string;
    surname: string;
    interests?: Array<{
      __typename?: "Interest";
      id: number;
      name: string;
    }> | null;
  } | null;
};

export const GetCatByIdDocument = gql`
  query GetCatById($getCatByIdId: Float!) {
    getCatById(id: $getCatByIdId) {
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

/**
 * __useLikedCatsQuery__
 *
 * To run a query within a React component, call `useLikedCatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikedCatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikedCatsQuery({
 *   variables: {
 *      catId: // value for 'catId'
 *   },
 * });
 */
export function useLikedCatsQuery(
  baseOptions: Apollo.QueryHookOptions<
    LikedCatsQuery,
    LikedCatsQueryVariables
  > &
    ({ variables: LikedCatsQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LikedCatsQuery, LikedCatsQueryVariables>(
    LikedCatsDocument,
    options
  );
}
export function useLikedCatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LikedCatsQuery,
    LikedCatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LikedCatsQuery, LikedCatsQueryVariables>(
    LikedCatsDocument,
    options
  );
}
export function useLikedCatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<LikedCatsQuery, LikedCatsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<LikedCatsQuery, LikedCatsQueryVariables>(
    LikedCatsDocument,
    options
  );
}
export type LikedCatsQueryHookResult = ReturnType<typeof useLikedCatsQuery>;
export type LikedCatsLazyQueryHookResult = ReturnType<
  typeof useLikedCatsLazyQuery
>;
export type LikedCatsSuspenseQueryHookResult = ReturnType<
  typeof useLikedCatsSuspenseQuery
>;
export type LikedCatsQueryResult = Apollo.QueryResult<
  LikedCatsQuery,
  LikedCatsQueryVariables
>;
