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
 * __useGetCatByIdQuery__
 *
 * To run a query within a React component, call `useGetCatByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCatByIdQuery({
 *   variables: {
 *      getCatByIdId: // value for 'getCatByIdId'
 *   },
 * });
 */
export function useGetCatByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCatByIdQuery,
    GetCatByIdQueryVariables
  > &
    (
      | { variables: GetCatByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCatByIdQuery, GetCatByIdQueryVariables>(
    GetCatByIdDocument,
    options
  );
}
export function useGetCatByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCatByIdQuery,
    GetCatByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCatByIdQuery, GetCatByIdQueryVariables>(
    GetCatByIdDocument,
    options
  );
}
export function useGetCatByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetCatByIdQuery, GetCatByIdQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetCatByIdQuery, GetCatByIdQueryVariables>(
    GetCatByIdDocument,
    options
  );
}
export type GetCatByIdQueryHookResult = ReturnType<typeof useGetCatByIdQuery>;
export type GetCatByIdLazyQueryHookResult = ReturnType<
  typeof useGetCatByIdLazyQuery
>;
export type GetCatByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetCatByIdSuspenseQuery
>;
export type GetCatByIdQueryResult = Apollo.QueryResult<
  GetCatByIdQuery,
  GetCatByIdQueryVariables
>;
