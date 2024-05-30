import { AspectRatio } from '@chakra-ui/react';
import { InvidiousVideo, Video } from '../../gql/graphql';

function isInvidiousVideo(
  video: InvidiousVideo | Video
): video is InvidiousVideo {
  return (video as InvidiousVideo).videoId !== undefined;
}

const VideoPlayer = ({ video }: { video: InvidiousVideo | Video }) => {
  const { title } = video;
  const videoId = isInvidiousVideo(video) ? video.videoId : video.id;
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
