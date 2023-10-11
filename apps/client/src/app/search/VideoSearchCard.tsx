import { Card, CardBody, GridItem, Image, Text } from "@chakra-ui/react";
import { Video } from "../../gql/graphql";


const VideoSearchCard = ({ title, videoThumbnails }: Pick<Video, "title" | "videoThumbnails">) => {
  const videoThumbnailUrl = videoThumbnails.find(thumbnail => thumbnail.quality === "medium")?.url;
  return (
    <GridItem>
      <Card boxShadow="none">
        <CardBody>
          <Image src={videoThumbnailUrl} borderRadius="lg" alt="" />
          <Text mt={2}>{title}</Text>
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default VideoSearchCard;