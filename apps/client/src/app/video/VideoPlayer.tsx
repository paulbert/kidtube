import { AspectRatio } from '@chakra-ui/react';
import { Video } from '../../gql/graphql';

const VideoPlayer = ({ video }: { video: Video }) => {
  const { title, videoId } = video;
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        title={title}
        src={`https://vid.puffyan.us/embed/${videoId}`}
        allowFullScreen
      />
    </AspectRatio>
  );
};

export default VideoPlayer;
