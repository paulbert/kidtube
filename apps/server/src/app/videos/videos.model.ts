import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvidiousVideo {
  @Field()
  title: string;

  @Field()
  videoId: string;

  @Field(type => [VideoThumbnail])
  videoThumbnails: VideoThumbnail[];

  @Field()
  order: number;
}

@ObjectType()
export class Video {
  @Field()
  title: string;

  @Field()
  id: string;

  @Field()
  thumbnailUrl: string;

  @Field()
  order: number;

  @Field()
  seasonId: number;
}

@InputType()
export class VideoInput {
  @Field()
  title: string;

  @Field()
  videoId: string;

  @Field(type => [VideoThumbnailInput])
  videoThumbnails: VideoThumbnailInput[];
}

@InputType()
export class VideoThumbnailInput {
  @Field()
  quality: string;

  @Field()
  url: string;

  @Field(type => Int)
  width: number;

  @Field(type => Int)
  height: number;
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
