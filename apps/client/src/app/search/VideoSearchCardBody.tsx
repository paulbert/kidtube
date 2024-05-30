import {
  CardBody,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { InvidiousVideo } from '../../gql/graphql';
import VideoPlayer from '../video/VideoPlayer';

const VideoSearchCardBody = ({ video }: { video: InvidiousVideo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { title, videoThumbnails } = video;
  const videoThumbnailUrl = videoThumbnails.find(
    thumbnail => thumbnail.quality === 'medium'
  )?.url;

  return (
    <>
      <CardBody onClick={onOpen} sx={{ cursor: 'pointer' }}>
        <Image src={videoThumbnailUrl} borderRadius="lg" alt="" />
        <Text mt={2}>{title}</Text>
      </CardBody>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ModalHeader>{title}</ModalHeader>
            <VideoPlayer video={video} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoSearchCardBody;
