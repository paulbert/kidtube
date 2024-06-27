import { gql, useMutation, useQuery } from '@apollo/client';
import { Heading, Input, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Seasons from './Seasons';

const getGroup = gql`
  query GetGroup($id: Int!) {
    getGroup(id: $id) {
      id
      thumbnailUrl
    }
  }
`;

const updateGroupThumbnailUrl = gql`
  mutation UpdateGroupThumbnailUrl($data: UpdateGroupThumbnailUrlInput!) {
    updateGroupThumbnailUrl(data: $data) {
      id
      thumbnailUrl
    }
  }
`;

const Group = ({ isParentMode = false }: { isParentMode?: boolean }) => {
  const groupId = parseInt(useParams().groupId || '');
  const { data, loading } = useQuery(getGroup, { variables: { id: groupId } });
  const [updateThumbnailUrl] = useMutation(updateGroupThumbnailUrl);

  const group = data?.getGroup;

  return group ? (
    <>
      <Heading>Group Name</Heading>
      {isParentMode ? (
        <Input
          placeholder="Thumbnail Url"
          value={group.thumbnailUrl}
          onChange={e =>
            updateThumbnailUrl({
              variables: {
                data: { id: groupId, newThumbnailUrl: e.target.value },
              },
            })
          }
        />
      ) : null}
      <Seasons isParentMode={isParentMode} groupId={groupId} />
    </>
  ) : (
    <Spinner />
  );
};

export default Group;
