import { map } from 'rxjs/operators'
import { APIGateway } from '../../APIGateway/index'
import { RedditEndpoint } from '../../Interface/Modules/RedditInterface'

const RedditService = {
  onGetSubreddits: APIGateway.onMessage(RedditEndpoint.GetSubreddits).pipe(
    map(r => {
      const { parameters: { subreddit = 'rxjs' } = {} } = r[0]
      const callback = r[1]
      return {
        subreddit,
        callback,
      }
    })
  ),
  getSubredditMessages: async (subreddit: string) => {
    return (await fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => {
        const { data: { children = [] } = {} } = json
        return children
      })) as Promise<string[]>
  },
}

APIGateway.onInit.subscribe(() => {
  RedditService.onGetSubreddits.subscribe(async r => {
    const { callback, subreddit } = r
    const messages = await RedditService.getSubredditMessages(subreddit)
    callback({ payload: { data: messages } })
  })
})
