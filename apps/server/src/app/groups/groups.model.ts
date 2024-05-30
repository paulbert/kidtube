import { Field, ObjectType } from '@nestjs/graphql';
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
