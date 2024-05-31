import { Resolver, Args, Query } from '@nestjs/graphql';
import fetch from 'node-fetch';
import { map, pick } from 'ramda';

import { InvidiousVideo, Video } from './videos.model';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

const INVIDIOUS_API = 'https://vid.puffyan.us/';

@Resolver(of => InvidiousVideo)
export class VideosResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

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
}
