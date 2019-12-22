import { IPayload } from '..'

export enum TestEndpoint {
  GetSubreddits = 'Subreddit.GetSubreddits',
}

export interface ITestParameters {
  [TestEndpoint.GetSubreddits]: {
    subreddit: string
  }
}

export interface ITestResponse {
  [TestEndpoint.GetSubreddits]: IPayload<string[]>
}

export interface ITestReqRes<T extends TestEndpoint> {
  Request: {
    type: T
    parameters: ITestParameters[T]
  }
  Response: ITestResponse[T]
}
