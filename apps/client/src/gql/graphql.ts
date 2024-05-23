/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddVideosToGroupInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  videos: Array<VideoInput>;
};

export type Group = {
  __typename?: 'Group';
  banner_url: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  seasons: Array<Season>;
  thumbnail_url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addVideosToGroup: Group;
};


export type MutationAddVideosToGroupArgs = {
  data: AddVideosToGroupInput;
};

export type Query = {
  __typename?: 'Query';
  getAllGroups: Array<Group>;
  videoSearch: Array<Video>;
};


export type QueryVideoSearchArgs = {
  query: Scalars['String']['input'];
};

export type Season = {
  __typename?: 'Season';
  groupId: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  order: Scalars['Float']['output'];
  videos: Video;
};

export type Video = {
  __typename?: 'Video';
  order: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  videoId: Scalars['String']['output'];
  videoThumbnails: Array<VideoThumbnail>;
};

export type VideoInput = {
  title: Scalars['String']['input'];
  videoId: Scalars['String']['input'];
  videoThumbnails: Array<VideoThumbnailInput>;
};

export type VideoThumbnail = {
  __typename?: 'VideoThumbnail';
  height: Scalars['Int']['output'];
  quality: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type VideoThumbnailInput = {
  height: Scalars['Int']['input'];
  quality: Scalars['String']['input'];
  url: Scalars['String']['input'];
  width: Scalars['Int']['input'];
};

export type VideoSearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type VideoSearchQuery = { __typename?: 'Query', videoSearch: Array<{ __typename?: 'Video', videoId: string, title: string, videoThumbnails: Array<{ __typename?: 'VideoThumbnail', url: string, height: number, width: number, quality: string }> }> };

export type GetAllGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGroupsQuery = { __typename?: 'Query', getAllGroups: Array<{ __typename?: 'Group', id: number, name: string, seasons: Array<{ __typename?: 'Season', id: number, order: number }> }> };

export type AddVideosToGroupMutationVariables = Exact<{
  data: AddVideosToGroupInput;
}>;


export type AddVideosToGroupMutation = { __typename?: 'Mutation', addVideosToGroup: { __typename?: 'Group', name: string } };


export const VideoSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VideoSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"videoThumbnails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}}]}}]}}]}}]} as unknown as DocumentNode<VideoSearchQuery, VideoSearchQueryVariables>;
export const GetAllGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllGroupsQuery, GetAllGroupsQueryVariables>;
export const AddVideosToGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddVideosToGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddVideosToGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addVideosToGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddVideosToGroupMutation, AddVideosToGroupMutationVariables>;