import { Field, ObjectType } from '@nestjs/graphql';

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
}
