import { QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import { AppContext } from '../config'
import { BskyAgent } from '@atproto/api'

export const shortname = 'halloween-test'

export const handler = async (ctx: AppContext, params: QueryParams, requesterDid: string) => {
  console.log('aaasd');
  const agent = new BskyAgent({ service: 'https://bsky.social' })
  // Get user's posts
  const response = await agent.api.app.bsky.feed.getAuthorFeed({
    actor: requesterDid,
    limit: params.limit,
    cursor: params.cursor,
  })

  if (!response.success) {
    return { feed: [] }
  }

  const feed = response.data.feed
    .filter(item => (item.post.record as { text: string }).text.toLowerCase().includes('halloween'))
    .map(item => ({
      post: item.post.uri,
    }))

  return {
    cursor: response.data.cursor,
    feed,
  }
}
