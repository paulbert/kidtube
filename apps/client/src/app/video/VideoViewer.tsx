import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import { Grid, Heading, Skeleton } from '@chakra-ui/react';
import { GetVideoQueryQuery } from '../../gql/graphql';

const getVideoQuery = gql`
  query GetVideoQuery($id: String!) {
    getVideo(id: $id) {
      id
      title
    }
  }
`;

const VideoViewer = () => {
  const { id } = useParams();
  const { data, loading } = useQuery<GetVideoQueryQuery>(getVideoQuery, {
    variables: { id },
  });

  if (data === undefined || loading) {
    return <Skeleton height="85vh" />;
  }

  const video = data?.getVideo;

  return (
    <Grid gap={6}>
      <VideoPlayer video={video} />
      <Heading>{video.title}</Heading>
    </Grid>
  );
};

export default VideoViewer;
