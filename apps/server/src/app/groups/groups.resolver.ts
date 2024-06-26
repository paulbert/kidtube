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

import { Group, UpdateGroupThumbnailUrlInput } from './groups.model';
import { PrismaService } from '../prisma.service';
import { Season } from '../seasons/seasons.model';
import { GroupsService } from './groups.service';
import { SeasonsService } from '../seasons/seasons.service';
import { VideosService } from '../videos/videos.service';
import { InvidiousVideoInput } from '../videos/videos.model';

@InputType()
class AddVideosToGroupInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field(type => [InvidiousVideoInput])
  videos: InvidiousVideoInput[];
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

  @Query(returns => Group)
  async getGroup(@Args('id') id: number) {
    return await this.prismaService.group.findUnique({ where: { id } });
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
    const season = await this.seasonsService.createOrGetFirstSeason({
      groupId: group.id,
    });
    await this.videosService.addNewVideos({
      videos,
      seasonId: season.id,
    });
    return group;
  }

  @Mutation(returns => Group)
  async updateGroupThumbnailUrl(
    @Args('data') data: UpdateGroupThumbnailUrlInput
  ) {
    const { id, newThumbnailUrl } = data;
    return await this.groupsService.updateGroupThumbnailUrl(
      id,
      newThumbnailUrl
    );
  }

  @ResolveField(returns => [Season])
  async seasons(@Parent() group: Group) {
    const seasons = await this.prismaService.season.findMany({
      where: { groupId: group.id },
    });
    return seasons;
  }
}
