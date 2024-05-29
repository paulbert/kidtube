import { gql, useQuery } from '@apollo/client';
import { Button, Container, Flex, Grid, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Video } from '../../gql/graphql';
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
  const { data, refetch } = useQuery(videoSearchQuery);
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
        {data?.videoSearch.map((video: Video) => (
          <VideoSearchCard video={video} key={video.videoId} />
        ))}
      </Grid>
    </>
  );
};

export default Search;
