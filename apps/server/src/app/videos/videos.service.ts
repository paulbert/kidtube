import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { VideoInput } from './videos.model';

@Injectable()
export class VideosService {
  constructor(private prismaService: PrismaService) {}

  async addNewVideos({
    videos,
    seasonId,
  }: {
    videos: VideoInput[];
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
}
