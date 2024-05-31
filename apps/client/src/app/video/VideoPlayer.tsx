import { AspectRatio } from '@chakra-ui/react';
import { InvidiousVideo, Video } from '../../gql/graphql';

type VideoPlayerProps = {
  video: {
    videoId?: InvidiousVideo['videoId'];
    id?: Video['id'];
    title: Video['title'];
  };
};

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const { title } = video;
  const videoId = video.videoId || video.id;
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
