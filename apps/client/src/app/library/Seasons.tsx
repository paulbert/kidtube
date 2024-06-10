import { gql, useQuery } from '@apollo/client';
import {
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

const Seasons = () => {
  const groupId = parseInt(useParams().groupId || '');
  const { data } = useQuery<SeasonsQueryQuery>(seasonsQuery, {
    variables: { groupId },
  });
  const [season, setSeason] = useState<Season>();

  const seasons = useMemo(() => {
    const newSeasons =
      data?.getSeasons
        .filter(s => s.videos.length > 0)
        .sort((a, b) => a.order - b.order) || [];
    setSeason(newSeasons[0]);
    return newSeasons;
  }, [data?.getSeasons]);

  return (
    <VStack spacing={3} align="start">
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
        {season?.videos.map(({ thumbnailUrl, title, id }) => (
          <ListItem key={id}>
            <HStack spacing={2} as={ReactRouterLink} to={`/video/${id}`}>
              <Image src={thumbnailUrl} maxH={20} borderRadius="md" />
              <Text>{title}</Text>
            </HStack>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Seasons;
