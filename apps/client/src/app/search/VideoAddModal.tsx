import { gql, useQuery, useMutation } from '@apollo/client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  AddVideosToGroupMutation,
  GetAllGroupsQuery,
  InvidiousVideo,
} from '../../gql/graphql';

export const getAllGroupsQuery = gql`
  query GetAllGroups {
    getAllGroups {
      id
      name
      seasons {
        id
        order
      }
    }
  }
`;

export const addVideosToGroupMutation = gql`
  mutation AddVideosToGroup($data: AddVideosToGroupInput!) {
    addVideosToGroup(data: $data) {
      name
    }
  }
`;

type VideoAddModalProps = {
  buttonText: string;
  videos: InvidiousVideo[];
};

const VideoAddModal = ({ buttonText, videos }: VideoAddModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedShow, setSelectedShow] = useState('');
  const [newShowName, setNewShowName] = useState('');
  const {
    data: groupsData,
    loading: loadingGroups,
    refetch,
  } = useQuery<GetAllGroupsQuery>(getAllGroupsQuery);
  const [addVideosToGroup] = useMutation<AddVideosToGroupMutation>(
    addVideosToGroupMutation,
    {
      onCompleted: () => {
        refetch();
        closeModal();
      },
    }
  );

  const addVideo = () => {
    const data =
      selectedShow === 'add'
        ? { name: newShowName, videos }
        : { id: parseInt(selectedShow), videos };
    addVideosToGroup({
      variables: { data },
    });
  };

  const closeModal = () => {
    setSelectedShow('');
    onClose();
  };

  if (loadingGroups) {
    return <Spinner size="xl" />;
  }

  const groups = groupsData?.getAllGroups;

  return (
    <>
      <Button onClick={onOpen}>{buttonText}</Button>
      <Modal isCentered onClose={closeModal} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Select Show"
              onChange={e => setSelectedShow(e.target.value)}
            >
              {groups && groups.length > 0
                ? groups.map(
                    ({ name: groupName, id }: { name: string; id: number }) => {
                      return (
                        <option value={id} key={id}>
                          {groupName}
                        </option>
                      );
                    }
                  )
                : null}
              <option value="add">Add new show...</option>
            </Select>
            {selectedShow === 'add' ? (
              <Input
                mt={2}
                placeholder="Show title"
                value={newShowName}
                onChange={e => setNewShowName(e.target.value)}
              />
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button mr={2} onClick={addVideo}>
              Add
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoAddModal;
