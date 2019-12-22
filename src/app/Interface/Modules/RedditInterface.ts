import { IPayload } from '..'

export enum RedditEndpoint {
  GetSubreddits = 'Subreddit.GetSubreddits',
}

export interface IRedditParameters {
  [RedditEndpoint.GetSubreddits]: {
    subreddit: string
  }
}

export interface IRedditResponse {
  [RedditEndpoint.GetSubreddits]: IPayload<string[]>
}

export interface IRedditReqRes<T extends RedditEndpoint> {
  Request: {
    type: T
    parameters: IRedditParameters[T]
  }
  Response: IRedditResponse[T]
}
