import React from 'react'
import { useSharedState } from '../Shared'
import { Picker } from './Components/componentPicker'
import { Refresh } from './Components/componentRefresh'
import { Post } from './Components/componentPost'
import { LastUpdated } from './Components/componentLastUpdated'
import { Option, UI } from '.'

export const AsyncApp = () => {
  const options = [Option.ReactJS, Option.Angular, Option.WebDevelopment]
  const [{ isFetching, posts }] = useSharedState(
    UI.RedditStateSubject.getValue(),
    UI.RedditStateSubject
  )
  const isLoading = isFetching && posts.length === 0
  const isEmpty = !isFetching && posts.length === 0
  return (
    <div>
      <Picker options={options} />
      <LastUpdated />
      <Refresh />
      {isLoading && <h2>Loading...</h2>}
      {isEmpty && <h2>Empty</h2>}
      <ul>
        {posts.map((post: any) => (
          <Post key={post.title} post={post} />
        ))}
      </ul>
    </div>
  )
}
