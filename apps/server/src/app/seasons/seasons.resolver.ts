import { Resolver, Args, Query, Parent, ResolveField } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Season } from './seasons.model';
import { PrismaService } from '../prisma.service';
import { Video } from '../videos/videos.model';

@Resolver(of => Season)
export class SeasonsResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => [Season])
  getSeasons(@Args('groupId') groupId: number) {
    return this.prismaService.season.findMany({ where: { groupId: groupId } });
  }

  @ResolveField(returns => [Video])
  async videos(@Parent() season: Season) {
    return this.prismaService.video.findMany({
      where: { seasonId: season.id },
      orderBy: { order: 'asc' },
    });
  }
}
