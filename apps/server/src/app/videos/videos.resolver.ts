import { Resolver, Args, Query } from '@nestjs/graphql';
import fetch from 'node-fetch';
import { map, pick } from 'ramda';

import { Video } from './videos.model';

const INVIDIOUS_API = 'https://vid.puffyan.us/';

@Resolver(of => Video)
export class VideosResolver {
  @Query(returns => [Video])
  async videoSearch(@Args('query') query: string) {
    console.log(`${INVIDIOUS_API}/API/V1/SEARCH?type=video&q=${encodeURIComponent(query)}`)
    const response = await fetch(`${INVIDIOUS_API}/api/v1/search?type=video&q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return map(pick(['title', 'videoId', 'videoThumbnails']), data);
  }
}