import {
  Resolver,
  Args,
  Mutation,
  InputType,
  Field,
  Context,
  Query,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Group } from './groups.model';
import { PrismaService } from '../prisma.service';

@InputType()
class AddVideosToGroupInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;
}

@Resolver(of => Group)
export class GroupsResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => [Group])
  async getAllGroups(): Promise<Group[]> {
    return this.prismaService.group.findMany();
  }

  @Mutation(returns => Group)
  async addVideosToGroup(
    @Args('data') data: AddVideosToGroupInput,
    @Context() ctx
  ): Promise<Group> {
    return this.prismaService.group.create({
      data: {
        name: data.name,
        banner_url: '',
      },
    });
  }
}
