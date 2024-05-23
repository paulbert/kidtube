import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prismaService: PrismaService) {}

  async createNewGroup({ name }: { name: string }) {
    return await this.prismaService.group.create({
      data: {
        name,
        bannerUrl: '',
      },
    });
  }
}
