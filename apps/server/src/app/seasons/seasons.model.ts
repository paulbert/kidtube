import { Field, ObjectType } from '@nestjs/graphql';
import { Video } from '../videos/videos.model';

@ObjectType()
export class Season {
  @Field()
  groupId: number;

  @Field()
  id: number;

  @Field()
  order: number;

  @Field(type => Video)
  videos: Video[];
}
