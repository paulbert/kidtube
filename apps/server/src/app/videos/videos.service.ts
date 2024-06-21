import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { InvidiousVideoInput, Video } from './videos.model';
import { SeasonsService } from '../seasons/seasons.service';

@Injectable()
export class VideosService {
  constructor(
    private prismaService: PrismaService,
    private seasonsService: SeasonsService
  ) {}

  async addNewVideos({
    videos,
    seasonId,
  }: {
    videos: InvidiousVideoInput[];
    seasonId: number;
  }) {
    const currentVideosInSeason = await this.prismaService.video.findMany({
      where: { seasonId },
    });
    const maxOrder = currentVideosInSeason.reduce(
      (mOrder, { order }) => (order > mOrder ? order : mOrder),
      0
    );
    const data = videos.map((video, index) => ({
      id: video.videoId,
      title: video.title,
      thumbnailUrl: video.videoThumbnails[0].url,
      seasonId,
      order: index + maxOrder + 1,
    }));
    return await this.prismaService.video.createManyAndReturn({
      data,
      skipDuplicates: true,
    });
  }

  async updateVideosSeason(videoIds: string[], seasonId: number) {
    return await this.prismaService.video.updateMany({
      data: { seasonId },
      where: { id: { in: videoIds } },
    });
  }

  async addVideosToNewSeason(videoIds: string[]) {
    // Assumes videos are all in same season
    const data = await this.prismaService.video.findFirst({
      select: {
        id: true,
        season: { select: { group: { select: { id: true } } } },
      },
      where: { id: videoIds[0] },
    });
    const groupId = data.season.group.id;
    const allSeasonsInGroup = await this.prismaService.season.findMany({
      where: { groupId },
    });
    const maxGroupOrder = allSeasonsInGroup.reduce(
      (max, group) => (group.order > max ? group.order : max),
      0
    );
    const newSeason = await this.seasonsService.createNewSeason({
      groupId,
      order: maxGroupOrder + 1,
    });
    this.updateVideosSeason(videoIds, newSeason.id);
  }

  async reorderVideo(videoId: string, newIndex: number) {
    const { seasonId, order } = await this.prismaService.video.findFirst({
      where: { id: videoId },
    });
    const newOrder = newIndex + 1;
    const reorderOperation =
      newOrder > order ? { decrement: 1 } : { increment: 1 };
    const transactionResult = await this.prismaService.$transaction([
      this.prismaService.video.updateMany({
        data: { order: reorderOperation },
        where: {
          seasonId,
          order: {
            gt: Math.min(order, newOrder - 1),
            lt: Math.max(order, newOrder + 1),
          },
        },
      }),
      this.prismaService.video.update({
        data: { order: newOrder },
        where: { id: videoId },
      }),
      this.prismaService.season.findFirst({ where: { id: seasonId } }),
    ]);
    return transactionResult[2];
  }
}
