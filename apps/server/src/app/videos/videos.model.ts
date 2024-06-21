import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvidiousVideo {
  @Field()
  title: string;

  @Field()
  videoId: string;

  @Field(type => [VideoThumbnail])
  videoThumbnails: VideoThumbnail[];
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
export class UpdateVideosSeasonInput {
  @Field(type => [String])
  videoIds: string[];

  @Field({ nullable: true })
  seasonId: number;
}

@InputType()
export class InvidiousVideoInput {
  @Field()
  title: string;

  @Field()
  videoId: string;

  @Field(type => [VideoThumbnailInput])
  videoThumbnails: VideoThumbnailInput[];
}

@InputType()
export class ReorderVideoInput {
  @Field()
  videoId: string;

  @Field()
  newIndex: number;
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
