import React from 'react'
import { useSharedState } from '../../Shared'
import { UI } from '..'

export const LastUpdated = () => {
  const [{ lastUpdated }] = useSharedState(
    UI.RedditStateSubject.getValue(),
    UI.RedditStateSubject
  )
  return <p>Last updated at {new Date(lastUpdated).toLocaleTimeString()}. </p>
}
