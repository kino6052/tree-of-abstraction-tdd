import { BehaviorSubject } from 'rxjs'
import { setPartial } from '../Shared'

export enum Option {
  ReactJS = 'reactjs',
  Angular = 'angular',
  WebDevelopment = 'webdevelopment',
}

export const UI = {
  RedditStateSubject: new BehaviorSubject({
    isFetching: false,
    posts: [] as string[],
    lastUpdated: new Date(),
  }),
  PickerStateSubject: new BehaviorSubject({
    value: Option.ReactJS,
  }),
  setIsFetching: (isFetching: boolean) => {
    setPartial(UI.RedditStateSubject, {
      isFetching: isFetching,
      posts: [],
    })
  },
  setPosts: (posts: string[]) => {
    setPartial(UI.RedditStateSubject, {
      isFetching: false,
      lastUpdated: new Date(),
      posts,
    })
  },
  refresh: () => {
    setPartial(UI.PickerStateSubject, {})
  },
  pick: (value: Option) => {
    setPartial(UI.PickerStateSubject, { value })
  },
}
