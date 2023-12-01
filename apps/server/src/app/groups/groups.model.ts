import { Field, ObjectType } from '@nestjs/graphql';
import { Season } from '../seasons/seasons.model';

@ObjectType()
export class Group {
  @Field()
  name: string;

  @Field()
  id: number;

  @Field()
  banner_url: string;

  @Field()
  thumbnail_url: string;

  @Field(type => [Season])
  seasons: Season[];
}
