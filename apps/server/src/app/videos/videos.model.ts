import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field()
  title: string;

  @Field()
  videoId: string;

  @Field(type => [VideoThumbnail])
  videoThumbnails: VideoThumbnail[];
}

@ObjectType()
export class VideoThumbnail {
  @Field()
  quality: string;

  @Field()
  url: string;

  @Field(type => Int)
  width: number;

  @Field(type => Int)
  height: number;
}
