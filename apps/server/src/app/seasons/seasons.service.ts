import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class SeasonsService {
  constructor(private prismaService: PrismaService) {}

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
}
