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
  cat_id1?: Maybe<Cat>;
  cat_id2?: Maybe<Cat>;
  id: Scalars["Float"]["output"];
  isLike?: Maybe<Scalars["Boolean"]["output"]>;
  isMatch?: Maybe<Scalars["Boolean"]["output"]>;
};

export type LogginInfosInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  catCreation: Scalars["Boolean"]["output"];
  login: Cat;
  removeLike: Scalars["Boolean"]["output"];
  sendDislike: Like;
  sendLike: Like;
};

export type MutationCatCreationArgs = {
  data: CatCreationInput;
};

export type MutationLoginArgs = {
  data: LogginInfosInput;
};

export type MutationRemoveLikeArgs = {
  catId1: Scalars["Int"]["input"];
  catId2: Scalars["Int"]["input"];
};

export type MutationSendDislikeArgs = {
  catId1: Scalars["Int"]["input"];
  catId2: Scalars["Int"]["input"];
};

export type MutationSendLikeArgs = {
  catId1: Scalars["Int"]["input"];
  catId2: Scalars["Int"]["input"];
};

export type Query = {
  __typename?: "Query";
  fullcats?: Maybe<Array<Cat>>;
  getCatById?: Maybe<Cat>;
  likedCats?: Maybe<Array<Cat>>;
  matchedCats?: Maybe<Array<Cat>>;
  swipeList?: Maybe<Array<Cat>>;
};

export type QueryGetCatByIdArgs = {
  id: Scalars["Float"]["input"];
};

export type QueryLikedCatsArgs = {
  catId: Scalars["Int"]["input"];
};

export type QueryMatchedCatsArgs = {
  catId: Scalars["Int"]["input"];
};

export type QuerySwipeListArgs = {
  catId: Scalars["Int"]["input"];
};

export type CatCreationInput = {
  available?: InputMaybe<Scalars["String"]["input"]>;
  birthday?: InputMaybe<Scalars["DateTimeISO"]["input"]>;
  breed?: InputMaybe<Scalars["String"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  hair_color?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  profile_picture?: InputMaybe<Scalars["String"]["input"]>;
  sexe?: InputMaybe<Scalars["String"]["input"]>;
  surname?: InputMaybe<Scalars["String"]["input"]>;
};

export type CatCreationMutationVariables = Exact<{
  data: CatCreationInput;
}>;

export type CatCreationMutation = {
  __typename?: "Mutation";
  catCreation: boolean;
};

export type LoginMutationVariables = Exact<{
  data: LogginInfosInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "Cat"; id: number };
};

export type RemoveLikeMutationVariables = Exact<{
  catId2: Scalars["Int"]["input"];
  catId1: Scalars["Int"]["input"];
}>;

export type RemoveLikeMutation = {
  __typename?: "Mutation";
  removeLike: boolean;
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
  matchedCats?: Array<{
    __typename?: "Cat";
    id: number;
    name: string;
    birthday: Date;
    profile_picture: string;
    surname: string;
  }> | null;
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
    surname: string;
    description: string;
    birthday: Date;
    profile_picture: string;
    available: string;
    city: string;
    breed: string;
    interests?: Array<{
      __typename?: "Interest";
      id: number;
      name: string;
    }> | null;
  } | null;
};

export type MessagesCatsQueryVariables = Exact<{
  catId: Scalars["Int"]["input"];
}>;

export type MessagesCatsQuery = {
  __typename?: "Query";
  matchedCats?: Array<{
    __typename?: "Cat";
    id: number;
    name: string;
    profile_picture: string;
  }> | null;
};

export type GetForHeaderQueryVariables = Exact<{
  getCatByIdId: Scalars["Float"]["input"];
}>;

export type GetForHeaderQuery = {
  __typename?: "Query";
  getCatById?: {
    __typename?: "Cat";
    id: number;
    name: string;
    surname: string;
    profile_picture: string;
  } | null;
};

export type SwipeListQueryVariables = Exact<{
  catId: Scalars["Int"]["input"];
}>;

export type SwipeListQuery = {
  __typename?: "Query";
  swipeList?: Array<{
    __typename?: "Cat";
    id: number;
    name: string;
    birthday: Date;
    profile_picture: string;
    surname: string;
    interests?: Array<{
      __typename?: "Interest";
      id: number;
      name: string;
    }> | null;
  }> | null;
};

export type SendLikeMutationVariables = Exact<{
  catId1: Scalars["Int"]["input"];
  catId2: Scalars["Int"]["input"];
}>;

export type SendLikeMutation = {
  __typename?: "Mutation";
  sendLike: {
    __typename?: "Like";
    id: number;
    isMatch?: boolean | null;
    cat_id1?: { __typename?: "Cat"; id: number; name: string } | null;
    cat_id2?: { __typename?: "Cat"; id: number; name: string } | null;
  };
};

export type SendDislikeMutationVariables = Exact<{
  catId1: Scalars["Int"]["input"];
  catId2: Scalars["Int"]["input"];
}>;

export type SendDislikeMutation = {
  __typename?: "Mutation";
  sendDislike: {
    __typename?: "Like";
    id: number;
    cat_id1?: { __typename?: "Cat"; id: number; name: string } | null;
    cat_id2?: { __typename?: "Cat"; id: number; name: string } | null;
  };
};

export const CatCreationDocument = gql`
  mutation CatCreation($data: catCreationInput!) {
    catCreation(data: $data)
  }
`;
export type CatCreationMutationFn = Apollo.MutationFunction<
  CatCreationMutation,
  CatCreationMutationVariables
>;

/**
 * __useCatCreationMutation__
 *
 * To run a mutation, you first call `useCatCreationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCatCreationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [catCreationMutation, { data, loading, error }] = useCatCreationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCatCreationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CatCreationMutation,
    CatCreationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CatCreationMutation, CatCreationMutationVariables>(
    CatCreationDocument,
    options
  );
}
export type CatCreationMutationHookResult = ReturnType<
  typeof useCatCreationMutation
>;
export type CatCreationMutationResult =
  Apollo.MutationResult<CatCreationMutation>;
export type CatCreationMutationOptions = Apollo.BaseMutationOptions<
  CatCreationMutation,
  CatCreationMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($data: LogginInfosInput!) {
    login(data: $data) {
      id
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RemoveLikeDocument = gql`
  mutation RemoveLike($catId2: Int!, $catId1: Int!) {
    removeLike(catId2: $catId2, catId1: $catId1)
  }
`;
export type RemoveLikeMutationFn = Apollo.MutationFunction<
  RemoveLikeMutation,
  RemoveLikeMutationVariables
>;

/**
 * __useRemoveLikeMutation__
 *
 * To run a mutation, you first call `useRemoveLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLikeMutation, { data, loading, error }] = useRemoveLikeMutation({
 *   variables: {
 *      catId2: // value for 'catId2'
 *      catId1: // value for 'catId1'
 *   },
 * });
 */
export function useRemoveLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveLikeMutation,
    RemoveLikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(
    RemoveLikeDocument,
    options
  );
}
export type RemoveLikeMutationHookResult = ReturnType<
  typeof useRemoveLikeMutation
>;
export type RemoveLikeMutationResult =
  Apollo.MutationResult<RemoveLikeMutation>;
export type RemoveLikeMutationOptions = Apollo.BaseMutationOptions<
  RemoveLikeMutation,
  RemoveLikeMutationVariables
>;
export const LikedCatsDocument = gql`
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
export const GetCatByIdDocument = gql`
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
export const MessagesCatsDocument = gql`
  query MessagesCats($catId: Int!) {
    matchedCats(catId: $catId) {
      id
      name
      profile_picture
    }
  }
`;

/**
 * __useMessagesCatsQuery__
 *
 * To run a query within a React component, call `useMessagesCatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesCatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesCatsQuery({
 *   variables: {
 *      catId: // value for 'catId'
 *   },
 * });
 */
export function useMessagesCatsQuery(
  baseOptions: Apollo.QueryHookOptions<
    MessagesCatsQuery,
    MessagesCatsQueryVariables
  > &
    (
      | { variables: MessagesCatsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MessagesCatsQuery, MessagesCatsQueryVariables>(
    MessagesCatsDocument,
    options
  );
}
export function useMessagesCatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MessagesCatsQuery,
    MessagesCatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MessagesCatsQuery, MessagesCatsQueryVariables>(
    MessagesCatsDocument,
    options
  );
}
export function useMessagesCatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        MessagesCatsQuery,
        MessagesCatsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MessagesCatsQuery, MessagesCatsQueryVariables>(
    MessagesCatsDocument,
    options
  );
}
export type MessagesCatsQueryHookResult = ReturnType<
  typeof useMessagesCatsQuery
>;
export type MessagesCatsLazyQueryHookResult = ReturnType<
  typeof useMessagesCatsLazyQuery
>;
export type MessagesCatsSuspenseQueryHookResult = ReturnType<
  typeof useMessagesCatsSuspenseQuery
>;
export type MessagesCatsQueryResult = Apollo.QueryResult<
  MessagesCatsQuery,
  MessagesCatsQueryVariables
>;
export const GetForHeaderDocument = gql`
  query GetForHeader($getCatByIdId: Float!) {
    getCatById(id: $getCatByIdId) {
      id
      name
      surname
      profile_picture
    }
  }
`;

/**
 * __useGetForHeaderQuery__
 *
 * To run a query within a React component, call `useGetForHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForHeaderQuery({
 *   variables: {
 *      getCatByIdId: // value for 'getCatByIdId'
 *   },
 * });
 */
export function useGetForHeaderQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetForHeaderQuery,
    GetForHeaderQueryVariables
  > &
    (
      | { variables: GetForHeaderQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetForHeaderQuery, GetForHeaderQueryVariables>(
    GetForHeaderDocument,
    options
  );
}
export function useGetForHeaderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetForHeaderQuery,
    GetForHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetForHeaderQuery, GetForHeaderQueryVariables>(
    GetForHeaderDocument,
    options
  );
}
export function useGetForHeaderSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetForHeaderQuery,
        GetForHeaderQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetForHeaderQuery, GetForHeaderQueryVariables>(
    GetForHeaderDocument,
    options
  );
}
export type GetForHeaderQueryHookResult = ReturnType<
  typeof useGetForHeaderQuery
>;
export type GetForHeaderLazyQueryHookResult = ReturnType<
  typeof useGetForHeaderLazyQuery
>;
export type GetForHeaderSuspenseQueryHookResult = ReturnType<
  typeof useGetForHeaderSuspenseQuery
>;
export type GetForHeaderQueryResult = Apollo.QueryResult<
  GetForHeaderQuery,
  GetForHeaderQueryVariables
>;
export const SwipeListDocument = gql`
  query SwipeList($catId: Int!) {
    swipeList(catId: $catId) {
      id
      name
      birthday
      profile_picture
      surname
      interests {
        id
        name
      }
    }
  }
`;

/**
 * __useSwipeListQuery__
 *
 * To run a query within a React component, call `useSwipeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSwipeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSwipeListQuery({
 *   variables: {
 *      catId: // value for 'catId'
 *   },
 * });
 */
export function useSwipeListQuery(
  baseOptions: Apollo.QueryHookOptions<
    SwipeListQuery,
    SwipeListQueryVariables
  > &
    ({ variables: SwipeListQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SwipeListQuery, SwipeListQueryVariables>(
    SwipeListDocument,
    options
  );
}
export function useSwipeListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SwipeListQuery,
    SwipeListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SwipeListQuery, SwipeListQueryVariables>(
    SwipeListDocument,
    options
  );
}
export function useSwipeListSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<SwipeListQuery, SwipeListQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SwipeListQuery, SwipeListQueryVariables>(
    SwipeListDocument,
    options
  );
}
export type SwipeListQueryHookResult = ReturnType<typeof useSwipeListQuery>;
export type SwipeListLazyQueryHookResult = ReturnType<
  typeof useSwipeListLazyQuery
>;
export type SwipeListSuspenseQueryHookResult = ReturnType<
  typeof useSwipeListSuspenseQuery
>;
export type SwipeListQueryResult = Apollo.QueryResult<
  SwipeListQuery,
  SwipeListQueryVariables
>;
export const SendLikeDocument = gql`
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
export type SendLikeMutationFn = Apollo.MutationFunction<
  SendLikeMutation,
  SendLikeMutationVariables
>;

/**
 * __useSendLikeMutation__
 *
 * To run a mutation, you first call `useSendLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendLikeMutation, { data, loading, error }] = useSendLikeMutation({
 *   variables: {
 *      catId1: // value for 'catId1'
 *      catId2: // value for 'catId2'
 *   },
 * });
 */
export function useSendLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendLikeMutation,
    SendLikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendLikeMutation, SendLikeMutationVariables>(
    SendLikeDocument,
    options
  );
}
export type SendLikeMutationHookResult = ReturnType<typeof useSendLikeMutation>;
export type SendLikeMutationResult = Apollo.MutationResult<SendLikeMutation>;
export type SendLikeMutationOptions = Apollo.BaseMutationOptions<
  SendLikeMutation,
  SendLikeMutationVariables
>;
export const SendDislikeDocument = gql`
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
export type SendDislikeMutationFn = Apollo.MutationFunction<
  SendDislikeMutation,
  SendDislikeMutationVariables
>;

/**
 * __useSendDislikeMutation__
 *
 * To run a mutation, you first call `useSendDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendDislikeMutation, { data, loading, error }] = useSendDislikeMutation({
 *   variables: {
 *      catId1: // value for 'catId1'
 *      catId2: // value for 'catId2'
 *   },
 * });
 */
export function useSendDislikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendDislikeMutation,
    SendDislikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendDislikeMutation, SendDislikeMutationVariables>(
    SendDislikeDocument,
    options
  );
}
export type SendDislikeMutationHookResult = ReturnType<
  typeof useSendDislikeMutation
>;
export type SendDislikeMutationResult =
  Apollo.MutationResult<SendDislikeMutation>;
export type SendDislikeMutationOptions = Apollo.BaseMutationOptions<
  SendDislikeMutation,
  SendDislikeMutationVariables
>;
