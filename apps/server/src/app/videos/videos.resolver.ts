import { Resolver, Args, Query } from '@nestjs/graphql';
import fetch from 'node-fetch';
import { map, pick } from 'ramda';

import { InvidiousVideo } from './videos.model';

const INVIDIOUS_API = 'https://vid.puffyan.us/';

@Resolver(of => InvidiousVideo)
export class VideosResolver {
  @Query(returns => [InvidiousVideo])
  async videoSearch(@Args('query') query: string) {
    const response = await fetch(
      `${INVIDIOUS_API}/api/v1/search?type=video&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return map(pick(['title', 'videoId', 'videoThumbnails']), data);
  }
}
