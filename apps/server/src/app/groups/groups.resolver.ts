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
import { Inject, Injectable } from '@nestjs/common';

import { Group } from './groups.model';
import { PrismaService } from '../prisma.service';
import { Season } from '../seasons/seasons.model';
import { GroupsService } from './groups.service';
import { SeasonsService } from '../seasons/seasons.service';
import { VideosService } from '../videos/videos.service';
import { Video } from '../videos/videos.model';

@InputType()
class AddVideosToGroupInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field(type => [String])
  videos: Video[];
}

@Resolver(of => Group)
@Injectable()
export class GroupsResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly groupsService: GroupsService,
    private readonly seasonsService: SeasonsService,
    private readonly videosService: VideosService
  ) {}

  @Query(returns => [Group])
  async getAllGroups() {
    return this.prismaService.group.findMany();
  }

  @Mutation(returns => Group)
  async addVideosToGroup(
    @Args('data') data: AddVideosToGroupInput,
    @Context() ctx
  ) {
    const { name, id, videos } = data;
    const group = await (id === undefined
      ? this.groupsService.createNewGroup({
          name,
        })
      : this.prismaService.group.findUnique({ where: { id: id } }));
    console.log(group);
    const season = await this.seasonsService.createNewSeason({
      groupId: group.id,
    });
    await this.videosService.addNewVideos({ videos, seasonId: season.id });
    return group;
  }

  @ResolveField(returns => [Season])
  async seasons(@Parent() group: Group) {
    const seasons = await this.prismaService.season.findMany({
      where: { groupId: group.id },
    });
    return seasons;
  }
}
