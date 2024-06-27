import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Season } from '../seasons/seasons.model';

@ObjectType()
export class Group {
  @Field()
  name: string;

  @Field()
  id: number;

  @Field()
  bannerUrl: string;

  @Field()
  thumbnailUrl: string;

  @Field(type => [Season])
  seasons: Season[];
}

@InputType()
export class UpdateGroupThumbnailUrlInput {
  @Field()
  id: number;

  @Field()
  newThumbnailUrl: string;
}
