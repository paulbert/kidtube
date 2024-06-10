import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class SeasonsService {
  constructor(private prismaService: PrismaService) {}

  async createOrGetFirstSeason({ groupId }) {
    try {
      return await this.getFirstSeason({ groupId });
    } catch {
      return await this.createNewSeason({ groupId });
    }
  }

  async createNewSeason({
    groupId,
    order,
  }: {
    groupId: number;
    order?: number;
  }) {
    return await this.prismaService.season.create({
      data: {
        groupId,
        order: order || 1,
      },
    });
  }

  async getFirstSeason({ groupId }: { groupId: number }) {
    return await this.prismaService.season.findFirstOrThrow({
      where: {
        groupId,
      },
    });
  }
}
