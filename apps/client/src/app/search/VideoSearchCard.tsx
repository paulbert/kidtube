import { ButtonGroup, Card, CardFooter, GridItem } from '@chakra-ui/react';
import { InvidiousVideo } from '../../gql/graphql';
import VideoAddModal from './VideoAddModal';
import VideoSearchCardBody from './VideoSearchCardBody';

const VideoSearchCard = ({ video }: { video: InvidiousVideo }) => {
  return (
    <GridItem>
      <Card boxShadow="none">
        <VideoSearchCardBody video={video} />
        <CardFooter>
          <ButtonGroup spacing={2}>
            <VideoAddModal buttonText="Add video" videos={[video]} />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

export default VideoSearchCard;
