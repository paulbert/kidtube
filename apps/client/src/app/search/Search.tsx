import { gql, useQuery } from '@apollo/client';
import { Button, Flex, Grid, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { VideoSearchQuery } from '../../gql/graphql';
import VideoSearchCard from './VideoSearchCard';

export const videoSearchQuery = gql`
  query VideoSearch($query: String!) {
    videoSearch(query: $query) {
      videoId
      title
      videoThumbnails {
        url
        height
        width
        quality
      }
    }
  }
`;

const Search = () => {
  const { data, refetch } = useQuery<VideoSearchQuery>(videoSearchQuery);
  const [query, setQuery] = useState('');

  return (
    <>
      <Flex align="center" gap={2}>
        <Input
          size="lg"
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for videos"
        />
        <Button onClick={e => refetch({ query })}>Search</Button>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} data-testid="search-grid">
        {data?.videoSearch.map(video => (
          <VideoSearchCard video={video} key={video.videoId} />
        ))}
      </Grid>
    </>
  );
};

export default Search;
