import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { VideosResolver } from './videos/videos.resolver';
import { GroupsResolver } from './groups/groups.resolver';
import { PrismaService } from './prisma.service';
import { GroupsService } from './groups/groups.service';
import { SeasonsService } from './seasons/seasons.service';
import { VideosService } from './videos/videos.service';
import { SeasonsResolver } from './seasons/seasons.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/server/src/schema.gql'),
      sortSchema: true,
      buildSchemaOptions: { numberScalarMode: 'integer' },
    }),
  ],
  providers: [
    PrismaService,
    VideosResolver,
    GroupsResolver,
    GroupsService,
    SeasonsResolver,
    SeasonsService,
    VideosService,
  ],
})
export class AppModule {}
