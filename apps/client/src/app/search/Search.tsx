import { gql, useQuery } from '@apollo/client';
import { Button, Container, Flex, Grid, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Video } from '../../gql/graphql';
import VideoSearchCard from './VideoSearchCard';

const videoSearchQuery = gql`
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
`

const Search = () => {

  const { data, refetch } = useQuery(videoSearchQuery);
  const [ query, setQuery ] = useState('');

  return (
    <Container maxW="container.lg" my={4}>
      <Flex align="center" gap={2}>
        <Input size="lg" onChange={(e) => setQuery(e.target.value)}/>
        <Button onClick={(e) => refetch({ query })}>Search</Button>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {data?.videoSearch.map(({ title, videoThumbnails }: Video) => (
          <VideoSearchCard title={title} videoThumbnails={videoThumbnails} />
        ))}
      </Grid>
    </Container>
  );

}

export default Search;