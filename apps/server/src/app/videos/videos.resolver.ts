import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import fetch from 'node-fetch';
import { map, pick } from 'ramda';

import { InvidiousVideo, UpdateVideosSeasonInput, Video } from './videos.model';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { VideosService } from './videos.service';

const INVIDIOUS_API = 'https://vid.puffyan.us/';

@Resolver(of => InvidiousVideo)
@Injectable()
export class VideosResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private videosService: VideosService
  ) {}

  @Query(returns => [InvidiousVideo])
  async videoSearch(@Args('query') query: string) {
    const response = await fetch(
      `${INVIDIOUS_API}/api/v1/search?type=video&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return map(pick(['title', 'videoId', 'videoThumbnails']), data);
  }

  @Query(returns => Video)
  async getVideo(@Args('id') id: string) {
    return this.prismaService.video.findUnique({ where: { id } });
  }

  @Mutation(returns => [Video])
  async updateVideosSeason(@Args('data') data: UpdateVideosSeasonInput) {
    const { videoIds, seasonId } = data;
    await this.videosService.updateVideosSeason(videoIds, seasonId);
    return this.prismaService.video.findMany({
      where: { id: { in: videoIds } },
    });
  }
}
