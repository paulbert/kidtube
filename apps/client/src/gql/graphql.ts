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
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  videos: Array<InvidiousVideoInput>;
};

export type Group = {
  __typename?: 'Group';
  bannerUrl: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  seasons: Array<Season>;
  thumbnailUrl: Scalars['String']['output'];
};

export type InvidiousVideo = {
  __typename?: 'InvidiousVideo';
  title: Scalars['String']['output'];
  videoId: Scalars['String']['output'];
  videoThumbnails: Array<VideoThumbnail>;
};

export type InvidiousVideoInput = {
  title: Scalars['String']['input'];
  videoId: Scalars['String']['input'];
  videoThumbnails: Array<VideoThumbnailInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addVideosToGroup: Group;
  updateVideosSeason: Array<Video>;
};


export type MutationAddVideosToGroupArgs = {
  data: AddVideosToGroupInput;
};


export type MutationUpdateVideosSeasonArgs = {
  data: UpdateVideosSeasonInput;
};

export type Query = {
  __typename?: 'Query';
  getAllGroups: Array<Group>;
  getSeasons: Array<Season>;
  getVideo: Video;
  videoSearch: Array<InvidiousVideo>;
};


export type QueryGetSeasonsArgs = {
  groupId: Scalars['Int']['input'];
};


export type QueryGetVideoArgs = {
  id: Scalars['String']['input'];
};


export type QueryVideoSearchArgs = {
  query: Scalars['String']['input'];
};

export type Season = {
  __typename?: 'Season';
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  videos: Array<Video>;
};

export type UpdateVideosSeasonInput = {
  seasonId: Scalars['Int']['input'];
  videos: Array<VideoInput>;
};

export type Video = {
  __typename?: 'Video';
  id: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  seasonId: Scalars['Int']['output'];
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type VideoInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  seasonId: Scalars['Int']['input'];
  thumbnailUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
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

export type GetLibraryPageGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLibraryPageGroupsQuery = { __typename?: 'Query', getAllGroups: Array<{ __typename?: 'Group', id: number, name: string, thumbnailUrl: string }> };

export type SeasonsQueryQueryVariables = Exact<{
  groupId: Scalars['Int']['input'];
}>;


export type SeasonsQueryQuery = { __typename?: 'Query', getSeasons: Array<{ __typename?: 'Season', id: number, order: number, videos: Array<{ __typename?: 'Video', id: string, title: string, thumbnailUrl: string }> }> };

export type UpdateVideosSeasonMutationMutationVariables = Exact<{
  data: UpdateVideosSeasonInput;
}>;


export type UpdateVideosSeasonMutationMutation = { __typename?: 'Mutation', updateVideosSeason: Array<{ __typename?: 'Video', id: string }> };

export type VideoSearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type VideoSearchQuery = { __typename?: 'Query', videoSearch: Array<{ __typename?: 'InvidiousVideo', videoId: string, title: string, videoThumbnails: Array<{ __typename?: 'VideoThumbnail', url: string, height: number, width: number, quality: string }> }> };

export type GetAllGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGroupsQuery = { __typename?: 'Query', getAllGroups: Array<{ __typename?: 'Group', id: number, name: string, seasons: Array<{ __typename?: 'Season', id: number, order: number }> }> };

export type AddVideosToGroupMutationVariables = Exact<{
  data: AddVideosToGroupInput;
}>;


export type AddVideosToGroupMutation = { __typename?: 'Mutation', addVideosToGroup: { __typename?: 'Group', name: string } };

export type GetVideoQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetVideoQueryQuery = { __typename?: 'Query', getVideo: { __typename?: 'Video', id: string, title: string } };


export const GetLibraryPageGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLibraryPageGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}}]}}]} as unknown as DocumentNode<GetLibraryPageGroupsQuery, GetLibraryPageGroupsQueryVariables>;
export const SeasonsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSeasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]} as unknown as DocumentNode<SeasonsQueryQuery, SeasonsQueryQueryVariables>;
export const UpdateVideosSeasonMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVideosSeasonMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateVideosSeasonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVideosSeason"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateVideosSeasonMutationMutation, UpdateVideosSeasonMutationMutationVariables>;
export const VideoSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VideoSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"videoThumbnails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}}]}}]}}]}}]} as unknown as DocumentNode<VideoSearchQuery, VideoSearchQueryVariables>;
export const GetAllGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllGroupsQuery, GetAllGroupsQueryVariables>;
export const AddVideosToGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddVideosToGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddVideosToGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addVideosToGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddVideosToGroupMutation, AddVideosToGroupMutationVariables>;
export const GetVideoQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVideoQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetVideoQueryQuery, GetVideoQueryQueryVariables>;