import { IRedditReqRes, RedditEndpoint } from './Modules/RedditInterface'
import { ITestReqRes, TestEndpoint } from './Modules/TestInterface'

// Initialize
// You Have to Import All Services Because
// They Need to be a Part of the Dependency Graph
import '../Services/RedditService/RedditService'
import '../Services/UIService/UIService'

export interface IError {
  message: string
}

export interface IPayload<T> {
  payload: {
    error?: IError
    data: T
  }
}

export interface IAPIGatewayMessage {
  Subreddit: IRedditReqRes<RedditEndpoint>
  Test: ITestReqRes<TestEndpoint>
}
