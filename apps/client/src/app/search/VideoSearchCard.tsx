import { ButtonGroup, Card, CardFooter, GridItem } from '@chakra-ui/react';
import { Video } from '../../gql/graphql';
import VideoAddModal from './VideoAddModal';
import VideoSearchCardBody from './VideoSearchCardBody';

const VideoSearchCard = ({ video }: { video: Video }) => {
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
