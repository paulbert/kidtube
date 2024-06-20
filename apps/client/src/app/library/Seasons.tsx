import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  SeasonsQueryQuery,
  UpdateVideosSeasonMutationMutation,
  Video,
} from '../../gql/graphql';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  closestCorners,
  useDraggable,
} from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const seasonsQuery = gql`
  query SeasonsQuery($groupId: Int!) {
    getSeasons(groupId: $groupId) {
      id
      videos {
        id
        title
        thumbnailUrl
      }
      order
    }
  }
`;

const updateVideosSeasonMutation = gql`
  mutation UpdateVideosSeasonMutation($data: UpdateVideosSeasonInput!) {
    updateVideosSeason(data: $data) {
      id
    }
  }
`;

type Season = SeasonsQueryQuery['getSeasons'][number];

const Seasons = ({ isParentMode = false }: { isParentMode?: boolean }) => {
  const groupId = parseInt(useParams().groupId || '');
  const { data, refetch } = useQuery<SeasonsQueryQuery>(seasonsQuery, {
    variables: { groupId },
    fetchPolicy: 'no-cache',
  });
  const [updateVideosSeason] = useMutation<UpdateVideosSeasonMutationMutation>(
    updateVideosSeasonMutation,
    {
      onCompleted: () => {
        refetch();
        onClose();
      },
    }
  );
  const [videos, setVideos] = useState<Video[]>();
  const [seasonIdToChange, setSeasonIdToChange] = useState<number>();
  const [checkedVideoIds, setCheckedVideoIds] = useState<Set<string>>(
    new Set([])
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filterFalsy = (items: any[] | undefined) =>
    items ? items.filter((item: any) => item) : [];

  const seasons = useMemo(() => {
    const newSeasons =
      data?.getSeasons
        .filter(s => s.videos.length > 0)
        .sort((a, b) => a.order - b.order) || [];
    const firstSeason = newSeasons[0] || {};
    setVideos(filterFalsy(firstSeason.videos));
    setSeasonIdToChange(firstSeason?.id);
    return newSeasons;
  }, [data?.getSeasons]);

  const onSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const season = seasons.find(s => s.id === parseInt(event.target.value));
    setVideos(filterFalsy(season?.videos));
    setSeasonIdToChange(season?.id || 0);
    setCheckedVideoIds(new Set([]));
  };

  const onSeasonChangeConfirm = () => {
    updateVideosSeason({
      variables: {
        data: {
          videoIds: Array.from(checkedVideoIds),
          seasonId: seasonIdToChange,
        },
      },
    });
  };

  const onCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newVideoIds = new Set(checkedVideoIds);
    if (event.target.checked) {
      newVideoIds.add(id);
    } else {
      newVideoIds.delete(id);
    }
    setCheckedVideoIds(newVideoIds);
  };

  const reorderVideos = (event: DragEndEvent) => {
    const { over, active } = event;
    const activeId = active.id.toString();
    const overId = over?.id.toString();
    if (!overId || overId === activeId) {
      return;
    }
    const findVideoPosition = (id: string) =>
      videos?.findIndex(video => video.id === id);
    const startIndex = findVideoPosition(activeId);
    const endIndex = findVideoPosition(overId);
  };

  const ParentListItem = ({ video }: { video: Season['videos'][number] }) => {
    const { thumbnailUrl, id, title } = video;

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: video.id,
      });

    const sx = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <ListItem sx={sx} ref={setNodeRef} {...attributes} {...listeners}>
        <HStack spacing={2}>
          <Checkbox
            size="lg"
            onChange={event => onCheckboxChange(event, id)}
            isChecked={checkedVideoIds.has(id)}
          />
          <Image src={thumbnailUrl} maxH={20} borderRadius="md" />
          <Text>{title}</Text>
        </HStack>
      </ListItem>
    );
  };

  const KidListItem = ({ video }: { video: Season['videos'][number] }) => {
    const { thumbnailUrl, id, title } = video;
    return (
      <ListItem>
        <HStack spacing={2} as={ReactRouterLink} to={`/video/${id}`}>
          <Image src={thumbnailUrl} maxH={20} borderRadius="md" />
          <Text>{title}</Text>
        </HStack>
      </ListItem>
    );
  };

  return (
    <VStack spacing={3} align="start">
      {isParentMode ? (
        <Button isDisabled={checkedVideoIds.size <= 0} onClick={onOpen}>
          Change Season for Selected
        </Button>
      ) : null}
      <Select onChange={onSeasonChange}>
        {seasons.map((s, index) => (
          <option value={s.id} key={s.id}>
            Season {index + 1}
          </option>
        ))}
      </Select>

      {videos && videos.length > 0 ? (
        <DndContext onDragEnd={reorderVideos}>
          <SortableContext items={videos}>
            <List spacing={3}>
              {videos?.map(video =>
                isParentMode ? (
                  <ParentListItem video={video} key={video.id} />
                ) : (
                  <KidListItem video={video} key={video.id} />
                )
              )}
            </List>
          </SortableContext>
        </DndContext>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Season</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              onChange={({ target: { value } }) =>
                setSeasonIdToChange(parseInt(value))
              }
            >
              {seasons.map((s, index) => (
                <option
                  value={s.id}
                  key={s.id}
                  selected={seasonIdToChange === s.id}
                >
                  Season {index + 1}
                </option>
              ))}
              <option value={undefined}>Add New Season</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSeasonChangeConfirm}>Change Season</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Seasons;
