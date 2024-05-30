/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetLibraryPageGroups {\n    getAllGroups {\n      id\n      name\n      thumbnailUrl\n    }\n  }\n": types.GetLibraryPageGroupsDocument,
    "\n  query SeasonsQuery($groupId: Int!) {\n    getSeasons(groupId: $groupId) {\n      id\n      videos {\n        id\n        title\n        thumbnailUrl\n      }\n    }\n  }\n": types.SeasonsQueryDocument,
    "\n  query VideoSearch($query: String!) {\n    videoSearch(query: $query) {\n      videoId\n      title\n      videoThumbnails {\n        url\n        height\n        width\n        quality\n      }\n    }\n  }\n": types.VideoSearchDocument,
    "\n  query GetAllGroups {\n    getAllGroups {\n      id\n      name\n      seasons {\n        id\n        order\n      }\n    }\n  }\n": types.GetAllGroupsDocument,
    "\n  mutation AddVideosToGroup($data: AddVideosToGroupInput!) {\n    addVideosToGroup(data: $data) {\n      name\n    }\n  }\n": types.AddVideosToGroupDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLibraryPageGroups {\n    getAllGroups {\n      id\n      name\n      thumbnailUrl\n    }\n  }\n"): (typeof documents)["\n  query GetLibraryPageGroups {\n    getAllGroups {\n      id\n      name\n      thumbnailUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SeasonsQuery($groupId: Int!) {\n    getSeasons(groupId: $groupId) {\n      id\n      videos {\n        id\n        title\n        thumbnailUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query SeasonsQuery($groupId: Int!) {\n    getSeasons(groupId: $groupId) {\n      id\n      videos {\n        id\n        title\n        thumbnailUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VideoSearch($query: String!) {\n    videoSearch(query: $query) {\n      videoId\n      title\n      videoThumbnails {\n        url\n        height\n        width\n        quality\n      }\n    }\n  }\n"): (typeof documents)["\n  query VideoSearch($query: String!) {\n    videoSearch(query: $query) {\n      videoId\n      title\n      videoThumbnails {\n        url\n        height\n        width\n        quality\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllGroups {\n    getAllGroups {\n      id\n      name\n      seasons {\n        id\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllGroups {\n    getAllGroups {\n      id\n      name\n      seasons {\n        id\n        order\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddVideosToGroup($data: AddVideosToGroupInput!) {\n    addVideosToGroup(data: $data) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation AddVideosToGroup($data: AddVideosToGroupInput!) {\n    addVideosToGroup(data: $data) {\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;