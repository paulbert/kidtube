import {
  Resolver,
  Args,
  Mutation,
  InputType,
  Field,
  Context,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Group } from './groups.model';
import { PrismaService } from '../prisma.service';
import { Season } from '../seasons/seasons.model';

@InputType()
class AddVideosToGroupInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field(type => [String])
  videoIds: string[];
}

@Resolver(of => Group)
export class GroupsResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => [Group])
  async getAllGroups() {
    return this.prismaService.group.findMany();
  }

  @Mutation(returns => Group)
  async addVideosToGroup(
    @Args('data') data: AddVideosToGroupInput,
    @Context() ctx
  ) {
    const newGroup = await this.prismaService.group.create({
      data: {
        name: data.name,
        bannerUrl: '',
      },
    });
    await this.prismaService.season.create({
      data: {
        groupId: newGroup.id,
        order: 1,
      },
    });
    return newGroup;
  }

  @ResolveField(returns => [Season])
  async seasons(@Parent() group: Group) {
    console.log(group);
    const seasons = await this.prismaService.season.findMany({
      where: { groupId: group.id },
    });
    console.log(seasons);
    return seasons;
  }
}
