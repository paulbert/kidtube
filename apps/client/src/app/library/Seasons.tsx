import { gql, useQuery } from '@apollo/client';
import {
  Button,
  Checkbox,
  HStack,
  Image,
  List,
  ListItem,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SeasonsQueryQuery } from '../../gql/graphql';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { useMemo, useState } from 'react';

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

type Season = SeasonsQueryQuery['getSeasons'][number];

const Seasons = ({ isParentMode = false }: { isParentMode?: boolean }) => {
  const groupId = parseInt(useParams().groupId || '');
  const { data } = useQuery<SeasonsQueryQuery>(seasonsQuery, {
    variables: { groupId },
  });
  const [season, setSeason] = useState<Season>();
  const [checkedVideoIds, setCheckedVideoIds] = useState<Set<string>>(
    new Set([])
  );

  const seasons = useMemo(() => {
    const newSeasons =
      data?.getSeasons
        .filter(s => s.videos.length > 0)
        .sort((a, b) => a.order - b.order) || [];
    setSeason(newSeasons[0]);
    return newSeasons;
  }, [data?.getSeasons]);

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

  const ParentListItem = ({ video }: { video: Season['videos'][number] }) => {
    const { thumbnailUrl, id, title } = video;
    return (
      <ListItem>
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
      <Button isDisabled={checkedVideoIds.size <= 0}>
        Change Season for Selected
      </Button>
      <Select
        onChange={event => {
          console.log(event);
          setSeason(seasons.find(s => s.id === parseInt(event.target.value)));
        }}
      >
        {seasons.map((s, index) => (
          <option value={s.id} key={s.id}>
            Season {index + 1}
          </option>
        ))}
      </Select>

      <List spacing={3}>
        {season?.videos.map(video =>
          isParentMode ? (
            <ParentListItem video={video} key={video.id} />
          ) : (
            <KidListItem video={video} key={video.id} />
          )
        )}
      </List>
    </VStack>
  );
};

export default Seasons;
