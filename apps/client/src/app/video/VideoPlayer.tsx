import { AspectRatio } from '@chakra-ui/react';
import { InvidiousVideo, Video } from '../../gql/graphql';

/*
  Working mirrors:
  https://inv.tux.pizza

  Possible better domain for YT direct:
  https://www.youtube-nocookie.com with ?rel=0 (limits recommended videos to channel of video)
*/

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
        src={`https://inv.tux.pizza/embed/${videoId}?rel=0`}
        allowFullScreen
      />
    </AspectRatio>
  );
};

export default VideoPlayer;
